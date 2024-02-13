import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from './users.inertface';

const db = require('../../models');

@Injectable()
export class UsersService {
  async createUser(data: any) {
    try {
      const user = await db.User.create(data);
      return user;
    } catch (error) {
      throw new Error(`failed  to create user ${error.message}`);
    }
  }

  
  async getAllUsers(): Promise<User[]> {
    const user = await db.User.findAll();
    if (!user || user.length == 0) {
      throw new NotFoundException('users data not found!');
    }
    return user;
  }

  async getUserById(id: number): Promise<User> {
    const user = await db.User.findByPk(id);
    if (!user) {
      throw new NotFoundException(`user#${id} not found`);
    }
    return user;
  }
  async updateUserById(id: number, data: any): Promise<string> {
    {
      const user = await this.getUserById(id);
      if (!user) {
        throw new NotFoundException(`user #${id} not found`);
      } else {
        await db.User.update(data, { where: { id: id } });
        return `User with ID ${id} updated successfully : ${JSON.stringify(data)}`;
      }
    }
  }

  async deleteUserById(id: number): Promise<string> {
    const user = await this.getUserById(id);
    if (!user) {
      throw new NotFoundException(`user#${id} not found`);
    } else {
      await db.User.destroy({ where: { id: id } });
      return `User with ID ${id} deleted successfully.`;
    }
  }
  
  async getUserByEmail(email: string): Promise<User> {
  
    const user = await db.User.findOne({where:{email : email}});
    if (!user) {
      throw new NotFoundException(`user#${email} not found`);
    }
    return user;
  }
}
