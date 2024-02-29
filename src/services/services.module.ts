import { Module } from '@nestjs/common';
import { ServicesController } from './Services.controller';
import { ServiceService } from './services.service';

@Module({
  controllers: [ServicesController],
  providers: [ServiceService],
})
export class ServicesModule {}
