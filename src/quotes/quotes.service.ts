import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
const db = require('../../models');
import { Quote } from './quotes.interface';
import { CreateQuoteDto } from './create-quotes.dto';
@Injectable()
export class QuotesService {
  async createQuote( CreateQuoteDto: CreateQuoteDto,): Promise<String> {
    try {
      const ServiceExist=await db.Service.findByPk(CreateQuoteDto.ServiceId)
      if(!ServiceExist){return `#${CreateQuoteDto.ServiceId} not found`;
    }else
    {
      const Quote = await db.Quote.create(CreateQuoteDto);
      return Quote.save();}}
     catch (error) {
      throw new HttpException(error.message, 400);
    }
  }

  async getAllQuotes(): Promise<Quote[]> {
    const Quote = await db.Quote.findAll();
    if (!Quote || Quote.length == 0) {
      throw new NotFoundException('Quotes data not found!');
    }
    return Quote;
  }
  async getQuoteById(id: number): Promise<Quote> {
    const Quote = await db.Quote.findByPk(id);
    if (!Quote) {
      throw new NotFoundException(`Quote#${id} not found`);
    }
    return Quote;
  }
  async updateQuoteById(id: number, data: any): Promise<string> {
    {const ServiceExist=await db.Service.findByPk(data.ServiceId)
      if(!ServiceExist){return `#${data.ServiceId} not found`;
    }else if(ServiceExist==null ||ServiceExist)
    { 
      const Quote = await this.getQuoteById(id);
      if (!Quote) {
        throw new NotFoundException(`Quote #${id} not found`);
      } else {
        await db.Quote.update(data, { where: { id: id } });
        return `Quote with ID ${id} updated successfully : ${JSON.stringify(data)}`;
      }
    }}
  }

  async deleteQuoteById(id: number): Promise<string> {
    const Quote = await this.getQuoteById(id);
    if (!Quote) {
      throw new NotFoundException(`Quote#${id} not found`);
    } else {
      await db.Quote.destroy({ where: { id: id } });
      return `Quote with ID ${id} deleted successfully.`;
    }
  }
 
  }
