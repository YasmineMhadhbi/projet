import { IsInt, IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';

export class CreateProductDto {
  @IsString({ message: 'Reference must be a string.' })
  @IsNotEmpty({ message: 'Reference cannot be empty.' })
  readonly reference: string;

  @IsString({ message: 'description must be a string.' })
  @IsNotEmpty({ message: 'description cannot be empty.' })
  readonly description: string;

  @IsString({ message: 'price must be a string.' })
  @IsNotEmpty({ message: 'price cannot be empty.' })
  readonly price: number;

  image: string;

 
  @IsNotEmpty({ message: 'Stock cannot be empty.' })
 readonly stock: number;
 @IsNotEmpty({ message: 'SubCategoryId cannot be empty.' })
 readonly SubCategoryId: number;
 readonly size: number; 
 readonly color: string;
 readonly discount: number;
}
