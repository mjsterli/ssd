import { body, matchedData, ValidationChain } from "express-validator";
import * as actions from "./functions/actions";
import * as prompts from "./functions/prompts";
import { parseFullName } from "parse-full-name";
import { parseAddress } from "parse-address";
import { Request } from "express";
import { Order } from "../types/interfaces";

const isValidDate = (dateToCheck: string) => {
  const date = new Date(dateToCheck);
  return !isNaN(date.getTime());
};

const isAFutureDate = (date: string) => {
  const futureDate = new Date(date),
    currentDate = new Date();

  return futureDate > currentDate;
};

const isRemovalAfterInstall = (
  removalValue: string,
  { req }: { req: Request }
) => {
  const orderToRemove = req.session.customer.Orders?.find(
    (order: Order) => order.Remove
  );

  if (orderToRemove) {
    const installDate = new Date(orderToRemove.RequestedInstallDate),
      removalDate = new Date(removalValue);

    return removalDate > installDate;
  }
};

const isValidUSAddress = (propertyAddress: string) => {
  let isValid = parseAddress(propertyAddress);
  return !!isValid;
};

const formatRemovalDateAfterInstallDateMessage = (
  _: any,
  {
    req: {
      session: {
        customer: { Orders }
      }
    }
  }: any
) => {
  const orderToRemove = Orders.find((order: Order) => order.Remove);
  return `Please enter a removal date after the install date: ${formatDate(orderToRemove.RequestedInstallDate)}`;
};

const formatDate = (dateToFormat: string) => {
  const date = new Date(dateToFormat);
  const day = `${date.getDay() + 1}`.padStart(2, "0");
  const month = `${+date.getMonth() + 1}`.padStart(2, "0");
  const year = date.getFullYear();

  return `${month}-${day}-${year}`;
};

const validateService = (value: number, { req }: { req: Request }) => {
  const maxServiceCount = req.session.loadedServices?.length ?? 0;

  if (+value < 1 || value > maxServiceCount) {
    throw Error(req.session.loadedServicesErrorMessage);
  } else {
    return true;
  }
};

const validateOrderSelection = (value: number, { req }: { req: Request }) => {
  const maxOrderSelectionCount = req.session.customer.Orders?.length ?? 0;
  let isValid = true;

  isValid &&= !isNaN(value);
  isValid &&= +value <= maxOrderSelectionCount && +value >= 0;

  if (!isValid) {
    let errorMessage = req.session.customer.Orders?.reduce(
      (propertyList: string, order, orderNum) =>
        propertyList + `${orderNum + 1}\) ${order.PropertyAddress}\n`,
      'Please select a number to remove a sign from a previous install or "0" to start a new install:\n0) New install\n'
    );
    throw Error(errorMessage);
  }

  return isValid;
};

export const ssd: ssdStates = {
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
        .withMessage("Please enter a property address.")
        .custom(isValidUSAddress)
        .withMessage("Please enter a valid US Mailing address."),
      prompt: prompts.getService,
      action: actions.setPropertyAddress,
      next: {
        process: "service"
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
        .custom(validateService as any),
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
        .custom(validateOrderSelection as any),
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
        .custom(isRemovalAfterInstall as any)
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
