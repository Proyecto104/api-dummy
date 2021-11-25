import { Body, Controller, Get, Param, ParseIntPipe, Post } from "@nestjs/common";
import { AppService } from "src/app.service";

@Controller('login')
export class LogInController {
  constructor(private appService: AppService) {}

  @Post()
  login(@Body() loginData: {username: string, password: string}): any {
    return this.appService.loginUser(loginData)
  }

  @Get(':UserId')
  getOrder(@Param('UserId', ParseIntPipe) userId:number): any{
    return this.appService.getUser(userId)
  }

}
