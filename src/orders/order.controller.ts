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
  import { Order } from './Order.interface';
  import { OrderService } from './Order.service';
import { CreateOrderDTO } from './create-oderdto';
  @Controller('Order')
  export class OrderController {
    constructor(private readonly OrderService: OrderService) {}
    @Post()
    @UsePipes(new ValidationPipeWithErrors())
    async create(@Res() response ,@Body() createOrderDto: CreateOrderDTO) {
      try
      {
      //  const date=new Date(createOrderDto.OrderDate)
      const newOrder= await  this.OrderService.createOrder(createOrderDto);
     //// newOrder.OrderDate = date.toISOString().split('T')[0];
  
     //// console.log(newOrder.OrderDate)
      await newOrder.save();
      response.status(HttpStatus.CREATED).json({
        message: 'Order has been created successfully',
        status: HttpStatus.CREATED,
        data: newOrder
    
      });}
      catch(error)
      {
   response.status(HttpStatus.BAD_REQUEST).send("saving " + JSON.stringify(error));
  }
      }
    @Get()
    async getOrders(@Res() response) {
      try {
        const OrderData = await this.OrderService.getAllOrder();
        return response.status(HttpStatus.OK).json({
          message: ' All Order  data found  successfully ',
          status: HttpStatus.OK,
          data: OrderData,
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
    async getOrder(@Res() response, @Param('id') id: number) {
      try {
        const existingOrder = await this.OrderService.getOrderById(id);
        return response.status(HttpStatus.OK).json({
          message: 'Order found  successfully',
  
          data: existingOrder,
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
      @Body() updateOrderDto: Partial<Order>,
    ) {
      try {
        const deletedOrder = await this.OrderService.updateOrderById(
          id,
          updateOrderDto,
        );
        return response.status(HttpStatus.OK).json({
          message: 'Order deleted  successfully',
  
          data: deletedOrder,
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
    async deleteOrder(@Res() response, @Param('id') id: number) {
      try {
        const deletedOrder = await this.OrderService.deleteOrderById(id);
        return response.status(HttpStatus.OK).json({
          message: 'Order deleted  successfully',
  
          data: deletedOrder,
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
  