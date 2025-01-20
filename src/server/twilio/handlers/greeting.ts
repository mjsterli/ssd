import prisma from '../../db';
import { twiml } from 'twilio';

export const smsTwilioReply = async (req, res) => {
  const smsResponse = new twiml.MessagingResponse();

  let customer = await getCustomerByPhoneNumber(req.body.From.slice(2));
  let installedOrders = await getInstalledOrders(customer);
  let message;
  if(installedOrders){
    message = `
Hi ${customer.FirstName},
You currently have ${installedOrders.length} installed orders.
Would you like to remove a sign from one of your installed orders?
Please select a number to remove that order:
`;
    message += installedOrders.reduce((propertyList, order, orderNum) => propertyList + `${orderNum + 1}:\t${order.PropertyAddress}\n`, "" ); 
  } else {
    message =  'Welcome to Simple Sign Delivery automated ordering system for sign pick-up and delivery.\n';
    message += 'Please reply with your Full Name';
  }

  smsResponse.message(message);

  res
    .type('text/xml')
    .send(smsResponse.toString());
};

const getCustomerByPhoneNumber = async (phoneNumber) => {
  const customer = await prisma.customer.findFirst({
    where: {
      PhoneNumber: phoneNumber
    },
    select: {
      FirstName: true,
      LastName: true
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