import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateProfDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  familyname?: string;
  

  @IsOptional()
  @IsNumber()
  phone?: number;

  @IsOptional()
  @IsString()
  cv?: string;

  @IsOptional()
  @IsString()
  picture?: string;

  @IsOptional()
  @IsString()
  about?: string;


}
