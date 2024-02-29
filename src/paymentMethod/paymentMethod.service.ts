import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { CreatePaymentMethodDTO } from './create-paymentMethod.dto';
const db = require('../../models');
import { PaymentMethod } from './paymentMethod.interface';
@Injectable()
export class PaymentMethodService {
  async createPaymentMethod( createPaymentMethodDto: CreatePaymentMethodDTO,): Promise<String> {
    try {

     
      const PaymentMethod = await db.PaymentMethod.create(createPaymentMethodDto);
      return PaymentMethod.save();}
    catch (error) {
      throw new HttpException(error.message, 400);
    }
  }

  async getAllPaymentMethod(): Promise<PaymentMethod[]> {
    const PaymentMethod = await db.PaymentMethod.findAll();
    if (!PaymentMethod || PaymentMethod.length == 0) {
      throw new NotFoundException('PaymentMethod data not found!');
    }
    return PaymentMethod;
  }
  async getPaymentMethodById(id: number): Promise<PaymentMethod> {
    const PaymentMethod = await db.PaymentMethod.findByPk(id);
    if (!PaymentMethod) {
      throw new NotFoundException(`PaymentMethod#${id} not found`);
    }
    return PaymentMethod;
  }
  async updatePaymentMethodById(id: number, data: any): Promise<string> {
    {
      const PaymentMethod = await this.getPaymentMethodById(id);
      if (!PaymentMethod) {
        throw new NotFoundException(`PaymentMethod #${id} not found`);
      } else {
        await db.PaymentMethod.update(data, { where: { id: id } });
        return `PaymentMethod with ID ${id} updated successfully : ${JSON.stringify(data)}`;
      }
    }
  }

  async deletePaymentMethodById(id: number): Promise<string> {
    const PaymentMethod = await this.getPaymentMethodById(id);
    if (!PaymentMethod) {
      throw new NotFoundException(`PaymentMethod#${id} not found`);
    } else {
      await db.PaymentMethod.destroy({ where: { id: id } });
      return `PaymentMethod with ID ${id} deleted successfully.`;
    }
  }

  }
