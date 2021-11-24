import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AxiosError } from 'axios';
import { OrderProduct } from 'src/models/order-product.model';
import { OrderDTO } from 'src/models/order.model';

@Injectable()
export class OrdersService {

    constructor(private httpService: HttpService) { }

    getOrderProducts(orderID: number): Promise<OrderProduct[]> {
        return new Promise((resolve, reject) => {
            this.httpService.get('https://services.odata.org/V3/Northwind/Northwind.svc/Orders(' + orderID + ')/Order_Details?$format=json&$expand=Product')
                .subscribe({
                    next: (response) => resolve(response.data.value),
                    error: (error) => reject(error)
                });
        })
    }


    getOrders(): Promise<OrderDTO[]> {
        return new Promise((resolve, reject) => {
            this.httpService.get('https://services.odata.org/V3/Northwind/Northwind.svc/Orders?$format=json')
                .subscribe({
                    next: (response) => resolve(response.data.value),
                    error: (error) => reject(error)
                });
        })
    }

    getOrder(orderID: number): Promise<OrderDTO> {
        return new Promise((resolve, reject) => {
            this.httpService.get('https://services.odata.org/V3/Northwind/Northwind.svc/Orders(' + orderID + ')?$format=json')
                .subscribe({
                    next: (response) => resolve(response.data),
                    error: (error:AxiosError) => reject(error)
                });
        })
    }
}
