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
import { format } from 'date-fns';


import { ValidationPipeWithErrors } from 'src/middlewares/validation.pipe';
import { CreateDeliveryDTO } from './create-deliverydto';
import { Delivery } from './delivery.interface';
import { DeliveryService } from './delivery.service';
@Controller('Delivery')
export class DeliveryController {
  constructor(private readonly deliveryService: DeliveryService) {}
  @Post()
  @UsePipes(new ValidationPipeWithErrors())
  async create(@Res() response ,@Body() createDeliveryDto: CreateDeliveryDTO) {
    try
    {
    //  const date=new Date(createDeliveryDto.deliveryDate)
    const newDelivery= await  this.deliveryService.createDelivery(createDeliveryDto);
   //// newDelivery.deliveryDate = date.toISOString().split('T')[0];

   //// console.log(newDelivery.deliveryDate)
    await newDelivery.save();
    response.status(HttpStatus.CREATED).json({
      message: 'Delivery has been created successfully',
      status: HttpStatus.CREATED,
      data: newDelivery
  
    });}
    catch(error)
    {
 response.status(HttpStatus.BAD_REQUEST).send("saving " + JSON.stringify(error));
}
    }
  @Get()
  async getDeliverys(@Res() response) {
    try {
      const DeliveryData = await this.deliveryService.getAllDelivery();
      return response.status(HttpStatus.OK).json({
        message: ' All Delivery  data found  successfully ',
        status: HttpStatus.OK,
        data: DeliveryData,
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
  async getDelivery(@Res() response, @Param('id') id: number) {
    try {
      const existingDelivery = await this.deliveryService.getDeliveryById(id);
      return response.status(HttpStatus.OK).json({
        message: 'Delivery found  successfully',

        data: existingDelivery,
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
    @Body() updateDeliveryDto: Partial<Delivery>,
  ) {
    try {
      const deletedDelivery = await this.deliveryService.updateDeliveryById(
        id,
        updateDeliveryDto,
      );
      return response.status(HttpStatus.OK).json({
        message: 'Delivery deleted  successfully',

        data: deletedDelivery,
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
  async deleteDelivery(@Res() response, @Param('id') id: number) {
    try {
      const deletedDelivery = await this.deliveryService.deleteDeliveryById(id);
      return response.status(HttpStatus.OK).json({
        message: 'Delivery deleted  successfully',

        data: deletedDelivery,
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
