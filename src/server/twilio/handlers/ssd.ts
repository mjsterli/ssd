import { body, matchedData } from "express-validator";
import * as actions from "./functions/actions";
import * as prompts from "./functions/prompts";
import { parseFullName } from "parse-full-name";

const isValidDate = (dateToCheck) => {
  const date = new Date(dateToCheck);
  return !isNaN(date.getTime());
};

const isAFutureDate = (date) => {
  const futureDate = new Date(date),
    currentDate = new Date();

  return futureDate > currentDate;
};

const isRemovalAfterInstall = (removalValue, { req }) => {
  const orderToRemove = req.session.customer.Orders.find(
    (order) => order.Remove
  );
  const installDate = new Date(orderToRemove.RequestedInstallDate),
    removalDate = new Date(removalValue);

  return removalDate > installDate;
};

const formatRemovalDateAfterInstallDateMessage = (
  _,
  {
    req: {
      session: {
        customer: { Orders }
      }
    }
  }
) => {
  const orderToRemove = Orders.find((order) => order.Remove);
  return `Please enter a removal date after the install date: ${formatDate(orderToRemove.RequestedInstallDate)}`;
};

const formatDate = (dateToFormat) => {
  const date = new Date(dateToFormat);
  const day = `${date.getDay() + 1}`.padStart(2, "0");
  const month = `${+date.getMonth() + 1}`.padStart(2, "0");
  const year = date.getFullYear();

  return `${month}-${day}-${year}`;
};

export const ssd = {
  newCustomer: {
    init: {
      prompt: prompts.greetNewCustomer,
      action: actions.initializeCustomer,
      next: {
        process: "name"
      }
    },
    name: {
      validation: body("Body")
        .notEmpty()
        .trim()
        .withMessage(
          "Please reply with:\n[Full Name]\n[Email Address]\n[Brokerage]"
        ),
      prompt: prompts.getBrokerage,
      action: actions.setCustomer,
      next: {
        process: "brokerage"
      }
    },
    email: {
      validation: body("Body")
        .notEmpty()
        .isEmail()
        .withMessage("Please enter a valid email address."),
      prompt: prompts.getBrokerage,
      action: actions.setEmail,
      next: {
        process: "brokerage"
      }
    },
    brokerage: {
      validation: body("Body")
        .notEmpty()
        .withMessage("Please enter a valid brokerage."),
      action: actions.setBrokerage,
      next: {
        state: "install",
        process: "init"
      }
    }
  },
  install: {
    init: {
      prompt: prompts.getPropertyAddress,
      next: {
        process: "address"
      }
    },
    newOrder: {
      prompt: prompts.greetWithNewOrder,
      next: {
        process: "address"
      }
    },
    address: {
      validation: body("Body")
        .notEmpty()
        .withMessage("Please enter a valid US mailing address."),
      prompt: prompts.getCounty,
      action: actions.setPropertyAddress,
      next: {
        process: "county"
      }
    },
    county: {
      validation: body("Body")
        .notEmpty()
        .isAlpha()
        .withMessage("Please enter a valid county name."),
      prompt: prompts.getService,
      action: actions.setCounty,
      next: {
        process: "service"
      }
    },
    service: {
      validation: body("Body")
        .notEmpty()
        .isInt({ gt: 0, lt: 5 })
        .withMessage("Please enter a valid numeric service between 1 and 4."),
      prompt: prompts.getServiceDate,
      action: actions.setService,
      next: {
        process: "date"
      }
    },
    date: {
      validation: body("Body")
        .notEmpty()
        .custom(isValidDate)
        .withMessage(
          'Please enter a valid service date in the form of "MM/DD/YYYY".'
        )
        .custom(isAFutureDate)
        .withMessage("Please enter a future service date."),
      prompt: prompts.getOccupancy,
      action: actions.setServiceDate,
      next: {
        process: "occupancy"
      }
    },
    occupancy: {
      validation: body("Body")
        .notEmpty()
        .isInt({ gt: 0, lt: 4 })
        .withMessage("Please enter a valid numeric occupancy between 1 and 3."),
      prompt: prompts.getInstallConfirmation,
      action: actions.setOccupancy,
      next: {
        state: "confirm",
        process: "install"
      }
    }
  },
  confirm: {
    install: {
      validation: body("Body")
        .notEmpty()
        .isAlpha()
        .isIn(["c", "C", "n", "N"])
        .withMessage("Please enter 'C' to confirm or 'N' to cancel."),
      prompt: prompts.endConversation,
      action: actions.setInstallConfirmation
    },
    remove: {
      validation: body("Body").notEmpty().isAlpha().isIn(["c", "C", "n", "N"]),
      prompt: prompts.endConversation,
      action: actions.setRemovalConfirmation
    }
  },
  display: {
    init: {
      prompt: prompts.getOrderSelection,
      next: {
        process: "select"
      }
    },
    select: {
      validation: body("Body")
        .notEmpty()
        .isInt()
        .withMessage("Please enter a valid numeric selection."),
      action: actions.setOrderSelection
    }
  },
  remove: {
    init: {
      prompt: prompts.getRemovalDate,
      next: {
        process: "date"
      }
    },
    date: {
      validation: body("Body")
        .notEmpty()
        .custom(isValidDate)
        .withMessage(
          'Please enter a valid removal date in the form of "MM/DD/YYYY".'
        )
        .custom(isRemovalAfterInstall)
        .withMessage(formatRemovalDateAfterInstallDateMessage),
      prompt: prompts.getRemovalConfirmation,
      action: actions.setRemovalDate,
      next: {
        state: "confirm",
        process: "remove"
      }
    }
  }
};
