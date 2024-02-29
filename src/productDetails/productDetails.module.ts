import { Module } from '@nestjs/common';

import { SequelizeModule } from '@nestjs/sequelize';
import { ProductDetailsController } from './productDetails.controller';
import { ProductDetailsService } from './productDetails.service';


@Module({
 
  controllers: [ProductDetailsController],
  providers: [ProductDetailsService],
})
export class ProductDetailsModule {}
