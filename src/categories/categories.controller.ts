import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Res,
  UsePipes,
} from '@nestjs/common';

import { CategoriesService } from './categories.service';
import { Category } from '../../models/category.js';
import { CreateCategoryDto } from './create-category.dto';
import { ValidationPipeWithErrors } from 'src/middlewares/validation.pipe';
@Controller('category')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}
  @Post()
  @UsePipes(new ValidationPipeWithErrors())


 async create(@Res() response ,@Body() createCategoryDto: CreateCategoryDto) {
    try
    { 
    const newCategory= await  this.categoriesService.createCategory(createCategoryDto);
    response.status(HttpStatus.CREATED).json({
      status: HttpStatus.CREATED,
      data: newCategory
  
    });}
    catch(error)
    {
 response.status(HttpStatus.BAD_REQUEST).send("saving " + JSON.stringify(error));

 
    }
    }
  @Get()
  async getCategorys(@Res() response) {
    try {
      const CategoryData = await this.categoriesService.getAllCategories();
      return response.status(HttpStatus.OK).json({
        message: ' All Categories  data found  successfully ',
        status: HttpStatus.OK,
        data: CategoryData,
      });
    } catch (err) {
      return response.status(err.status).json({
        status: HttpStatus.BAD_REQUEST,
        message: err.response,
        data: null,
      });
    }
  }
  @Get('/:id')
  async getCategory(@Res() response, @Param('id') id: number) {
    try {
      const existingCategory = await this.categoriesService.getCategoryById(id);
      return response.status(HttpStatus.OK).json({
        message: 'Category found  successfully',

        data: existingCategory,
        status: HttpStatus.OK,
      });
    } catch (err) {
      return response.status(err.status).json({
        status: HttpStatus.BAD_REQUEST,
        message: err.response,
        data: null,
      });
    }
  }
  @Put(':id')
  @UsePipes(new ValidationPipeWithErrors())

  async update(
    @Res() response,
    @Param('id') id: number,
    @Body() updateCategoryDto: Partial<Category>,
  ) {
    try {
      const deletedCategory = await this.categoriesService.updateCategoryById(
        id,
        updateCategoryDto,
      );
      return response.status(HttpStatus.OK).json({
        message: 'Category deleted  successfully',

        data: deletedCategory,
        status: HttpStatus.OK,
      });
    } catch (err) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        message: err.response,
        status: HttpStatus.BAD_REQUEST,
        data: null,
      });
    }
  }

  @Delete(':id')
  async deleteCategory(@Res() response, @Param('id') id: number) {
    try {
      const deletedCategory =
        await this.categoriesService.deleteCategoryById(id);
      return response.status(HttpStatus.OK).json({
        message: 'Category deleted  successfully',

        data: deletedCategory,
        status: HttpStatus.OK,
      });
    } catch (err) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        message: err.response,
        status: HttpStatus.BAD_REQUEST,
        data: null,
      });
    }
  }
}
