import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateServiceDto } from './create-service.dto';
const db = require('../../models');
import { Service } from './services.interface';
import { captureRejectionSymbol } from 'events';

@Injectable()
export class ServiceService {
  async createService( createServiceDto: CreateServiceDto,): Promise<String> {
    try {
      const categoryServiceExist=await db.ServiceCategory.findByPk(createServiceDto.ServiceCategoryId)
      if(!categoryServiceExist){return `#${createServiceDto.ServiceCategoryId} not found`;
    }else
    { 
      const Service = await db.Service.create(createServiceDto);
      return Service.save();}}
     catch (error) {
      throw new HttpException(error.message, 400);
    }
  }

  async getAllService(): Promise<Service[]> {
    const Service = await db.Service.findAll();
    if (!Service || Service.length == 0) {
      throw new NotFoundException('Service data not found!');
    }
    return Service;
  }
  async getServiceById(id: number): Promise<Service> {
    const Service = await db.Service.findByPk(id);
    if (!Service) {
      throw new NotFoundException(`Service#${id} not found`);
    }
    return Service;
  }
  async updateServiceById(id: number, data: any): Promise<string> {
    { const categoryServiceExist=await db.ServiceCategory.findByPk(data.ServiceCategoryId)
        if(!categoryServiceExist){return `#${data.ServiceCategoryId} not found`;
      }else if(categoryServiceExist==null ||categoryServiceExist)
      { 
      const Service = await this.getServiceById(id);
      if (!Service) {
        throw new NotFoundException(`Service #${id} not found`);
      } else {
        await db.Service.update(data, { where: { id: id } });
        return `Service with ID ${id} updated successfully : ${JSON.stringify(data)}`;
      }
    }}
  }

  async deleteServiceById(id: number): Promise<string> {
    const Service = await this.getServiceById(id);
    if (!Service) {
      throw new NotFoundException(`Service#${id} not found`);
    } else {
      await db.Service.destroy({ where: { id: id } });
      return `Service with ID ${id} deleted successfully.`;
    }
  }
 
  }
