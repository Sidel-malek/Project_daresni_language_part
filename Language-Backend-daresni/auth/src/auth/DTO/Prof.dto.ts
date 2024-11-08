

import { IsString, IsEmail, IsNotEmpty, IsPhoneNumber, IsOptional } from 'class-validator';

export class ProfDTO {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  familyname: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsPhoneNumber()
  @IsOptional()
  phone?: string;

  @IsString()
  Cv?: string;

  @IsString()
  picture?: string;
}
