import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient().$extends({
  result: {
    customer: {
      FullName: {
        needs: { FirstName: true, LastName: true },
        compute(customer) {
          return `${customer.FirstName} ${customer.LastName}`;
        }
      },
      FormattedPhoneNumber: {
        needs: { PhoneNumber: true },
        compute(customer) {
          let areaCode = customer.PhoneNumber.substring(2, 5),
            centralOfficeCode = customer.PhoneNumber.substring(5, 8),
            subscriberLine = customer.PhoneNumber.substring(8, 12);

          return `(${areaCode}) ${centralOfficeCode}-${subscriberLine}`;
        }
      }
    }
  }
});

export default prisma;
