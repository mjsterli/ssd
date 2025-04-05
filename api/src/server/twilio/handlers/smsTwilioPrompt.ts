import pkg from "twilio";
import { ssd as ssdController } from "./ssd";
import { Session } from "express-session";

const { twiml } = pkg;

const smsTwilioPrompt = async (req: Request, res: Response) => {
  let { session } = req;
  let smsResponse = new twiml.MessagingResponse();
  let { prompt, next } = ssdController[session.ssdState][session.ssdProcess];

  if (prompt && next) {
    smsResponse.message(await prompt(req));
    if (!!next) setNextStateProcess(session, next);

    res.type("text/xml").send(smsResponse.toString());
  }
};

const setNextStateProcess = (session: Session, { state, process }: ssdNext) => {
  session.ssdState = state ?? session.ssdState;
  session.ssdProcess = session.ssdState[process ?? ""];
};

export default smsTwilioPrompt;
