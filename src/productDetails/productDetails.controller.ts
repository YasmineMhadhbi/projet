import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res, UploadedFile, UseInterceptors, UsePipes } from '@nestjs/common';
import { response } from 'express';
import { diskStorage } from 'multer';

import { ValidationPipeWithErrors } from 'src/middlewares/validation.pipe';
import { ProductDetailsService } from './productDetails.service';
import { CreateProductDetailsDto } from './create-productDetails.dto';
@Controller('ProductDetails')
export class ProductDetailsController {
  constructor(private readonly ProductsService: ProductDetailsService) {}

  @Post()
  
 @UsePipes(new ValidationPipeWithErrors())
   async create(@Res() response ,@Body() createProductDto: CreateProductDetailsDto ) {
    try
    {
     const newProduct= await this.ProductsService.createProductDetail(createProductDto);
   console.log(newProduct)
   response.status(HttpStatus.CREATED).json({
    status: HttpStatus.CREATED,
    data: newProduct

  });}
  catch(error)
  {
response.status(HttpStatus.BAD_REQUEST).send("saving " + JSON.stringify(error));
  }}/*
  @Get()
  findAll(): Promise<CreateProductDto[]> {
    return this.ProductsService.getAllProducts();
  }

  @Get(':id')
  findOne(@Param('id') id:number){
    return this.ProductsService.getProductById(id)
  }
 

  @Put(':id')
  
  @UsePipes(new ValidationPipeWithErrors())

  async update(@Res() response,@Param('id') id:number , @Body() updateProductDto:Partial<Product>,){
    try{
      
    const newProductUpdate=await this.ProductsService.updateProductById(id,updateProductDto)
    response.status(HttpStatus.OK).json({
      message: 'SubCategory update  successfully',

      data: newProductUpdate,
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
  @Delete(":id")
  remove(@Param('id') id:number){
    return this.ProductsService.deleteProductById(id)
  }
*/
  

}

