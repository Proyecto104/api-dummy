import { Body, Controller, Get, Param, ParseIntPipe } from "@nestjs/common";
import { AppService } from "src/app.service";

@Controller('products')
export class ProductsController {
  constructor(private appService: AppService) {}

  @Get()
  getProducts(): any{
    return this.appService.getAllProducts()
  }

  @Get('/available')
  getActiveProducts(): any{
    return this.appService.getAllAvailableProducts()
  }

  @Get('/business/:BusinessId')
  getBusinessProducts(@Param('BusinessId', ParseIntPipe) businessId:number): any{
    return this.appService.getBusinessProducts(businessId)
  }

}
