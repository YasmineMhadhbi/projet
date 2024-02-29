import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDetailsDto } from './create-productDetails.dto';
import { ProductDetails } from './productDetails.interface';
const db = require('../../models');

@Injectable()
export class ProductDetailsService {
  async createProductDetail(
    CreateProductDetailDto: CreateProductDetailsDto,
  ): Promise<String> {
    try {
      console.log(CreateProductDetailDto);
      
      const ProductExist = await db.Product.findByPk(CreateProductDetailDto.productId,);
      const CartExist = await db.Cart.findByPk(CreateProductDetailDto.cartId);
      if (!ProductExist) {
        return `# Product ${CreateProductDetailDto.productId} not found`;
      } else if (!CartExist) {
        return `# Cart${CreateProductDetailDto.CartId} not found`;
      } else {
        const ProductDetail = await db.ProductDetail.create(  CreateProductDetailDto);
        return ProductDetail.save();
      }
    } catch (error) {
      throw new HttpException(error.message, 400);
    }
  }/*

  async getAllProductDetails(): Promise<ProductDetails[]> {
    const ProductDetail = await db.ProductDetail.findAll();
    if (!ProductDetail || ProductDetail.length == 0) {
      throw new NotFoundException('ProductDetails data not found!');
    }
    return ProductDetail;
  }
  async getProductDetailById(id: number): Promise<ProductDetails> {
    const ProductDetail = await db.ProductDetail.findByPk(id);
    if (!ProductDetail) {
      throw new NotFoundException(`ProductDetail#${id} not found`);
    }
    return ProductDetail;
  }
  async updateProductDetailById(id: number, data: any): Promise<string> {
    {
      const ProductExist = await db.Product.findByPk(data.ProductId);
      if (!ProductExist) {
        return `#${data.ProductId} not found`;
      } else if (ProductExist == null || ProductExist) {
        const ProductDetail = await this.getProductDetailById(id);
        if (!ProductDetail) {
          throw new NotFoundException(`ProductDetail #${id} not found`);
        } else {
          await db.ProductDetail.update(data, { where: { id: id } });
          return `ProductDetail with ID ${id} updated successfully : ${JSON.stringify(data)}`;
        }
      }
    }
  }

  async deleteProductDetailById(id: number): Promise<string> {
    const ProductDetail = await this.getProductDetailById(id);
    if (!ProductDetail) {
      throw new NotFoundException(`ProductDetail#${id} not found`);
    } else {
      await db.ProductDetail.destroy({ where: { id: id } });
      return `ProductDetail with ID ${id} deleted successfully.`;
    }
  }*/
}
