import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCartDTO } from './create-cartdto';
const db = require('../../models');
import { Cart } from './cart.interface';

@Injectable()
export class CartService {
async createCart(createCartDto:CreateCartDTO){
  try{
    
    const newCart=await db.Cart.create(createCartDto)
  return newCart.save();}
  catch(error){

  throw new HttpException(error.message, 400);
}
}

  async getAllCart(): Promise<Cart[]> {
    const Cart = await db.Cart.findAll();
    if (!Cart || Cart.length == 0) {
      throw new NotFoundException('Cart data not found!');
    }
    return Cart;
  }
  async getCartById(id: number): Promise<Cart> {
    const Cart = await db.Cart.findByPk(id);
    if (!Cart) {
      throw new NotFoundException(`Cart#${id} not found`);
    }
    return Cart;
  }
  async updateCartById(id: number, data: any): Promise<string> {
    {
      const Cart = await this.getCartById(id);
      if (!Cart) {
        throw new NotFoundException(`Cart #${id} not found`);
      } else {
        await db.Cart.update(data, { where: { id: id } });
        return `Cart with ID ${id} updated successfully : ${JSON.stringify(data)}`;
      }
    }
  }

  async deleteCartById(id: number): Promise<string> {
    const Cart = await this.getCartById(id);
    if (!Cart) {
      throw new NotFoundException(`Cart#${id} not found`);
    } else {
      await db.Cart.destroy({ where: { id: id } });
      return `Cart with ID ${id} deleted successfully.`;
    }
  }
 
  }
