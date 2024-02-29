import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCategoryDto {

    
  @IsString({ message: 'name must be a string.' })
  @IsNotEmpty({ message: 'name cannot be empty.' })
  readonly name: string;

  @IsString({ message: 'description must be a string.' })
  @IsNotEmpty({ message: 'description cannot be empty.' })
  readonly description: string;
}


