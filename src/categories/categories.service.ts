import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
const db = require('../../models');
import { Category } from './categories.interface';
import { CreateCategoryDto } from './create-category.dto';

@Injectable()
export class CategoriesService {
  async createCategory( createCategoryDto: CreateCategoryDto,): Promise<String> {
    try {
      
      const category = await db.Category.create(createCategoryDto);
      return category.save();}
     catch (error) {
      throw new HttpException(error.message, 400);
    }
  }

  async getAllCategories(): Promise<Category[]> {
    const category = await db.Category.findAll();
    if (!category || category.length == 0) {
      throw new NotFoundException('categories data not found!');
    }
    return category;
  }
  async getCategoryById(id: number): Promise<Category> {
    const category = await db.Category.findByPk(id);
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
        await db.Category.update(data, { where: { id: id } });
        return `category with ID ${id} updated successfully : ${JSON.stringify(data)}`;
      }
    }
  }

  async deleteCategoryById(id: number): Promise<string> {
    const category = await this.getCategoryById(id);
    if (!category) {
      throw new NotFoundException(`category#${id} not found`);
    } else {
      await db.Category.destroy({ where: { id: id } });
      return `category with ID ${id} deleted successfully.`;
    }
  }
  async getByCategory(name: string): Promise<Category> {
  
    const category = await db.Category.findOne({where:{name : name}});
    if (!category) {
      throw new NotFoundException(`category#${name} not found`);
    }
    return category;
  }
  }
