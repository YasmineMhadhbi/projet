//import { Transform } from 'class-transformer';
import { IsNotEmpty, IsString, IsISO8601, IsDate } from 'class-validator';

export class CreateCartDTO {
  @IsNotEmpty({ message: 'CartDate cannot be empty.' })
  readonly cartDate: Date;
  
}
