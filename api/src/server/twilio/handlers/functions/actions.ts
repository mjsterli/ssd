import prisma from "../../../db";
import { matchedData } from "express-validator";
import { parseFullName } from "parse-full-name";
import axios from "axios";
import pkg from "parse-address";

const { parser } = pkg;

const getServices = async () => {
  const services = await prisma.requestService.findMany();
  return services;
};

const getCustomerByPhoneNumberWithOrders = async (phoneNumber) => {
  const customer = await prisma.customer.findFirst({
    where: {
      PhoneNumber: phoneNumber
    },
    select: {
      FirstName: true,
      LastName: true,
      CustomerID: true,
      Orders: {
        where: {
          RequestedRemoveDate: null
        },
        select: {
          OrderID: true,
          PropertyAddress: true,
          PropertyCounty: true,
          RequestedInstallDate: true,
          RequestedService: {
            select: {
              Description: true
            }
          },
          Occupancy: true
        }
      }
    }
  });

  return customer;
};

const parseGreetingResponse = (greetingResponses) => {
  let name = parseFullName(greetingResponses[0]),
    email = greetingResponses[1] ? greetingResponses[1] : null,
    brokerage = greetingResponses[2] ? greetingResponses[2] : null;

  return { name, email, brokerage };
};

export async function initializeCustomer({
  session,
  body: { From: incomingPhoneNumber }
}) {
  let services = await getServices();
  let customer = await getCustomerByPhoneNumberWithOrders(incomingPhoneNumber);

  session.loadedServices = services;
  session.customer = customer ?? {};
  session.customer.PhoneNumber = incomingPhoneNumber;
  if (!customer) {
    session.ssdState = "newCustomer";
    session.ssdProcess = "init";
  } else if (customer.Orders.length > 0) {
    session.ssdState = "display";
    session.ssdProcess = "init";
  } else {
    session.ssdState = "install";
    session.ssdProcess = "newOrder";
  }
}

export async function setCustomer({ session, body: { Body: smsResponse } }) {
  const responseLines = smsResponse.split("\n");

  if (responseLines.length === 1) {
    name = parseFullName(smsResponse);
  } else {
    var { name, email, brokerage } = parseGreetingResponse(responseLines);
  }

  session.customer.Title = name?.title;
  session.customer.FirstName = name.first;
  session.customer.MiddleName = name?.middle;
  session.customer.LastName = name.last;
  session.customer.Suffix = name?.suffix;

  session.customer.Name = !!name?.title
    ? `${name.title} ${name.last}`
    : `${name.first}`;

  if (email) session.customer.EmailAddress = email;
}

export async function setEmail({ session, body: { Body: smsEmail } }) {
  session.customer.EmailAddress = smsEmail;
}

export async function setBrokerage({ session, body: { Body: smsBrokerage } }) {
  session.customer.Brokerage = smsBrokerage;
  session.ssdState = "install";
  session.ssdProcess = "init";
}

export async function setPropertyAddress(req) {
  let isValid = false,
    response;
  const propertyAddress = matchedData(req).Body;
  const {
    session: { customer }
  } = req;

  customer.newOrder = {};
  customer.newOrder.PropertyAddress = propertyAddress;

  try {
    const openCageDataUrl = `https://api.opencagedata.com/geocode/v1/json?key=${process.env.OPEN_CAGE_DATA_KEY}&q=${encodeURIComponent(propertyAddress)}&pretty=1`;
    response = await axios.get(openCageDataUrl);
  } catch (e) {
    req.session.ssdState = "install";
    req.session.ssdProcess = "county";
    return isValid;
  }

  if (response.status != 200) return isValid;

  const result = response.data.results.find(
    (result) => result?.components?.county
  );

  if (!result) return isValid;

  isValid = +result.confidence > 6;

  if (isValid) {
    customer.newOrder.PropertyCounty = result.components.county;
  } else {
    req.session.ssdState = "install";
    req.session.ssdProcess = "county";
  }
};

export async function setCounty(req) {
  const county = matchedData(req).Body;
  req.session.customer.newOrder.PropertyCounty = county;
}

export async function setService(req) {
  const service = matchedData(req).Body;
  req.session.customer.newOrder.RequestedServiceID = +service;
}

export async function setServiceDate(req) {
  const serviceDate = matchedData(req).Body;
  req.session.customer.newOrder.RequestedInstallDate = serviceDate;
}

export async function setOccupancy(req) {
  const occupancy = matchedData(req).Body;
  req.session.customer.newOrder.Occupancy = occupancy;
}

export async function setInstallConfirmation(req) {
  const isConfirmed = matchedData(req).Body.toLowerCase() == "c";
  req.session.customer.newOrder.isConfirmed = isConfirmed;
}

export async function setRemovalConfirmation(req) {
  const isConfirmed = matchedData(req).Body.toLowerCase() == "c";
  const orderToRemove = req.session.customer.Orders.find(
    (order) => order.Remove
  );
  orderToRemove.isConfirmed = isConfirmed;
}

export async function setRemovalDate(req) {
  const removalDate = matchedData(req).Body;
  req.session.customer.Orders.find(
    (order) => order.Remove
  ).RequestedRemoveDate = removalDate;
}

export async function setOrderSelection(req) {
  const {
    session: { customer }
  } = req;
  const orderSelection = +matchedData(req).Body;

  if (orderSelection == 0) {
    req.session.ssdState = "install";
    req.session.ssdProcess = "init";
  } else {
    req.session.ssdState = "remove";
    req.session.ssdProcess = "init";
    customer.Orders[orderSelection - 1].Remove = true;
  }
}
