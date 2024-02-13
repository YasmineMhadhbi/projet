import { Injectable, NotFoundException } from '@nestjs/common';
const db = require('../../models');
import { Category } from './categories.interface';

@Injectable()
export class CategoriesService {
    async createCategory(data:any)  : Promise<Category> 
      { try {
      const category = await db.Category.create(data)
      console.log(db);
      console.log(db.categories);
      return category;
    } catch (error) {
      throw new Error(`failed  to create category ${error.message}`);
    }
  }
}
