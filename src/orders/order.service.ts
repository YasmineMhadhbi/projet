import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
const db = require('../../models');
import { Order } from './Order.interface';
import { CreateOrderDTO } from './create-oderdto';

@Injectable()
export class OrderService {
async createOrder(createOrderDto:CreateOrderDTO){
  try{
    
    const newOrder=await db.Order.create(createOrderDto)
  return newOrder.save();}
  catch(error){

  throw new HttpException(error.message, 400);
}
}

  async getAllOrder(): Promise<Order[]> {
    const Order = await db.Order.findAll();
    if (!Order || Order.length == 0) {
      throw new NotFoundException('Order data not found!');
    }
    return Order;
  }
  async getOrderById(id: number): Promise<Order> {
    const Order = await db.Order.findByPk(id);
    if (!Order) {
      throw new NotFoundException(`Order#${id} not found`);
    }
    return Order;
  }
  async updateOrderById(id: number, data: any): Promise<string> {
    {
      const Order = await this.getOrderById(id);
      if (!Order) {
        throw new NotFoundException(`Order #${id} not found`);
      } else {
        await db.Order.update(data, { where: { id: id } });
        return `Order with ID ${id} updated successfully : ${JSON.stringify(data)}`;
      }
    }
  }

  async deleteOrderById(id: number): Promise<string> {
    const Order = await this.getOrderById(id);
    if (!Order) {
      throw new NotFoundException(`Order#${id} not found`);
    } else {
      await db.Order.destroy({ where: { id: id } });
      return `Order with ID ${id} deleted successfully.`;
    }
  }
 
  }
