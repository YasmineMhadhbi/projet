import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
const db = require('../../models');
import { CreateServiceCategoryDto } from './create-servicecategories.dto';
import { ServiceCategory } from './servicecategories.interface';
@Injectable()
export class ServicesCategoriesService {
  async createCategory( CreateServiceCategoryDto: CreateServiceCategoryDto,): Promise<String> {
    try {
      
      const category = await db.ServiceCategory.create(CreateServiceCategoryDto);
      return category.save();}
    catch (error) {
      throw new HttpException(error.message, 400);
    }
  }

  async getAllCategories(): Promise<ServiceCategory[]> {
    const category = await db.ServiceCategory.findAll();
    if (!category || category.length == 0) {
      throw new NotFoundException('categories data not found!');
    }
    return category;
  }
  async getCategoryById(id: number): Promise<ServiceCategory> {
    const category = await db.ServiceCategory.findByPk(id);
    if (!category) {
      throw new NotFoundException(`Category#${id} not found`);
    }
    return category;
  }
  async updateCategoryById(id: number, data: any): Promise<string> {
    {
      const category = await this.getCategoryById(id);
      if (!category) {
        throw new NotFoundException(`category #${id} not found`);
      } else {
        await db.ServiceCategory.update(data, { where: { id: id } });
        return `category with ID ${id} updated successfully : ${JSON.stringify(data)}`;
      }
    }
  }

  async deleteCategoryById(id: number): Promise<string> {
    const category = await this.getCategoryById(id);
    if (!category) {
      throw new NotFoundException(`category#${id} not found`);
    } else {
      await db.ServiceCategory.destroy({ where: { id: id } });
      return `category with ID ${id} deleted successfully.`;
    }
  }
 
  }
