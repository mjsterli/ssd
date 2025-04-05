import prisma from "../../db";
import { Request, Response } from "express";

export const getCustomers = async (_: any, res: Response) => {
  const customers = await prisma.customer.findMany();

  res.json({ customers: customers });
};

export const getCustomersWithOrders = async (_: any, res: Response) => {
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

export const getCustomerByPhoneNumber = async (req: Request, res: Response) => {
  const phoneNumber = req.params.phonenumber;

  const customer = await prisma.customer.findUnique({
    where: {
      PhoneNumber: phoneNumber
    }
  });

  res.json({ data: customer ?? {} });
};
