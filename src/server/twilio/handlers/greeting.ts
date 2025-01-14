import prisma from '../../db';
import { twiml } from 'twilio';

export const smsReplyGreeting = async (req, res) => {
  const smsResponse = new twiml.MessagingResponse();

  let customer = await getCustomerByPhoneNumber(req.body.From.slice(2));
  smsResponse.message(customer
                        ? `Welcome back ${customer.FirstName} ${customer.LastName}`
                        : "Welcome new customer"
  );

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
}