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
};

export const getDashboard = async (_, res) => {
  const now = new Date();

  const [pendingInstalls, pendingRemovals, recentlyCompleted] = await Promise.all([
    // Pending installs: not yet fulfilled, ordered by install date (oldest first)
    prisma.order.findMany({
      where: { Fullfillment: null },
      orderBy: { RequestedInstallDate: "asc" },
      select: orderSelect,
    }),

    // Needs removal: remove date is set and has passed, not yet fulfilled
    prisma.order.findMany({
      where: {
        RequestedRemoveDate: { not: null, lte: now },
        Fullfillment: null,
      },
      orderBy: { RequestedRemoveDate: "asc" },
      select: orderSelect,
    }),

    // Recently completed: has a fulfillment record
    prisma.order.findMany({
      where: { Fullfillment: { isNot: null } },
      orderBy: { Fullfillment: { FullfilledAt: "desc" } },
      select: orderSelect,
    }),
  ]);

  res.json({ pendingInstalls, pendingRemovals, recentlyCompleted });
};
