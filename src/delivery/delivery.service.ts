import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateDeliveryDTO } from './create-deliverydto';
const db = require('../../models');
import { Delivery } from './delivery.interface';

@Injectable()
export class DeliveryService {
async createDelivery(createDeliveryDto:CreateDeliveryDTO){
  try{
    
    const newdelivery=await db.Delivery.create(createDeliveryDto)
  return newdelivery.save();}
  catch(error){

  throw new HttpException(error.message, 400);
}
}

  async getAllDelivery(): Promise<Delivery[]> {
    const Delivery = await db.Delivery.findAll();
    if (!Delivery || Delivery.length == 0) {
      throw new NotFoundException('Delivery data not found!');
    }
    return Delivery;
  }
  async getDeliveryById(id: number): Promise<Delivery> {
    const Delivery = await db.Delivery.findByPk(id);
    if (!Delivery) {
      throw new NotFoundException(`Delivery#${id} not found`);
    }
    return Delivery;
  }
  async updateDeliveryById(id: number, data: any): Promise<string> {
    {
      const Delivery = await this.getDeliveryById(id);
      if (!Delivery) {
        throw new NotFoundException(`Delivery #${id} not found`);
      } else {
        await db.Delivery.update(data, { where: { id: id } });
        return `Delivery with ID ${id} updated successfully : ${JSON.stringify(data)}`;
      }
    }
  }

  async deleteDeliveryById(id: number): Promise<string> {
    const Delivery = await this.getDeliveryById(id);
    if (!Delivery) {
      throw new NotFoundException(`Delivery#${id} not found`);
    } else {
      await db.Delivery.destroy({ where: { id: id } });
      return `Delivery with ID ${id} deleted successfully.`;
    }
  }
 
  }
