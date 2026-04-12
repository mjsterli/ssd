import prisma from "../../db";

export const fulfillOrder = async (req, res) => {
  const orderid = req.params.orderid;
  const { employeeId, fulfilledAt } = req.body;

  if (!employeeId) {
    return res.status(400).json({ error: "employeeId is required" });
  }

  try {
    const fulfillment = await prisma.fullfillment.create({
      data: {
        FullfilledOrderID: orderid,
        FullfilledAt: fulfilledAt ? new Date(fulfilledAt) : new Date(),
        FullfilledEmployeeID: employeeId,
      },
    });
    res.json({ fulfillment });
  } catch (e: any) {
    if (e.code === "P2002") {
      return res.status(409).json({ error: "Order already fulfilled" });
    }
    throw e;
  }
};
