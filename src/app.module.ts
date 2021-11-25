import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LogInController } from './login/login.controller';
import { ProductController } from './products/product.controller';
import { ProductsController } from './products/products.controller';
import { ReservationController } from './reservations/reservation.controller';
import { SignInController } from './signin/signin.controller';

@Module({
  imports: [HttpModule],
  controllers: [AppController, LogInController, SignInController, ProductController, ProductsController, ReservationController],
  providers: [AppService],
})
export class AppModule {}
