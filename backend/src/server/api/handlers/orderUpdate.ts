import prisma from "../../db";

export const getServices = async (_, res) => {
  const services = await prisma.requestService.findMany({ orderBy: { RequestServiceID: "asc" } });
  res.json({ services });
};

export const updateOrder = async (req, res) => {
  const orderid = req.params.orderid;
  const { PropertyAddress, RequestedServiceID, RequestedInstallDate, Occupancy, RequestedRemoveDate } = req.body;

  const data: Record<string, unknown> = {};
  if (PropertyAddress !== undefined) data.PropertyAddress = PropertyAddress;
  if (RequestedServiceID !== undefined) data.RequestedServiceID = Number(RequestedServiceID);
  if (RequestedInstallDate !== undefined) data.RequestedInstallDate = new Date(RequestedInstallDate);
  if (Occupancy !== undefined) data.Occupancy = Occupancy;
  if (RequestedRemoveDate !== undefined) data.RequestedRemoveDate = RequestedRemoveDate ? new Date(RequestedRemoveDate) : null;

  const order = await prisma.order.update({ where: { OrderID: orderid }, data });
  res.json({ order });
};
