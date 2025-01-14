import { twiml } from 'twilio';

export const smsReplyGreeting = async (req, res) => {
  const smsResponse = new twiml.MessagingResponse();

  smsResponse.message("Welcome to Simple Sign Delivery automated ordering system for sign pick-up and delivery.");
  
  res
    .type('text/xml')
    .send(smsResponse.toString());
}