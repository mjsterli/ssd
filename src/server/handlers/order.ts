import prisma from '../db';

export const getOrders = async (req, res) => {
  const orders = await prisma.order.findMany();

  res.json({ orders: orders});
};

export const getOrder = async (req, res) => {
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
      RequestedServiceDate: true,
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

  res.json({order: order});
};
