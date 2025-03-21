import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient().$extends({
  result: {
    customer: {
      FullName: {
        needs: { FirstName: true, LastName: true },
        compute(customer) {
          return `${customer.FirstName} ${customer.LastName}`;
        }
      }
    }
  }
});

export default prisma;
