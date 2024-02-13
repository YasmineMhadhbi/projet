import { Module } from '@nestjs/common';
import { AuthsController } from './auths.controller';
import { AuthsService } from './Auths.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { UsersModule } from 'src/users/users.module';
import { AccessTokenStrategy } from './stratigies/accesstoken.strategy';
import { RefreshTokenStrategy } from './stratigies/refreshtoken.strategy';
import { UsersService } from 'src/users/users.service';


@Module({
  imports:[JwtModule.register({}),UsersModule],
  controllers: [AuthsController,],
  providers: [AuthsService,AccessTokenStrategy,RefreshTokenStrategy,UsersService,]
})
export class AuthsModule {}
