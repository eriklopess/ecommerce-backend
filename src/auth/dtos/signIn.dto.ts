import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class SignInDto {
  @IsEmail()
  @ApiProperty({
    example: 'johndoe@email.com',
    description: 'The email of the user',
  })
  email: string;

  @IsString()
  @ApiProperty({
    example: '*2B:{d35',
    description: 'The password of the user',
  })
  password: string;
}
