import { Module } from '@nestjs/common';

import { SequelizeModule } from '@nestjs/sequelize';
import { ProductsController } from './product.controller';
import { ProductsService } from './product.service';

@Module({
 
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
