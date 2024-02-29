import { IsNotEmpty, IsString } from 'class-validator';

export class CreateQuoteDto {

    
 

  @IsString({ message: 'message must be a string.' })
  @IsNotEmpty({ message: 'message cannot be empty.' })
  readonly message: string;
  @IsNotEmpty({ message: 'Service cannot be empty.' })

  readonly ServiceId:number
}


