
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class createAdminDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  role: string;
  

}