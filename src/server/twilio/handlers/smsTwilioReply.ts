import { twiml } from 'twilio';
import { ssd as ssdController } from './ssd';


export const smsTwilioReply = async (req, res) => {
  let { session } = req;
  let smsResponse = new twiml.MessagingResponse();
  let { reply, next } = ssdController[session.ssdState][session.ssdProcess];

  smsResponse.message(await reply(req));
  if(!!next) setNextStateProcess(session, next);

  res
    .type('text/xml')
    .send(smsResponse.toString());
};

const setNextStateProcess = (session, { state, process }) => {
  session.ssdState    = state ?? session.ssdState;
  session.ssdProcess  = process;
};