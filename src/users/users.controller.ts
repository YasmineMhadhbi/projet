import { Body, Controller, Delete, Get, Param, Post, Put, UploadedFile, UseInterceptors } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from '../../models/user.js';
import { diskStorage } from 'multer';

import { FileInterceptor } from '@nestjs/platform-express';
@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor("file",{
      storage: diskStorage({
        destination:"./upload/user",
        filename: (_request, file, callback) =>
          callback(null, `${new Date().getTime()}-${file.originalname}`),
      }),
    }),
  )
  create(@Body() createUserDto: User ,@UploadedFile() file): User {
    createUserDto.photo=file.filename;
 
    return this.usersService.createUser(createUserDto);
  }
  @Get()
  findAll(): Promise<User[]> {
    return this.usersService.getAllUsers();
  }

  @Get(':id')
  findOne(@Param('id') id:number):User{
    return this.usersService.getUserById(id)
  }
 

  @Put(':id')
  @UseInterceptors(
    FileInterceptor("file",{
      storage: diskStorage({
        destination:"./upload/users",
        filename: (_request, file, callback) =>
          callback(null, `${new Date().getTime()}-${file.originalname}`),
      }),
    }),
  )
  async update(@Param('id') id:number , @Body() updateUserDto:Partial<User>, @UploadedFile() file):Promise<User>{
    if(file==undefined||file==null){
      updateUserDto.photo=(await this.usersService.getUserById(id)).photo;
      
    return this.usersService.updateUserById(id,updateUserDto)
  }}
  @Delete(":id")
  remove(@Param('id') id:number):User{
    return this.usersService.deleteUserById(id)
  }

  

}