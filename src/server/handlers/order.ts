import prisma from '../db';

export const getOrders = async (req, res) => {
  const orders = await prisma.order.findMany();

  res.json({ data: orders});
};

export const getOrder = async (req, res) => {
  const orderid = req.params.orderid;

  const order = await prisma.order.findUnique({
    where: {
      OrderID: orderid
    }
  });

  res.json({ data: order});
}