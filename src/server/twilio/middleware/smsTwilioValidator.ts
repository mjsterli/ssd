import pkg from "twilio";
import { ssd as ssdController } from "../handlers/ssd";

const { twiml } = pkg;

const validateInput = async (req, res, next) => {
  const {
    session: { ssdState, ssdProcess },
    body: { Body: textSent }
  } = req;

  if (!!ssdState && !!ssdProcess) {
    const errors =
      await ssdController[ssdState][ssdProcess].validation.run(req);

    if (errors && !errors.isEmpty()) {
      const smsResponse = new twiml.MessagingResponse();
      smsResponse.message(errors.array()[0].msg);

      res.type("type/xml").send(smsResponse.toString());
    } else {
      next();
    }
  } else {
    if (textSent.toLowerCase() == "ssd") {
      req.session.ssdState = "newCustomer";
      req.session.ssdProcess = "init";
      next();
    } else {
      res.type("type/xml").send("");
      req.session.destroy();
    }
  }
};

export default validateInput;
