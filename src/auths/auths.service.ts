import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { Auth } from './auths.inertface';
const db = require('../../models');
import { User } from 'src/users/users.inertface';

@Injectable()
export class AuthsService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async signUp(data: User):Promise<any>{
    //const userExists = await this.usersService.getUserByEmail(data.email);
    if (await this.usersService.getUserByEmail(data.email)) {
      throw new BadRequestException('User already exists!');
    } else {
      const newUser = await this.usersService.createUser(data);
      const tokens = await this.getTokens(newUser.id, newUser.email);
      await this.updateRefreshToken(newUser.id, tokens.refreshToken);
      return { tokens, newUser };
    }
  }

  async signin(data: Auth) {
    const user = await this.usersService.getUserByEmail(data.email);
   if (user.password!= data.password)
     throw new BadRequestException('Password is incorrect !');
    const tokens = await this.getTokens(user.id, user.email);
    await this.updateRefreshToken(user.id,tokens.refreshToken);
    return user;
  }
  
  
  async getTokens(userId: number, email: string) {
    const [accesToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        {
          sub: userId,
          email,
        },
        {
          secret: 'test',
          expiresIn: '15m',
        },
      ),
      this.jwtService.signAsync(
        {
          sub: userId,
          email,
        },
        {
          secret: 'test',
          expiresIn: '7d',
        },
      ),
    ]);
    return {
      accesToken,
      refreshToken,
    };
  }/*
  async logout(userId: number) {
    this.usersService.updateUserById(userId, { refreshToken: null });
  }*/
  async updateRefreshToken(userId: number, refreshToken: string) {
    await this.usersService.updateUserById(userId, {
      refreshToken: refreshToken,
    });
  }
  async refreshTokens(userId: number, refreshToken: string) {
    const user = await this.usersService.getUserById(userId);
    if (!user || user.refreshToken)
      throw new ForbiddenException('Acces Denied');
    const refreshTokenMatches = (await user.refreshToken) == refreshToken;
    if (!refreshTokenMatches) throw new ForbiddenException('Acces Denied');
    const tokens = await this.getTokens(user.id, user.email);
    await this.updateRefreshToken(user.id, tokens.refreshToken);
    return tokens;
  }
}
