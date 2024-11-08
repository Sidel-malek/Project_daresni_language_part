
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { User } from './User.schema';


@Schema()
export class Student {
  @Prop()
  name: string;
  @Prop()
  familyname: string;
  @Prop()
  email: string;

  @Prop()
  phone: number;
  
  @Prop()
  level: string;
  
  @Prop()
  year: number;
  @Prop()
  major: string;
  
  @Prop()
  languageLevel: string;
  
  @Prop({type:mongoose.Schema.Types.ObjectId,ref:'User'})
  user?:User
}

export const StudentSchema = SchemaFactory.createForClass(Student);