//import { Transform } from 'class-transformer';
import { IsNotEmpty, IsString, IsISO8601, IsDate } from 'class-validator';

export class CreateOrderDTO {
  @IsNotEmpty({ message: 'orderDate cannot be empty.' })
  readonly orderDate: Date;
  @IsString({ message: 'status must be a string.' })
  @IsNotEmpty({ message: 'status cannot be empty.' })
  readonly status: string;
 
 
}
