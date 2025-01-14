import { twiml } from 'twilio';

export const smsReplyGreeting = async (req, res) => {
  const smsResponse = new twiml.MessagingResponse();

  smsResponse.message(`The number sending: ${req.body.From}`);
  req
  res
    .type('text/xml')
    .send(smsResponse.toString());
}