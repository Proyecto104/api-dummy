import { Body, Controller, Post } from "@nestjs/common";
import { AppService } from "src/app.service";
import { User } from "src/models/user.model";

@Controller('signin')
export class SignInController {
  constructor(private appService: AppService) {}

  @Post()
  newUser(@Body() createUserDto: User): any {
    return this.appService.addUser(createUserDto)
  }

}
