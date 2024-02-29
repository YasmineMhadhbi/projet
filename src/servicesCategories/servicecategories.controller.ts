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
const db = require('../../models');

import { CreateServiceCategoryDto } from './create-servicecategories.dto.js';
import { ValidationPipeWithErrors } from 'src/middlewares/validation.pipe';
import { ServicesCategoriesService } from './servicecategories.service.js';
import { ServiceCategory } from './servicecategories.interface.js';
@Controller('ServiceCategory')
export class ServicesCategoryController {
  constructor(private readonly ServicesCategoriesService: ServicesCategoriesService) {}
  @Post()
  @UsePipes(new ValidationPipeWithErrors())


 async create(@Res() response ,@Body() CreateServiceCategoryDto: CreateServiceCategoryDto) {
    try{
    const newCategory= await  this.ServicesCategoriesService.createCategory(CreateServiceCategoryDto);

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
      const CategoryData = await this.ServicesCategoriesService.getAllCategories();
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
      const existingCategory = await this.ServicesCategoriesService.getCategoryById(id);
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
    @Body() updateCategoryDto: Partial<ServiceCategory>,
  ) {
    try {
      const deletedCategory = await this.ServicesCategoriesService.updateCategoryById(
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
        await this.ServicesCategoriesService.deleteCategoryById(id);
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
