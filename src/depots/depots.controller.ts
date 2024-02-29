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
  
  import { Depot } from '../../models/Depot.js';
  import { ValidationPipeWithErrors } from 'src/middlewares/validation.pipe';
 import { DepotsService } from './depots.service.js';
import { CreateDepotDto } from './create-depots.dto.js';
  @Controller('Depot')
  export class DepotsController {
    constructor(private readonly DepotsService: DepotsService) {}
    @Post()
    @UsePipes(new ValidationPipeWithErrors())
  
  
   async create(@Res() response ,@Body() CreateDepotDto: CreateDepotDto) {
      try
      {
      const newDepot= await  this.DepotsService.createDepot(CreateDepotDto);
      response.status(HttpStatus.CREATED).json({
        message: 'Depot has been created successfully',
        status: HttpStatus.CREATED,
        data: newDepot
    
      });}
      catch(error)
      {
   response.status(HttpStatus.BAD_REQUEST).send("saving " + JSON.stringify(error));
  /*
        response.status(HttpStatus.EXPECTATION_FAILED).json({
          status: 400,
          message: 'Error: Depot not created !'+error ,
      
          data: null
      
        }); */
  
      /*  
       response.status(HttpStatus.CREATED).json({
        status: 400,
        message: 'Error: Depot not created !'+error ,
    
        data: null
    
      });
  
      */
      }
      }
    @Get()
    async getDepots(@Res() response) {
      try {
        const depotData = await this.DepotsService.getAllDepots();
        return response.status(HttpStatus.OK).json({
          message: ' All Depots  data found  successfully ',
          status: HttpStatus.OK,
          data: depotData,
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
    async getDepot(@Res() response, @Param('id') id: number) {
      try {
        const existingDepot = await this.DepotsService.getDepotById(id);
        return response.status(HttpStatus.OK).json({
          message: 'Depot found  successfully',
  
          data: existingDepot,
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
      @Body() updateDepotDto: Partial<Depot>,
    ) {
      try {
        const deletedDepot = await this.DepotsService.updateDepotById(
          id,
          updateDepotDto,
        );
        return response.status(HttpStatus.OK).json({
          message: 'Depot deleted  successfully',
  
          data: deletedDepot,
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
    async deleteDepot(@Res() response, @Param('id') id: number) {
      try {
        const deletedDepot =
          await this.DepotsService.deleteDepotById(id);
        return response.status(HttpStatus.OK).json({
          message: 'Depot deleted  successfully',
  
          data: deletedDepot,
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
  