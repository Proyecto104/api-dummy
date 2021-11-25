import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from "@nestjs/common";
import { AppService } from "src/app.service";
import { Reserve } from "src/models/reserve.model";

@Controller('reservation')
export class ReservationController {
  constructor(private appService: AppService) {}

  @Get('/user/:UserId')
  getUserReservations(@Param('UserId', ParseIntPipe) userId:number): any{
    return this.appService.getAllUserReservation(userId)
  }

  @Get('/user/:UserId/active')
  getActiveUserReservations(@Param('UserId', ParseIntPipe) userId:number): any{
    return this.appService.getAllActiveUserReservation(userId)
  }

  @Get('/business/:BusinessId')
  getBusinessReservations(@Param('BusinessId', ParseIntPipe) businessId:number): any{
    return this.appService.getAllBusinessReservation(businessId)
  }

  @Get('/business/:BusinessId/active')
  getActiveBusinessReservations(@Param('BusinessId', ParseIntPipe) businessId:number): any{
    return this.appService.getAllActiveBusinessReservation(businessId)
  }

  @Get(':ReservationId')
  getReservation(@Param('ReservationId', ParseIntPipe) reservationId:number): any{
    return this.appService.getReservation(reservationId)
  }

  @Post()
  registerReservation(@Body() reserveData: Reserve): Reserve {
    return this.appService.registerReservation(reserveData)
  }

  @Post('token')
  registerReservationWithToken(@Body() reserveData: Reserve): Reserve {
    return this.appService.registerReservationWithToken(reserveData)
  }

  @Delete(':ReservationId')
  cancelReservation(@Param('ReservationId', ParseIntPipe) reservationId:number): any {
    return this.appService.cancelReservation(reservationId)
  }

  @Put(':ReservationId')
  deliveredReservation(@Param('ReservationId', ParseIntPipe) reservationId:number): any {
    return this.appService.deliveredReservation(reservationId)
  }

}
