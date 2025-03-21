import prisma from "../../db";

export const getCustomers = async (_, res) => {
  const customers = await prisma.customer.findMany();

  res.json({ customers: customers });
};

export const getCustomersWithOrders = async (_, res) => {
  const customers = await prisma.customer.findMany({
    include: {
      Orders: {
        include: {
          RequestedService: {
            select: {
              Description: true
            }
          }
        }
      }
    }
  });

  res.json({ customers: customers });
};

export const getCustomerByPhoneNumber = async (req, res) => {
  const phoneNumber = req.params.phonenumber;

  const customer = await prisma.customer.findUnique({
    where: {
      PhoneNumber: phoneNumber
    }
  });

  res.json({ data: customer ?? {} });
};
