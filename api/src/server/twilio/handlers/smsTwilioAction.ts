import { ssd as ssdController } from "./ssd";

const smsTwilioAction = async (req: Request, _: any, next: Function) => {
  const {
    session: { ssdState, ssdProcess }
  } = req;

  if (
    !!ssdState &&
    !!ssdProcess &&
    !!ssdController[ssdState][ssdProcess].action
  ) {
    await ssdController[ssdState][ssdProcess].action(req);
    next();
  }
};

export default smsTwilioAction;
