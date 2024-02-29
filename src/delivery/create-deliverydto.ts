//import { Transform } from 'class-transformer';
import { IsNotEmpty, IsString, IsISO8601, IsDate } from 'class-validator';

export class CreateDeliveryDTO {
  @IsNotEmpty({ message: 'deliveryDate cannot be empty.' })
  readonly deliveryDate: Date;
  @IsString({ message: 'status must be a string.' })
  @IsNotEmpty({ message: 'status cannot be empty.' })
  readonly status: string;
  @IsString({ message: 'deliverMethod must be a string.' })
  @IsNotEmpty({ message: 'deliverMethod cannot be empty.' })
  readonly deliveryMethod :string;

 
}
