import { IsNotEmpty, IsString } from 'class-validator';

export class CreateSubCategoryDto {

    
  @IsString({ message: 'name must be a string.' })
  @IsNotEmpty({ message: 'name cannot be empty.' })
  readonly name: string;

  @IsString({ message: 'description must be a string.' })
  @IsNotEmpty({ message: 'description cannot be empty.' })
  readonly description: string;

  @IsNotEmpty({ message: 'SubCategoryId cannot be empty.' })
  readonly CategoryId: number;
}
