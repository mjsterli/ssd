import { ssd as ssdController } from '../handlers/ssd';

const smsTwilioResponse = async (req, _, next) => {
  const {
    session: { ssdState, ssdProcess }
  } = req;

  if (!!ssdState && !!ssdProcess) {
    await ssdController[ssdState][ssdProcess].response(req);
    next();
  }
};

export default smsTwilioResponse;