import { Body, Controller, Get, Post, Req, Request, UseGuards } from '@nestjs/common';
import { AuthsService } from './Auths.service';
import { User } from 'src/users/users.inertface';
import { Auth } from './auths.inertface';




@Controller('auth')
export class AuthsController {
  constructor(
    private authsService: AuthsService,
  ) {}

@Post('signup')
signup(@Body() createUserDto :User){
  return this.authsService.signUp(createUserDto);
}
@Post('signin')
signin( @Body()createUserDto :Auth ){
return this.authsService.signin(createUserDto);
}/*
@UseGuards(AccessTokenGuard)
@Get('logout')
logout(@Req() req :Request)
{this.authsService.logout(req['sub']);
}

@UseGuards(RefreshTokenGuard)
@Get('refresh')
refreshTokens(@Req()req :Request)
{
  const userId = req['sub'];
  const refreshToken =req['refreshToken'];
  return this.authsService.refreshTokens(userId,refreshToken);
}




/*
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return await this.authsService.login(req.user);
  }

  @Post('register')
  async registerUser(@Body()createUserDto: User) {
    return await this.usersService.createUser(createUserDto);
  }*/
}