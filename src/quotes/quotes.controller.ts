import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Res,
  UsePipes,
} from '@nestjs/common';
import { Quote } from './quotes.interface.js';
import { ValidationPipeWithErrors } from 'src/middlewares/validation.pipe';
import { QuotesService } from './quotes.service.js';
import { CreateQuoteDto } from './create-quotes.dto.js';
@Controller('Quote')
export class QuotesController {
  constructor(private readonly QuotesService: QuotesService) {}
  @Post()
  @UsePipes(new ValidationPipeWithErrors())


 async create(@Res() response ,@Body() CreateQuoteDto: CreateQuoteDto) {
    try
    {
    const newQuote= await  this.QuotesService.createQuote(CreateQuoteDto);
    response.status(HttpStatus.CREATED).json({
      status: HttpStatus.CREATED,
      data: newQuote
  
    });}
    catch(error)
    {
 response.status(HttpStatus.BAD_REQUEST).send("saving " + JSON.stringify(error));

 
    }
    }
  @Get()
  async getQuotes(@Res() response) {
    try {
      const QuoteData = await this.QuotesService.getAllQuotes();
      return response.status(HttpStatus.OK).json({
        message: ' All Quotes  data found  successfully ',
        status: HttpStatus.OK,
        data: QuoteData,
      });
    } catch (err) {
      return response.status(err.status).json({
        status: HttpStatus.BAD_REQUEST,
        message: err.response,
        data: null,
      });
    }
  }
  @Get('/:id')
  async getQuote(@Res() response, @Param('id') id: number) {
    try {
      const existingQuote = await this.QuotesService.getQuoteById(id);
      return response.status(HttpStatus.OK).json({
        message: 'Quote found  successfully',

        data: existingQuote,
        status: HttpStatus.OK,
      });
    } catch (err) {
      return response.status(err.status).json({
        status: HttpStatus.BAD_REQUEST,
        message: err.response,
        data: null,
      });
    }
  }
  @Put(':id')
  @UsePipes(new ValidationPipeWithErrors())

  async update(
    @Res() response,
    @Param('id') id: number,
    @Body() updateQuoteDto: Partial<Quote>,
  ) {
    try {
      const deletedQuote = await this.QuotesService.updateQuoteById(
        id,
        updateQuoteDto,
      );
      return response.status(HttpStatus.OK).json({
        message: 'Quote deleted  successfully',

        data: deletedQuote,
        status: HttpStatus.OK,
      });
    } catch (err) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        message: err.response,
        status: HttpStatus.BAD_REQUEST,
        data: null,
      });
    }
  }

  @Delete(':id')
  async deleteQuote(@Res() response, @Param('id') id: number) {
    try {
      const deletedQuote =
        await this.QuotesService.deleteQuoteById(id);
      return response.status(HttpStatus.OK).json({
        message: 'Quote deleted  successfully',

        data: deletedQuote,
        status: HttpStatus.OK,
      });
    } catch (err) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        message: err.response,
        status: HttpStatus.BAD_REQUEST,
        data: null,
      });
    }
  }
}
