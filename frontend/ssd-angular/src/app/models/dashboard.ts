export interface DashboardOrder {
  OrderID: string;
  PropertyAddress: string;
  PropertyCounty: string | null;
  RequestedInstallDate: string;
  RequestedRemoveDate: string | null;
  Occupancy: string;
  RequestedServiceID: number | null;
  RequestedService: { Description: string } | null;
  belongsTo: { FirstName: string; LastName: string; PhoneNumber: string };
  Fullfillment: {
    FullfilledAt: string;
    EmployeeWhoFullfilled: { FirstName: string; LastName: string };
  } | null;
  Removal: {
    RemovedAt: string;
    EmployeeWhoRemoved: { FirstName: string; LastName: string };
  } | null;
}

export interface DashboardData {
  pendingInstalls: DashboardOrder[];
  pendingRemovals: DashboardOrder[];
  recentlyCompleted: DashboardOrder[];
}
