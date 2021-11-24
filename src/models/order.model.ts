export interface OrderDTO {
  OrderID: number;
  CustomerID: string;
  ShipCity: string;
  ShipCountry: string;
  EmployeeID: number;
  OrderDate: string;
  RequiredDate: string;
  ShippedDate: string;
  ShipVia: number;
  Freight: string;
  ShipName: string;
  ShipAddress: string;
  ShipRegion: string | null;
  ShipPostalCode: string;
}
