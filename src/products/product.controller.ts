import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from "@nestjs/common";
import { AppService } from "src/app.service";
import { Product } from "src/models/product.model";

@Controller('product')
export class ProductController {
  constructor(private appService: AppService) {}

  @Post()
  registerProduct(@Body() productData: Product): Product {
    return this.appService.registerProduct(productData)
  }

  @Delete(':ProductId')
  deleteProduct(@Param('ProductId', ParseIntPipe) productId:number): any {
    return this.appService.deleteProd(productId)
  }

  @Put()
  modifyProduct(@Body() productData: Product): any {
    return this.appService.editProduct(productData)
  }

  @Get(':ProductId')
  getProduct(@Param('ProductId', ParseIntPipe) productId:number): any{
    return this.appService.getProduct(productId)
  }
}
