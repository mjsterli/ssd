import prisma from '../../db';
import { twiml } from 'twilio';

function validatePhoneNumber(phoneNumber){
  return phoneNumber.slice(2);
}

const ssdStates = {
  "initCustomer": initializeCustomer,
  "newCustomer" : newCustomer,
  "display"     : displayOrders,
  "install"     : installOrder,
  // "remove"      : removeOrder,
  "confirm"     : confirmOrder
};

async function getCustomerWithOrders(customerPhoneNumber){
  return await getCustomerByPhoneNumberWithOrders(validatePhoneNumber(customerPhoneNumber)); //have a way to be consistent with country code
};

async function initializeCustomer(request){
  let { session, body: { From: from, Body: body }} = request;
  let customer = await getCustomerWithOrders(from);
  session.isNewCustomer = !!customer;
  session.customer = customer ?? {};
  session.ssdState = !customer 
                              ? "newCustomer" 
                              : customer.Orders
                                ? "display"
                                : "install";

  return ssdStates[session.ssdState](request);
};

async function newCustomer({session: {ssdState, ssdProcess, customer}, body: {From: from, Body: body}}){
  let message = '';

  switch(ssdProcess){
    case "name":
      customer.Name = body;
      message += `Hi ${customer.Name}\n`; //change to parsed name
      message += 'Please reply with your Email Address.\n';
      ssdProcess = "email";
      break;
    
    case "email":
      customer.Email = body;
      message += 'What Real Estate Brokerage are you associated with?';
      ssdProcess = "brokerage";
      break;
    
    case "brokerage":
      customer.Brokerage = body;
      message += 'Please reply with corresponding number of the Simple Installation Service Requested:\n';
      message += '1) Real Estate Sign\n';
      message += '2) Supra iBox\n';
      message += '3) Combo Lock Box\n';
      message += '4) Open House Sign Placement\n';
      ssdState = "install";
      ssdProcess = "address"
      break;

    default:
      message += 'Welcome to Simple Sign Delivery automated ordering system for sign pick-up and delivery.\n';
      message += 'To start your order, please with your full name.'
      customer.PhoneNumber = from;
      ssdProcess = "name";
      break;
  }

  return message;
};

async function installOrder({session: {ssdState, ssdProcess, customer}, body: {Body: body}}){
  let message = '';

  switch(ssdProcess){
    case "address":
      message += 'What is the property address that you would like to have you sign delivered to?\n'
      ssdProcess = "county";
      break;

    case "county":
      customer.newOrder = {};
      customer.newOrder.PropertyAddress = body;
      message += "Which county is the property located?";
      ssdProcess = "service"
      break;

    case "service":
      customer.newOrder.PropertyCounty = body;
      message += 'Please reply with corresponding number of the Simple Installation Service Requested:\n';
      message += '1) Real Estate Sign\n';
      message += '2) Supra iBox\n';
      message += '3) Combo Lock Box\n';
      message += '4) Open House Sign Placement\n';
      ssdProcess = 'date';
      break;

    case "date":
      customer.newOrder.RequestedServiceDate = body;
      message += 'What date would you like your service request to be fullfilled?\n';
      ssdProcess = 'occupancy';
      break;
  
    case "occupancy":
      customer.newOrder.Occupancy = body;
      message += 'Please reply with the corresponding number for Property Occupancy.\n\n';
      message += '1) Vacant\n';
      message += '2) Owner Occupied\n';
      message += '3) Tenant Occupied\n';
      session.ssdState = "confirm";
      session.ssdProcess = "install";
      break;
  }

  return message;
};

async function displayOrders(request){
  let message = '',
  { session: { ssdState, ssdProcess, customer, serviceDate }, body: {Body: body} } = request;

  switch(ssdProcess){
    case "select":
      if(body == "0"){
        ssdState = "install";
        ssdProcess = "address";
        message += installOrder(request);
      } else {
        let orderNum = +body;
        customer.Orders[orderNum-1].remove = true;
        ssdProcess = "date";
        message += "What date would you like the sign removed?\n";
        message += "Please enter in the format MM/DD/YY";
      }
      break;
      
    case "date":
        serviceDate = body;
        message += confirmOrder(request);
      break;

    default:
      message += `You currently have ${customer.Orders.length} installed orders.\n`;
      message += 'Would you like to remove a sign from one of your installed orders?\n';
      message += 'Please select a number to remove that order or "0" to start a new install:\n';
      message += '0) New install\n';
      message += customer.Orders.reduce((propertyList, order, orderNum) => propertyList + `${orderNum + 1}\) ${order.PropertyAddress}\n`, "" ); 
      ssdProcess = "select";
      break;
  }

  return message;
};

async function confirmOrder({session: {ssdState, ssdProcess, customer, serviceDate}, body: {Body: body}}) {
  let message = '', order;
  switch(ssdProcess){
    case "install":
      order = customer.newOrder;
      message += "Please confirm the order install:\n";
      message += `${order.PropertyAddress}\n`;
      message += `Removal Date: ${order.RequestedServiceDate}\n\n`;
      message += `County: ${order.PropertyCounty}\n\n`;
      message += '(C) to Confirm';
      ssdState = "confirm";
      ssdProcess = "";
      break;

    case "remove":
      order = customer.Orders.find((order) => order.remove);
      message += "Please confirm the order removal:\n";
      message += `${order.PropertyAddress}\n`;
      message += `Removal Date: ${serviceDate}\n\n`;
      message += '(C) to Confirm';
      ssdState = "confirm";
      ssdProcess = "";
      break;

    default:
      if(body.toLowerCase() == "c"){
        message += "Saving Order...";
      }
      break;
  }
  return message;
};

export const smsTwilioReply = async (req, res) => {
  let { session: { ssdState }, body: { Body: body } } = req;
  let smsResponse = new twiml.MessagingResponse();
  console.log(`body: ${body}`);
  smsResponse.message(await (ssdStates[ssdState] ?? initializeCustomer)(req));

  res
    .type('text/xml')
    .send(smsResponse.toString());
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
        select: {
          PropertyAddress: true
        }
      }
    }
  });

  return customer;
};