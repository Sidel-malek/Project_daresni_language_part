// update-student.dto.ts
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateStudentDto {
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
  level?: string;
  
  @IsOptional()
  @IsNumber()
  year?: number;
  
  @IsOptional()
  @IsString()
  major?: string;
}
