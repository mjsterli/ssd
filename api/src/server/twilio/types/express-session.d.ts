import { Session } from 'express-session';
import * as model from './interfaces';


declare module 'express-session' {
  interface Session {
    ssdState: string;
    ssdProcess: string;
    customer: model.Customer;
    loadedServices: model.RequestService[];
    loadedServicesErrorMessage?: string;
  }
};

declare global {
  interface Request {
    session: Session;
  }
};
