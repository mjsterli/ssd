import prisma from "../../db";
import { Request, Response } from "express";

export const getOrders = async (_: any, res: Response) => {
  const orders = await prisma.order.findMany();

  res.json({ orders: orders });
};

export const getOrder = async (req: Request, res: Response) => {
  const orderid = req.params.orderid ?? req.query.orderid;

  const order = await prisma.order.findUnique({
    where: {
      OrderID: orderid
    },
    select: {
      OrderID: true,
      CreatedAt: true,
      PropertyAddress: true,
      PropertyCounty: true,
      RequestedService: {
        select: {
          Description: true
        }
      },
      RequestedInstallDate: true,
      Occupancy: true,
      belongsTo: {
        select: {
          FirstName: true,
          LastName: true,
          PhoneNumber: true,
          EmailAddress: true
        }
      },
      Fullfillment: {
        select: {
          FullfilledAt: true,
          EmployeeWhoFullfilled: {
            select: {
              FirstName: true,
              LastName: true
            }
          }
        }
      }
    }
  });

  res.json({ order: order });
};
