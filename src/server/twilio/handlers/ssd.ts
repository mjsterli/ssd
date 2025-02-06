import { body, matchedData } from 'express-validator';
import * as responses from './functions/responses';
import * as replies from './functions/replies';
import { parseFullName } from 'parse-full-name';

const formatCustomerName = (req) => {
  const {Body} = matchedData(req);
  const {session: {customer}} = req;
  const parsedFullName = parseFullName(Body);

  customer.Name.displayName = parsedFullName.title && parsedFullName.last
                              ? `${parsedFullName.title} ${parsedFullName.last}`
                              : `${parsedFullName.first}`;
  
  customer.Name.title   = parsedFullName.title;
  customer.Name.first   = parsedFullName.first;
  customer.Name.middle  = parsedFullName.middle;
  customer.Name.last    = parsedFullName.last;
  customer.Name.suffix  = parsedFullName.suffix;
};

export const ssd = {
  newCustomer: {
    init: {
      response: responses.initializeCustomer,
      reply: replies.greetNewCustomer,
      next: {
        process: 'name'
      }
    },
    name: {
      validation: body('Body').notEmpty().trim().withMessage('Please reply with your full name.'),
      response: responses.setName,
      reply: replies.getEmail,
      next: {
        process: 'email'
      }
    },
    email:{
      validation: body('Body').notEmpty().isEmail().withMessage('Please enter a valid email address.'),
      response: responses.setEmail,
      reply: replies.getBrokerage,
      next: {
        process: 'brokerage'
      }
    },
    brokerage: {
      validation: body('Body').notEmpty().withMessage('Please enter a valid brokerage.'),
      response: responses.setBrokerage,
      next: {
        state: 'install',
        process: 'init'
      }
    }
  },
  install: {
    init: {
      reply: replies.getPropertyAddress,
      next: {
        process: 'address'
      }
    },
    address: {
      validation: body('Body').notEmpty().withMessage('Please enter a valid US mailing address.'),
      response: responses.setPropertyAddress,
      reply: replies.getCounty,
      next: {
        process: 'county'
      }
    },
    county: {
      validation: body('Body').notEmpty().isAlpha().withMessage('Please enter a valid county name.'),
      response: responses.setCounty,
      reply: replies.getService,
      next: {
        process: 'service'
      }
    },
    service: {
      validation: body('Body').notEmpty().isInt({gt: 0, lt: 5}).withMessage('Please enter a valid numeric service between 1 and 4.'),
      response: responses.setService,
      reply: replies.getServiceDate,
      next: {
        process: 'date'
      }
    },
    date: {
      validation: body('Body').notEmpty().isDate().withMessage('Please enter a valid service date in the form of "MM/DD/YYYY".'),
      response: responses.setServiceDate,
      reply: replies.getOccupancy,
      next: {
        process: 'occupancy'
      }
    },
    occupancy: {
      validation: body('Body').notEmpty().isInt({gt: 0, lt: 4}).withMessage('Please enter a valid numeric occupancy between 1 and 3.'),
      response: responses.setOccupancy,
      reply: replies.getInstallConfirmation,
      next: {
        state: 'confirm',
        process: 'install'
      }
    }
  },
  confirm: {
    install: {
      validation: body('Body').notEmpty().isAlpha().isIn(['c', 'C', 'n', 'N']),
      response: responses.setInstallConfirmation,
      reply: replies.endConversation
    },
    remove: {
      validation: body('Body').notEmpty().isAlpha().isIn(['c', 'C', 'n', 'N']),
      response: responses.setRemovalConfirmation,
      reply: replies.endConversation
    }
  },
  display: {
    init: {
      reply: replies.getOrderSelection,
      next: {
        process: 'select'
      }
    },
    select: {
      validation: body('Body').notEmpty().isInt().withMessage('Please enter a valid numeric selection.'),
      response: responses.setOrderSelection,
    }
  },
  remove: {
    date: {
      validation: body('Body').notEmpty().isDate().withMessage('Please enter a valid removal date in the form of "MM/DD/YYYY".'),
      response: responses.setRemovalDate,
      reply: replies.getRemovalConfirmation,
      next: {
        state: 'confirm',
        process: 'remove'
      }
    }
  }
};