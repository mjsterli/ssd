export interface CustomerOrder {
  OrderID: string;
  PropertyAddress: string;
  PropertyCounty: string | null;
  RequestedInstallDate: string;
  RequestedRemoveDate: string | null;
  Occupancy: string;
  RequestedService?: { Description: string };
}

export interface Customer {
  PhoneNumber: string;
  FormattedPhoneNumber: string;
  FirstName: string;
  LastName: string;
  FullName: string;
  Brokerage: string;
  EmailAddress: string;
  Orders?: CustomerOrder[];
}
