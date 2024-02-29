import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res, UploadedFile, UseInterceptors, UsePipes } from '@nestjs/common';
import { diskStorage } from 'multer';
import { ProductsService } from './product.service.js';
import { FileInterceptor } from '@nestjs/platform-express';
import { Product } from './products.interface.js';
import { CreateProductDto } from './create-product.dto.js';
import { ValidationPipeWithErrors } from 'src/middlewares/validation.pipe';
@Controller('Products')
export class ProductsController {
  constructor(private readonly ProductsService: ProductsService) {}

  @Post()

  @UseInterceptors(
    FileInterceptor("file",{
      storage: diskStorage({
        destination:"./upload/product",
        filename: (_request, file, callback) =>
          callback(null, `${new Date().getTime()}-${file.originalname}`),
      }),
    }),
  )
 @UsePipes(new ValidationPipeWithErrors())
   async create(@Res() response ,@Body() createProductDto: CreateProductDto ,@UploadedFile() file) {
    try
    {
    createProductDto.image=file.filename;
   const newProduct= await this.ProductsService.createProduct(createProductDto);
   console.log(newProduct)
   response.status(HttpStatus.CREATED).json({
    status: HttpStatus.CREATED,
    data: newProduct

  });}
  catch(error)
  {
response.status(HttpStatus.BAD_REQUEST).send("saving " + JSON.stringify(error));
  }}
  @Get()
  findAll(): Promise<CreateProductDto[]> {
    return this.ProductsService.getAllProducts();
  }

  @Get(':id')
  findOne(@Param('id') id:number){
    return this.ProductsService.getProductById(id)
  }
 

  @Put(':id')
  @UseInterceptors(
    FileInterceptor("file",{
      storage: diskStorage({
        destination:"./upload/Product",
        filename: (_request, file, callback) =>
          callback(null, `${new Date().getTime()}-${file.originalname}`),
      }),
    }),
  )
  @UsePipes(new ValidationPipeWithErrors())

  async update(@Res() response,@Param('id') id:number , @Body() updateProductDto:Partial<Product>, @UploadedFile() file){
    try{
      if(file==undefined||file==null){
      updateProductDto.image=(await this.ProductsService.getProductById(id)).image;
      
    const newProductUpdate=await this.ProductsService.updateProductById(id,updateProductDto)
    response.status(HttpStatus.OK).json({
      message: 'SubCategory update  successfully',

      data: newProductUpdate,
      status: HttpStatus.OK,
    });
  }} catch (err) {
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

  

}

