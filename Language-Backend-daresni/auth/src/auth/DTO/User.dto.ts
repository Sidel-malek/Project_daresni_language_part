
import { IsEmail, IsNotEmpty, IsString, IsBoolean } from 'class-validator';

export class UserDTO {
  @IsEmail()  
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  role: string;
  
  @IsNotEmpty()
  @IsBoolean()
  isActive: boolean;

}