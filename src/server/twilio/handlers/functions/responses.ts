import prisma from '../../../db';
import { matchedData } from 'express-validator';
import { parseFullName } from 'parse-full-name';
import { parser as addressParser } from 'parse-address';

export async function initializeCustomer({session, body: { From: from }}){
  let services = await getServices();
  let customer = await getCustomerByPhoneNumberWithOrders(from);
  
  session.loadedServices = services;
  session.customer = customer ?? {};
  session.customer.PhoneNumber = from;
  if(!customer){
    session.ssdState = 'newCustomer';
    session.ssdProcess = 'init';
  }
  else if(customer.Orders.length > 0){
    session.ssdState = 'display';
    session.ssdProcess = 'init';
  }
  else {
    session.ssdState = 'install';
    session.ssdProcess = 'newOrder';
  }
};

async function getServices(){
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

export async function setName({session, body: {Body: smsName}}){
  const name = parseFullName(smsName);

  session.customer.Title = name?.title;
  session.customer.FirstName = name.first;
  session.customer.MiddleName = name?.middle;
  session.customer.LastName = name.last;
  session.customer.Suffix = name?.suffix;

  session.customer.Name = !!name?.title
                            ? `${name.title} ${name.last}`
                            : `${name.first}`;
};

export async function setEmail({session, body: {Body: smsEmail}}){
  session.customer.EmailAddress = smsEmail;
};

export async function setBrokerage({session, body: {Body: smsBrokerage}}){
  session.customer.Brokerage = smsBrokerage;
  session.ssdState =    'install';
  session.ssdProcess =  'init';
};

export async function setPropertyAddress(req){
  const propertyAddress = matchedData(req).Body;
  const {session: {customer}} = req;
  customer.newOrder = {};
  customer.newOrder.PropertyAddress = propertyAddress;

  //todo -- Parse out address to save
  // const parsedPropertyAddress = addressParser.parseLocation(propertyAddress);
};

export async function setCounty(req){
  const county = matchedData(req).Body;
  req.session.customer.newOrder.PropertyCounty = county;
};

export async function setService(req){
  const service = matchedData(req).Body;
  req.session.customer.newOrder.RequestServiceID = +service;
};

export async function setServiceDate(req){
  const serviceDate = matchedData(req).Body;
  req.session.customer.newOrder.RequestedInstallDate = serviceDate;
};

export async function setOccupancy(req){
  const occupancy = matchedData(req).Body;
  req.session.customer.newOrder.Occupancy = occupancy;
};

export async function setInstallConfirmation(req){
  const isConfirmed = matchedData(req).Body.toLowerCase() == 'c';
  req.session.customer.newOrder.isConfirmed = isConfirmed;
};

export async function setRemovalConfirmation(req){
  const isConfirmed = matchedData(req).Body.toLowerCase() == 'c';
  const orderToRemove = req.session.customer.Orders.find(order => order.Remove);
  orderToRemove.isConfirmed = isConfirmed;
};

export async function setRemovalDate(req){
  const removalDate = matchedData(req).Body;
  req.session.customer.Orders.find(order => order.Remove).RequestedRemoveDate = removalDate;
};

export async function setOrderSelection(req){
  const {session: {customer}} = req;
  const orderSelection = +matchedData(req).Body;

  if(orderSelection == 0){
    req.session.ssdState =    'install';
    req.session.ssdProcess =  'init';
  }
  else{
    req.session.ssdState =    'remove';
    req.session.ssdProcess =  'init';
    customer.Orders[orderSelection-1].Remove = true;
  }
};