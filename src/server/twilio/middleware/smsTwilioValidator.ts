import { twiml } from 'twilio';
import { ssd as ssdController } from '../handlers/ssd';

const validateInput = async (req, res, next) => {
  const {session: {ssdState, ssdProcess}}= req;

  if(!!ssdState && !!ssdProcess){
    const errors = await ssdController[ssdState][ssdProcess].validation.run(req);
  
    if(errors && !errors.isEmpty()){
      const smsResponse = new twiml.MessagingResponse();
      smsResponse.message(errors.array()[0].msg);

      res
        .type('type/xml')
        .send(smsResponse.toString());
    } else {
      next();
    }
  } else {
    req.session.ssdState    = 'newCustomer';
    req.session.ssdProcess  = 'init';
    next();
  }

};

export default validateInput;