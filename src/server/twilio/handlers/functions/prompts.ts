import { PropertyOccupancy, Prisma as prismaNamespace } from "@prisma/client";
import prisma from "../../../db";

export async function greetNewCustomer() {
  let message =
    "Welcome to Simple Sign Delivery automated ordering system for sign pick-up and delivery.\n";
  message +=
    "To start your order, please reply with the following information:\n";
  message += "[Full Name]\n[Email Address]";

  return message;
};

export async function greetWithNewOrder({ session: { customer } }) {
  let message = `Welcome back ${customer.FirstName} to Simple Sign Delivery automated ordering system for sign pick-up and delivery.\n`;
  message +=
    "What is the property address that you would like to have you sign delivered to?\n";

  return message;
};

export async function getEmail({ session }) {
  let message = `Hi ${session.customer.Name}\n`;
  message += "Please reply with your Email Address.\n";

  return message;
};

export async function getBrokerage() {
  return "What Real Estate Brokerage are you associated with?";
};

export async function getPropertyAddress() {
  return "What is the property address that you would like to have you sign delivered to?\n";
};

export async function getCounty() {
  return "Which county is the property located?";
};

export async function getService({ session }) {
  let message =
    "Please reply with corresponding number of the Simple Installation Service Requested:\n";
  message += session.loadedServices.reduce(
    (servicesList, service) =>
      servicesList + `${service.RequestServiceID}) ${service.Description}\n`,
    ""
  );

  return message;
};

export async function getServiceDate() {
  return "What date would you like your service request to be fullfilled?\n";
};

export async function getRemovalDate() {
  return "What date would you like your sign removed?\n";
};

export async function getOccupancy() {
  let message =
    "Please reply with the corresponding number for Property Occupancy.\n\n";
  message += "1) Vacant\n";
  message += "2) Owner Occupied\n";
  message += "3) Tenant Occupied\n";

  return message;
};

export async function getInstallConfirmation({
  session: {
    loadedServices,
    customer: { newOrder: order }
  }
}) {
  let message = "Please confirm the order install:\n";
  message += `Address:      ${order.PropertyAddress}\n`;
  message += `County:       ${order.PropertyCounty}\n`;
  message += `Service:      ${loadedServices.find((service) => service.RequestServiceID == order.RequestedServiceID).Description}\n`;
  message += `Service Date: ${new Date(order.RequestedInstallDate).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}\n`;
  message += `Occupancy:    ${occupancies[+order.Occupancy - 1].description}\n\n`;
  message += "(C) to Confirm or (N) to Cancel";

  return message;
};

export async function endConversation({ session }) {
  if (isConfirmed(session)) {
    await saveCustomerOrder(session);
    session.destroy();
    return "Your order has been placed.\nThank you for using the Simple Sign Delivery Automated Service.";
  } else {
    session.destroy();
    return "Your order has been canceled.\nThank you for using the Simple Sign Delivery Automated Service.";
  }
}

const isConfirmed = ({ customer }) => {
  return !!customer.newOrder
    ? customer.newOrder.isConfirmed
    : !!customer.Orders.find((order) => order.Remove && order.isConfirmed);
};

const occupancies = [
  { dbName: PropertyOccupancy.VACANT, description: "Vacant" },
  { dbName: PropertyOccupancy.OWNER, description: "Owner Occupied" },
  { dbName: PropertyOccupancy.TENANT, description: "Tenant Occupied" }
];

export async function getOrderSelection({ session: { customer } }) {
  let message = `Welcome back ${customer.FirstName} to Simple Sign Delivery automated ordering system for sign pick-up and delivery.\n`;
  message += `You currently have ${customer.Orders.length} installed orders.\n`;
  message +=
    "Would you like to remove a sign from one of your installed orders?\n";
  message +=
    'Please select a number to remove that order or "0" to start a new install:\n';
  message += "0) New install\n";
  message += customer.Orders.reduce(
    (propertyList, order, orderNum) =>
      propertyList + `${orderNum + 1}\) ${order.PropertyAddress}\n`,
    ""
  );

  return message;
};

export async function getRemovalConfirmation({ session }) {
  let order = session.customer.Orders.find((order) => order.Remove);
  let message = "Please confirm the order to remove:\n";
  message += `Address:      ${order.PropertyAddress}\n`;
  message += `County:       ${order.PropertyCounty}\n`;
  message += `Service:      ${order.RequestedService.Description}\n`;
  message += `Service Date: ${new Date(order.RequestedRemoveDate).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}\n`;
  message += `Occupancy:    ${order.Occupancy}\n\n`;
  message += "(C) to Confirm or (N) to Cancel";

  return message;
};

async function saveCustomerOrder(session) {
  let { customer } = session;

  if (!customer.CustomerID) {
    await saveCustomerAndOrder(customer);
    return;
  }

  if (!!customer.newOrder) {
    await saveOrder(customer);
  } else {
    await removeOrder(customer.Orders.find((order) => order.Remove));
  }
};

async function saveCustomerAndOrder(customer) {
  let {
    Title,
    FirstName,
    MiddleName,
    LastName,
    Suffix,
    PhoneNumber,
    EmailAddress,
    Brokerage,
    newOrder: {
      PropertyAddress,
      PropertyCounty,
      RequestedServiceID,
      RequestedInstallDate,
      Occupancy
    }
  } = customer;

  const savedCustomer = await prisma.customer.create({
    data: {
      Title: Title,
      FirstName: FirstName,
      MiddleName: MiddleName,
      LastName: LastName,
      Suffix: Suffix,
      PhoneNumber: PhoneNumber,
      EmailAddress: EmailAddress,
      Brokerage: Brokerage,
      Orders: {
        create: {
          PropertyAddress: PropertyAddress,
          PropertyCounty: PropertyCounty,
          RequestedServiceID: RequestedServiceID,
          RequestedInstallDate: new Date(RequestedInstallDate),
          Occupancy: occupancies[Occupancy - 1].dbName
        }
      }
    }
  });
};

const saveOrder = async ({
  newOrder: {
    PropertyAddress,
    PropertyCounty,
    RequestedServiceID,
    RequestedInstallDate,
    Occupancy
  },
  CustomerID
}) => {
  await prisma.order.create({
    data: {
      PropertyAddress: PropertyAddress,
      PropertyCounty: PropertyCounty,
      RequestedServiceID: RequestedServiceID,
      RequestedInstallDate: new Date(RequestedInstallDate),
      Occupancy: occupancies[Occupancy - 1].dbName,
      CustomerID: CustomerID
    }
  });
};

const removeOrder = async (order) => {
  let orderWhere: prismaNamespace.OrderWhereUniqueInput = {
    OrderID: order.OrderID
  };

  await prisma.order.update({
    where: orderWhere,
    data: {
      RequestedRemoveDate: new Date(order.RequestedRemoveDate)
    }
  });
};
