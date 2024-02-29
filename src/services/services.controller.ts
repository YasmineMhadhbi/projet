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
  const db = require('../../models');

  import { Service } from '../../models/Service.js';
  import { ValidationPipeWithErrors } from 'src/middlewares/validation.pipe';
import { CreateServiceDto } from './create-service.dto.js';
import { ServiceService } from './services.service.js';
  @Controller('Service')
  export class ServicesController {
    constructor(private readonly servicesService: ServiceService) {}
    @Post()
    @UsePipes(new ValidationPipeWithErrors())
  
  
   async create(@Res() response ,@Body() createServiceDto: CreateServiceDto) {
      try
      {//console.log(createServiceDto)
      const newService= await  this.servicesService.createService(createServiceDto);
      console.log(newService)
         response.status(HttpStatus.CREATED).json({
        status: HttpStatus.CREATED,
        data: newService
    
      });}
      catch(error)
      {
   response.status(HttpStatus.BAD_REQUEST).send("saving " + JSON.stringify(error));
  
   
      }
      }
    @Get()
    async getServices(@Res() response) {
      try {
        const ServiceData = await this.servicesService.getAllService();
        return response.status(HttpStatus.OK).json({
          message: ' All Services  data found  successfully ',
          status: HttpStatus.OK,
          data: ServiceData,
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
    async getService(@Res() response, @Param('id') id: number) {
      try {
        const existingService = await this.servicesService.getServiceById(id);
        return response.status(HttpStatus.OK).json({
          message: 'Service found  successfully',
  
          data: existingService,
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
      @Body() updateServiceDto: Partial<Service>,
    ) {
      try {
        const deletedService = await this.servicesService.updateServiceById(
          id,
          updateServiceDto,
        );
        return response.status(HttpStatus.OK).json({
          message: 'Service deleted  successfully',
  
          data: deletedService,
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
    async deleteService(@Res() response, @Param('id') id: number) {
      try {
        const deletedService =
          await this.servicesService.deleteServiceById(id);
        return response.status(HttpStatus.OK).json({
          message: 'Service deleted  successfully',
  
          data: deletedService,
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
  