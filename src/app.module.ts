import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthsModule } from './auths/auths.module';
import { ConfigModule } from '@nestjs/config';
import { CategoriesModule } from './categories/categories.module';

@Module({
  imports: [UsersModule,AuthsModule,ConfigModule.forRoot({isGlobal:true}),CategoriesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
