import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './create-product.dto';
const db = require('../../models');

@Injectable()
export class ProductsService {
  async createProduct( createProductDto: CreateProductDto){
    try {
      console.log(createProductDto.stock)
      const SubcategoryExist = await db.SubCategory.findByPk(createProductDto.SubCategoryId);


      if (!SubcategoryExist) {
        return `#${createProductDto.SubCategoryId}  SubCategoryID  not found !`;
      }if(createProductDto.stock<0){        return `#${createProductDto.stock}  stock positive !`;
    }
      else 
      { const newProduct=await db.Product.create(createProductDto);
    return  newProduct.save();
      }

  
    } catch (error) {
      throw new HttpException(error.message, 400);
    }
  }
  async getAllProducts(): Promise<CreateProductDto[]> {
    const Product = await db.Product.findAll();
    if (!Product || Product.length == 0) {
      throw new NotFoundException('Products data not found!');
    }
    return Product;
  }
  async getProductById(id: number): Promise<CreateProductDto> {
    const Product = await db.Product.findByPk(id);
    if (!Product) {
      throw new NotFoundException(`Product#${id} not found`);
    }
    return Product;
  }
  async updateProductById(id: number, data: any): Promise<string> {
    {      const SubcategoryExist = await db.SubCategory.findByPk(data.SubCategoryId);

      const Product = await this.getProductById(id);
      if (!Product) {
        throw new NotFoundException(`Product #${id} not found`);
      } else 
        if(data.SubCategoryId==null||SubcategoryExist)
{
        await db.Product.update(data, { where: { id: id } });
        return `Product with ID ${id} updated successfully : ${JSON.stringify(data)}`;
      }else if(!SubcategoryExist)return `#${data.SubCategoryId}  SubCategoryID  not found !`;
    }
  }

  async deleteProductById(id: number): Promise<string> {
    const Product = await this.getProductById(id);
    if (!Product) {
      throw new NotFoundException(`Product#${id} not found`);
    } else {
      await db.Product.destroy({ where: { id: id } });
      return `Product with ID ${id} deleted successfully.`;
    }
  }
}
