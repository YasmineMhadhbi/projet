import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { SubCategory } from './subCategories.interface';
import { CreateSubCategoryDto } from './create-sub-category.dto';
import { Category } from 'src/categories/categories.interface';

const db = require('../../models');

@Injectable()
export class SubCategoriesService {
  async createSubCategory(createSubCategoryDto: CreateSubCategoryDto) {
    try {
      const categoryExist = await db.Category.findByPk(
        createSubCategoryDto.CategoryId,
      );
      if (!categoryExist) {
        return `#${createSubCategoryDto.CategoryId} not found`;
      } else {
        const newSubcategory =
          await db.SubCategory.create(createSubCategoryDto);
        return newSubcategory.save();
      }
    } catch (error) {
      throw new HttpException(error.message, 400);
    }
  }

  async getAllSubCategories(): Promise<SubCategory[]> {
    const Subcategory = await db.SubCategory.findAll();
    if (!Subcategory || Subcategory.length == 0) {
      throw new NotFoundException('Subcategories data not found!');
    }
    return Subcategory;
  }
  async getSubCategoryById(id: number): Promise<SubCategory> {
    const Subcategory = await db.SubCategory.findByPk(id);
    if (!Subcategory) {
      throw new NotFoundException(`SubCategory#${id} not found`);
    }
    return Subcategory;
  }
  async updateSubCategoryById(id: number, data: any): Promise<string> {
    {
      const categoryExist = await db.Category.findByPk(data.CategoryId);
      const Subcategory = await this.getSubCategoryById(id);
      if (!Subcategory) {
        throw new NotFoundException(`Subcategory #${id} not found`);
      } else if (data.CategoryId == null || categoryExist) {
        await db.SubCategory.update(data, { where: { id: id } });
        return `Subcategory with ID ${id} updated successfully : ${JSON.stringify(data)}`;
      } else {
        if (!categoryExist) return `#${data.CategoryId} not found`;
      }
    }
  }

  async deleteSubCategoryById(id: number): Promise<string> {
    const Subcategory = await this.getSubCategoryById(id);
    if (!Subcategory) {
      throw new NotFoundException(`subcategory#${id} not found`);
    } else {
      await db.SubCategory.destroy({ where: { id: id } });
      return `subcategory with ID ${id} deleted successfully.`;
    }
  }
}
