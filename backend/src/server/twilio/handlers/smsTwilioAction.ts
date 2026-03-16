import { ssd as ssdController } from "./ssd";

const smsTwilioAction = async (req, _, next) => {
  const {
    session: { ssdState, ssdProcess }
  } = req;

  if (!!ssdState && !!ssdProcess) {
    await ssdController[ssdState][ssdProcess].action(req);
    next();
  }
};

export default smsTwilioAction;
