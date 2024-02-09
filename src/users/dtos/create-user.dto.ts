import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength } from 'class-validator';
export class CreateUserDto {
  @IsEmail()
  @ApiProperty({
    example: 'johndoe@email.com',
    description: 'The email of the user',
  })
  email: string;

  @IsString()
  @ApiPropertyOptional({
    example: 'John Doe',
    description: 'The name of the user',
  })
  name: string;

  @MinLength(8)
  @IsString()
  @ApiProperty({
    example: '*2B:{d35',
    description: 'The password of the user',
    minLength: 8,
  })
  password: string;
}
