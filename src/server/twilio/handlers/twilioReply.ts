import prisma from '../../db';
import { twiml } from 'twilio';

function validatePhoneNumber(phoneNumber){
  return phoneNumber.slice(2);
}

// async function greeting({ session, reqBody }){
//   let greeting;
//   if(session.ssdState.state.subState){
//     switch(session.ssdState.state.subState){
//       case "occupancy":
//         greeting += 'Please reply with the corresponding number for Property Occupancy.\n\n';
//         greeting += '1) Vacant\n';
//         greeting += '2) Owner Occupied\n';
//         greeting += '3) Tenant Occupied\n';
//         break;

//       case "date":
//         greeting += 'What date would you like your service request to be fullfilled?\n';
//         session.ssdState.state.subState = 'occupancy';
//         break;

//       case "service":
//         greeting += 'Please reply with corresponding number of the Simple Installation Service Requested:\n';
//         greeting += '1) Real Estate Sign\n';
//         greeting += '2) Supra iBox\n';
//         greeting += '3) Combo Lock Box\n';
//         greeting += '4) Open House Sign Placement\n';
//         session.ssdState.state.subState = 'date';
//         break;

//       case "address":
//         greeting += 'What is the property address that you would like to have you sign delivered to?\n'
//         session.ssdState.state.subState = 'service';
//         break;

//       case "brokerage":
//         greeting += `Hi ${session.customer.FullName}\n`; //change to parsed name
//         greeting += 'What Real Estate Brokerage are you associated with?';
//         session.ssdState.state.subState = 'address';
//         break;

//       default:
//         greeting += 'Please reply with your full name\n';
//         session.ssdState.state.subState = "brokerage";
//         break;
//     }
//   } else {
//     let customerPhoneNumber = reqBody.From;
//     let customer = await getCustomerByPhoneNumber(validatePhoneNumber(customerPhoneNumber)); //have a way to be consistent with country code
    
//     greeting = 'Welcome to Simple Sign Delivery automated ordering system for sign pick-up and delivery.\n';
//     if(customer){
//       session.customer = customer;

//       let installedOrders = await getInstalledOrders(customer);
//       if(installedOrders){
//         session.installedOrders = installedOrders;

//         greeting =  `Hi ${customer.FirstName},\n`;
//         greeting += `You currently have ${installedOrders.length} installed orders.\n`;
//         greeting += 'Would you like to remove a sign from one of your installed orders?\n';
//         greeting += 'Please select a number to remove that order:\n';
//         greeting += installedOrders.reduce((propertyList, order, orderNum) => propertyList + `${orderNum + 1}\) ${order.PropertyAddress}\n`, "" ); 
//       } else {
//         greeting =  `Hi ${customer.FirstName},\n`;
//         greeting += 'Please reply with corresponding number of the Simple Installation Service Requested:\n';
//         greeting += '1) Real Estate Sign\n';
//         greeting += '2) Supra iBox\n';
//         greeting += '3) Combo Lock Box\n';
//         greeting += '4) Open House Sign Placement\n';
//       }
//     } 
//   }

//   return greeting;
// };

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

// async function initializeConversation({session, reqBody}){
//   let message,
//       customer = await getCustomer(reqBody.From);
  
//   if(!customer){
//     session.ssdState = "initCustomer";
//     message = initializeCustomer(session, reqBody);
//   } else {
//     session.customer = customer;
//     message = `Hi ${customer.FirstName},\n`;

//     let installedOrders = await getInstalledOrders(customer);
//     if(installedOrders){
//       session.customer.installedOrders = installedOrders;
//       message += `You currently have ${installedOrders.length} installed orders.\n`;
//       message += 'Would you like to remove a sign from one of your installed orders?\n';
//       message += 'Please select a number to remove that order or "0" to start a new install:\n';
//       message += '0) New install\n';
//       message += installedOrders.reduce((propertyList, order, orderNum) => propertyList + `${orderNum + 1}\) ${order.PropertyAddress}\n`, "" ); 
//     } else {
//       message =  `Hi ${customer.FirstName},\n`;
//       message += 'Please reply with corresponding number of the Simple Installation Service Requested:\n';
//       message += '1) Real Estate Sign\n';
//       message += '2) Supra iBox\n';
//       message += '3) Combo Lock Box\n';
//       message += '4) Open House Sign Placement\n';
//     }
//   }
  
//   return message;
// };

async function initializeCustomer(request){
  let customer = await getCustomerWithOrders(request.body.From);
  request.session.isNewCustomer = !!customer;
  request.session.customer = customer ?? {};
  request.session.ssdState = !customer 
                              ? "newCustomer" 
                              : customer.Orders
                                ? "display"
                                : "install";

  return ssdStates[request.session.ssdState](request);
};

async function newCustomer({session, body: {From: from, Body: body}}){
  let message = '';

  switch(session.ssdProcess){
    case "name":
      session.customer.Name = body;
      message += `Hi ${session.customer.Name}\n`; //change to parsed name
      message += 'Please reply with your Email Address.\n';
      session.ssdProcess = "email";
      break;
    
    case "email":
      session.customer.Email = body;
      message += 'What Real Estate Brokerage are you associated with?';
      session.ssdProcess = "brokerage";
      break;
    
    case "brokerage":
      session.customer.Brokerage = body;
      message += 'Please reply with corresponding number of the Simple Installation Service Requested:\n';
      message += '1) Real Estate Sign\n';
      message += '2) Supra iBox\n';
      message += '3) Combo Lock Box\n';
      message += '4) Open House Sign Placement\n';
      session.ssdState = "install";
      session.ssdProcess = "address"
      break;

    default:
      message += 'Welcome to Simple Sign Delivery automated ordering system for sign pick-up and delivery.\n';
      message += 'To start your order, please with your full name.'
      session.customer.PhoneNumber = from;
      session.ssdProcess = "name";
      break;
  }

  return message;
};

async function installOrder({session, body: {Body: body}}){
  let message = '';
  switch(session.ssdProcess){
    case "address":
      message += 'What is the property address that you would like to have you sign delivered to?\n'
      session.ssdProcess = "county";
      break;

    case "county":
      session.customer.newOrder = {};
      session.customer.newOrder.PropertyAddress = body;
      message += "Which county is the property located?";
      session.ssdProcess = "service"
      break;

    case "service":
      session.customer.newOrder.PropertyCounty = body;
      message += 'Please reply with corresponding number of the Simple Installation Service Requested:\n';
      message += '1) Real Estate Sign\n';
      message += '2) Supra iBox\n';
      message += '3) Combo Lock Box\n';
      message += '4) Open House Sign Placement\n';
      session.ssdProcess = 'date';
      break;

    case "date":
      session.customer.newOrder.RequestedServiceDate = body;
      message += 'What date would you like your service request to be fullfilled?\n';
      session.ssdProcess = 'occupancy';
      break;
  
    case "occupancy":
      session.customer.newOrder.Occupancy = body;
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

async function confirmOrder({session, body: {Body: body}}) {
  let message = '', order;
  switch(session.ssdProcess){
    case "install":
      order = session.customer.newOrder;
      message += "Please confirm the order install:\n";
      message += `${order.PropertyAddress}\n`;
      message += `Removal Date: ${order.RequestedServiceDate}\n\n`;
      message += `County: ${order.PropertyCounty}\n\n`;
      message += '(C) to Confirm';
      session.ssdState = "confirm";
      session.ssdProcess = "";
      break;

    case "remove":
      order = session.customer.Orders.find((order) => order.remove);
      message += "Please confirm the order removal:\n";
      message += `${order.PropertyAddress}\n`;
      message += `Removal Date: ${session.serviceDate}\n\n`;
      message += '(C) to Confirm';
      session.ssdState = "confirm";
      session.ssdProcess = "";
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
  let session = req.session;
  let smsResponse = new twiml.MessagingResponse();

  smsResponse.message(await (ssdStates[session.ssdState] ?? initializeCustomer)(req));
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

const getInstalledOrders = async (customer) => {
  let installedOrders = await prisma.order.findMany({
    where: {
      AND: {
        Fullfillment: null,
        CustomerID: customer.CustomerID
      },
    },
    select: {
      PropertyAddress: true
    }
  });

  return installedOrders;
};