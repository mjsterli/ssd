import prisma from "../../db";

const orderSelect = {
  OrderID: true,
  PropertyAddress: true,
  PropertyCounty: true,
  RequestedInstallDate: true,
  RequestedRemoveDate: true,
  Occupancy: true,
  RequestedService: { select: { Description: true } },
  belongsTo: { select: { FirstName: true, LastName: true, PhoneNumber: true } },
  Fullfillment: {
    select: {
      FullfilledAt: true,
      EmployeeWhoFullfilled: { select: { FirstName: true, LastName: true } },
    },
  },
  Removal: {
    select: {
      RemovedAt: true,
      EmployeeWhoRemoved: { select: { FirstName: true, LastName: true } },
    },
  },
};

export const getDashboard = async (_, res) => {
  const [pendingInstalls, pendingRemovals, recentlyCompleted] = await Promise.all([
    // Not yet installed
    prisma.order.findMany({
      where: { Fullfillment: null },
      orderBy: { RequestedInstallDate: "asc" },
      select: orderSelect,
    }),

    // Installed but not yet removed
    prisma.order.findMany({
      where: { Fullfillment: { isNot: null }, Removal: null },
      orderBy: { Fullfillment: { FullfilledAt: "asc" } },
      select: orderSelect,
    }),

    // Both installed and removed
    prisma.order.findMany({
      where: { Fullfillment: { isNot: null }, Removal: { isNot: null } },
      orderBy: { Removal: { RemovedAt: "desc" } },
      select: orderSelect,
    }),
  ]);

  res.json({ pendingInstalls, pendingRemovals, recentlyCompleted });
};
