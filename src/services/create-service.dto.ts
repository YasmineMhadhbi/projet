import { IsNotEmpty, IsString } from 'class-validator';

export class CreateServiceDto {

    
  @IsString({ message: 'name must be a string.' })
  @IsNotEmpty({ message: 'name cannot be empty.' })
  readonly name: string;

  @IsString({ message: 'description must be a string.' })
  @IsNotEmpty({ message: 'description cannot be empty.' })
  readonly description: string;
  @IsNotEmpty({ message: 'cost cannot be empty.' })
  
  readonly cost: number ;
  @IsNotEmpty({ message: 'ServiceCategory cannot be empty.' })

   readonly ServiceCategoryId:number
}


