import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res, UploadedFile, UseInterceptors } from '@nestjs/common';

import { CategoriesService } from './categories.service';
import{Category} from '../../models/category.js'
@Controller('category')
export class CategoriesController {
  constructor(private readonly categoriesService:CategoriesService ) {}
  @Post()
  create (@Body() createCategoryDto:Category)
  {
    return this.categoriesService.createCategory(createCategoryDto);
  }
}