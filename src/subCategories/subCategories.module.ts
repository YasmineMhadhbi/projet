import { Module } from '@nestjs/common';
import { SubCategoriesService } from './subCategories.service';
import { SubCategoriesController } from './subCategories.controller';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
 
  controllers: [SubCategoriesController],
  providers: [SubCategoriesService],
})
export class SubCategoriesModule {}
