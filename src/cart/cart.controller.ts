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
import { CreateCartDTO } from './create-cartdto';
import { Cart } from './cart.interface';
import { CartService } from './cart.service';
@Controller('Cart')
export class CartController {
  constructor(private readonly CartService: CartService) {}
  @Post()
  @UsePipes(new ValidationPipeWithErrors())
  async create(@Res() response ,@Body() createCartDto: CreateCartDTO) {
    try
    {
    //  const date=new Date(createCartDto.CartDate)
    const newCart= await  this.CartService.createCart(createCartDto);
   //// newCart.CartDate = date.toISOString().split('T')[0];

   //// console.log(newCart.CartDate)
    await newCart.save();
    response.status(HttpStatus.CREATED).json({
      message: 'Cart has been created successfully',
      status: HttpStatus.CREATED,
      data: newCart
  
    });}
    catch(error)
    {
 response.status(HttpStatus.BAD_REQUEST).send("saving " + JSON.stringify(error));
}
    }
  @Get()
  async getCarts(@Res() response) {
    try {
      const CartData = await this.CartService.getAllCart();
      return response.status(HttpStatus.OK).json({
        message: ' All Cart  data found  successfully ',
        status: HttpStatus.OK,
        data: CartData,
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
  async getCart(@Res() response, @Param('id') id: number) {
    try {
      const existingCart = await this.CartService.getCartById(id);
      return response.status(HttpStatus.OK).json({
        message: 'Cart found  successfully',

        data: existingCart,
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
    @Body() updateCartDto: Partial<Cart>,
  ) {
    try {
      const deletedCart = await this.CartService.updateCartById(
        id,
        updateCartDto,
      );
      return response.status(HttpStatus.OK).json({
        message: 'Cart deleted  successfully',

        data: deletedCart,
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
  async deleteCart(@Res() response, @Param('id') id: number) {
    try {
      const deletedCart = await this.CartService.deleteCartById(id);
      return response.status(HttpStatus.OK).json({
        message: 'Cart deleted  successfully',

        data: deletedCart,
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
