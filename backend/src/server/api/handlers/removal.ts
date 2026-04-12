import prisma from "../../db";

export const removeOrder = async (req, res) => {
  const orderid = req.params.orderid;
  const { employeeId, removedAt } = req.body;

  if (!employeeId) {
    return res.status(400).json({ error: "employeeId is required" });
  }

  try {
    const removal = await prisma.removal.create({
      data: {
        RemovedOrderID: orderid,
        RemovedAt: removedAt ? new Date(removedAt) : new Date(),
        RemovedEmployeeID: employeeId,
      },
    });
    res.json({ removal });
  } catch (e: any) {
    if (e.code === "P2002") {
      return res.status(409).json({ error: "Order already removed" });
    }
    throw e;
  }
};
