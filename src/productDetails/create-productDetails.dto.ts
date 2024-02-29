import {  IsNumber} from 'class-validator';

export class CreateProductDetailsDto {
  @IsNumber()
  readonly quantity: number;
  @IsNumber()
  readonly CartId: number;
  @IsNumber()
  readonly productId: number;
}
