import { Module } from '@nestjs/common';
import {  ServicesCategoriesService } from './servicecategories.service';
import { ServicesCategoryController } from './servicecategories.controller';

@Module({
  controllers: [ServicesCategoryController],
  providers: [ServicesCategoriesService],
})
export class ServiceCategoryModule {}
