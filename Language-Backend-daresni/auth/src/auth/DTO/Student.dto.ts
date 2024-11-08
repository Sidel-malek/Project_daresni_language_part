

import { IsString, IsEmail, IsNotEmpty, IsPhoneNumber, IsNumber, IsOptional } from 'class-validator';

export class StudentDTO {
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
  @IsNotEmpty()
  level: string;

  @IsNumber()
  @IsNotEmpty()
  year: number;

  @IsString()
  major: string;
  
  @IsString()
  languageLevel: string;
}
