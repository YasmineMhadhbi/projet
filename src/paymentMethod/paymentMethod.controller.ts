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

import { ValidationPipeWithErrors } from 'src/middlewares/validation.pipe';
import { CreatePaymentMethodDTO } from './create-paymentMethod.dto';
import { PaymentMethodService } from './paymentMethod.service';
import { PaymentMethod } from './paymentMethod.interface';
@Controller('PaymentMethod')
export class PaymentMethodController {
  constructor(private readonly PaymentMethodService: PaymentMethodService) {}
  @Post()
  @UsePipes(new ValidationPipeWithErrors())


 async create(@Res() response ,@Body() createPaymentMethodDTO: CreatePaymentMethodDTO) {
    try
    {
    const newPaymentMethod= await  this.PaymentMethodService.createPaymentMethod(createPaymentMethodDTO);
    response.status(HttpStatus.CREATED).json({
      status: HttpStatus.CREATED,
      data: newPaymentMethod
  
    });}
    catch(error)
    {
 response.status(HttpStatus.BAD_REQUEST).send("saving " + JSON.stringify(error));
/*
      response.status(HttpStatus.EXPECTATION_FAILED).json({
        status: 400,
        message: 'Error: PaymentMethod not created !'+error ,
    
        data: null
    
      }); */

    /*  
     response.status(HttpStatus.CREATED).json({
      status: 400,
      message: 'Error: PaymentMethod not created !'+error ,
  
      data: null
  
    });

    */
    }
    }
  @Get()
  async getPaymentMethods(@Res() response) {
    try {
      const PaymentMethodData = await this.PaymentMethodService.getAllPaymentMethod();
      return response.status(HttpStatus.OK).json({
        message: ' All PaymentMethod  data found  successfully ',
        status: HttpStatus.OK,
        data: PaymentMethodData,
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
  async getPaymentMethod(@Res() response, @Param('id') id: number) {
    try {
      const existingPaymentMethod = await this.PaymentMethodService.getPaymentMethodById(id);
      return response.status(HttpStatus.OK).json({
        message: 'PaymentMethod found  successfully',

        data: existingPaymentMethod,
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
    @Body() updatePaymentMethodDto: Partial<PaymentMethod>,
  ) {
    try {
      const deletedPaymentMethod = await this.PaymentMethodService.updatePaymentMethodById(
        id,
        updatePaymentMethodDto,
      );
      return response.status(HttpStatus.OK).json({
        message: 'PaymentMethod deleted  successfully',

        data: deletedPaymentMethod,
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
  async deletePaymentMethod(@Res() response, @Param('id') id: number) {
    try {
      const deletedPaymentMethod =
        await this.PaymentMethodService.deletePaymentMethodById(id);
      return response.status(HttpStatus.OK).json({
        message: 'PaymentMethod deleted  successfully',

        data: deletedPaymentMethod,
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
