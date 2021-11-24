import { Product } from "./product.model";

export interface OrderProduct{
    OrderID: number;
    ProductID: number;
    UnitPrice: string;
    Quantity: number;
    Discount: number;
    Product: Product;
}
