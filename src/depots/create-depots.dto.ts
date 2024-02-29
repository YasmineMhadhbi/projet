import { IsNotEmpty, IsString } from 'class-validator';

export class CreateDepotDto {

    
  @IsString({ message: 'name must be a string.' })
  @IsNotEmpty({ message: 'name cannot be empty.' })
  readonly name: string;

  @IsString({ message: 'adress must be a string.' })
  @IsNotEmpty({ message: 'adresse cannot be empty.' })
  readonly adresse: string;
  @IsNotEmpty({ message: 'ProductId cannot be empty.' })
  readonly ProductId: number;
}


