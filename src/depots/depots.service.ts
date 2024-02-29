import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { Depot } from './depots.interface';
import { CreateDepotDto } from './create-depots.dto';

const db = require('../../models');

@Injectable()
export class DepotsService {
  async createDepot( createDepotDto: CreateDepotDto,): Promise<string> {
    try {
      const depot = await db.Depot.create(createDepotDto);
      const ProductExist=await db.Product.findByPk(createDepotDto.ProductId)
      if (!ProductExist) {
        return `#${createDepotDto.ProductId}  ProductID  not found !`;
      }
      else
      {
      return depot.save();
    }} catch (error) {
      throw new HttpException(error.message, 400);
    }
  }

  async getAllDepots(): Promise<Depot[]> {
    const depot = await db.Depot.findAll();
    if (!depot || depot.length == 0) {
      throw new NotFoundException('Depots data not found!');
    }
    return depot;
  }
  async getDepotById(id: number): Promise<Depot> {
    const depot = await db.Depot.findByPk(id);
    if (!depot) {
      throw new NotFoundException(`Depot#${id} not found`);
    }
    return depot;
  }
  async updateDepotById(id: number, data: any): Promise<string> {
    {      const ProductExist=await db.Product.findByPk(data.ProductId)

      const depot = await this.getDepotById(id);
      if (!depot) {
        throw new NotFoundException(`Depot #${id} not found`);
      } else if(data.ProductId==null||ProductExist){
        await db.Depot.update(data, { where: { id: id } });
        return `Depot with ID ${id} updated successfully : ${JSON.stringify(data)}`;
      
    }else if(!ProductExist)         return `#${data.ProductId}  ProductID  not found !`;

  }
  }

  async deleteDepotById(id: number): Promise<string> {
    const depot = await this.getDepotById(id);
    if (!depot) {
      throw new NotFoundException(`Depot#${id} not found`);
    } else {
      await db.Depot.destroy({ where: { id: id } });
      return `Depot with ID ${id} deleted successfully.`;
    }
  }
}
