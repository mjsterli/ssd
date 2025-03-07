import pkg from "twilio";
import { ssd as ssdController } from "./ssd";

const { twiml } = pkg;

const smsTwilioPrompt = async (req, res) => {
  let { session } = req;
  let smsResponse = new twiml.MessagingResponse();
  let { prompt, next } = ssdController[session.ssdState][session.ssdProcess];

  smsResponse.message(await prompt(req));
  if (!!next) setNextStateProcess(session, next);

  res.type("text/xml").send(smsResponse.toString());
};

const setNextStateProcess = (session, { state, process }) => {
  session.ssdState = state ?? session.ssdState;
  session.ssdProcess = process;
};

export default smsTwilioPrompt;
