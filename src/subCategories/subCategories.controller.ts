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
import { SubCategoriesService } from './subCategories.service';
import { CreateSubCategoryDto } from './create-sub-category.dto';
import { ValidationPipeWithErrors } from 'src/middlewares/validation.pipe';

@Controller('SubCategory')
export class SubCategoriesController {
  constructor(private readonly subcategoriesService: SubCategoriesService) {}
  @Post()
  @UsePipes(new ValidationPipeWithErrors())

  async create(@Res() response ,@Body() createSubCategoryDto: CreateSubCategoryDto) {
    try
    {
    const newSubcategory= await  this.subcategoriesService.createSubCategory(createSubCategoryDto);
    response.status(HttpStatus.CREATED).json({
      message: 'SubCategory has been created successfully',
      status: HttpStatus.CREATED,
      data: newSubcategory
  
    });}
    catch(error)
    {
  response.status(HttpStatus.BAD_REQUEST).send("saving " + JSON.stringify(error));
    }}
  @Get()
  async getSubCategorys(@Res() response) {
    try {
      const SubCategoryData =
        await this.subcategoriesService.getAllSubCategories();
        console.log(SubCategoryData)
      return response.status(HttpStatus.OK).json({
        message: ' All SubCategories  data found  successfully ',
        status: HttpStatus.OK,
        data: SubCategoryData,
      });
    } catch (err) {
      return response.status(err.status).json({
        //status: HttpStatus.BAD_REQUEST,
        message: err.response,
        data: null,
      });
    }
  }
  @Get('/:id')
  async getSubCategory(@Res() response, @Param('id') id: number) {
    try {
      const existingSubCategory =
        await this.subcategoriesService.getSubCategoryById(id);
      return response.status(HttpStatus.OK).json({
        message: 'SubCategory found  successfully',

        data: existingSubCategory,
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
    @Body() updateSubCategoryDto: Partial<CreateSubCategoryDto>,
  ) {
    try {
      const deletedSubCategory =
        await this.subcategoriesService.updateSubCategoryById(
          id,
          updateSubCategoryDto,
        );
      return response.status(HttpStatus.OK).json({
        message: 'SubCategory update  successfully',

        data: deletedSubCategory,
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
  async deleteSubCategory(@Res() response, @Param('id') id: number) {
    try {
      const deletedSubCategory =
        await this.subcategoriesService.deleteSubCategoryById(id);
      return response.status(HttpStatus.OK).json({
        message: 'SubCategory deleted  successfully',

        data: deletedSubCategory,
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
