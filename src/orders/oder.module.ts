import { Module } from '@nestjs/common';
import { OrderService } from './Order.service';
import { OrderController } from './Order.controller';

@Module({
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
