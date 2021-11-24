import { Controller, Get, HttpException, Param, ParseIntPipe } from '@nestjs/common';
import { AxiosError } from 'axios';
import { OrderProduct } from 'src/models/order-product.model';
import { OrderDTO } from 'src/models/order.model';
import { OrdersService } from './orders.service';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Get()
  getOrders(): Promise<OrderDTO[]> {
    return this.ordersService.getOrders()
    .then(res=>{
      return res
    })
    .catch((err:AxiosError)=>{
      throw new HttpException(err.message, err.response.status)
    });
  }

  @Get(':OrderID')
  getOrder(@Param('OrderID', ParseIntPipe) orderID:number): Promise<OrderDTO>{
    return this.ordersService.getOrder(orderID)
    .then(res=>{
      return res
    })
    .catch((err:AxiosError)=>{
      throw new HttpException(err.message, err.response.status)
    });
  }

  @Get(':OrderID/products')
  getOrderProducts(@Param('OrderID', ParseIntPipe) orderID:number): Promise<OrderProduct[]> {
    return this.ordersService.getOrderProducts(orderID)
    .then(res=>{
      return res
    })
    .catch((err:AxiosError)=>{
      throw new HttpException(err.message, err.response.status)
    });
  }

}
