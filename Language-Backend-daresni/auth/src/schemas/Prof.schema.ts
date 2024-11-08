
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { User } from './User.schema';
@Schema()
export class Prof {
  @Prop()
  name: string;
  @Prop()
  familyname: string;
  @Prop()
  email: string;

  @Prop()
  phone: number;
  
  @Prop()
  Cv: string;
  
  @Prop()
  picture: string;
  
  @Prop()
  about: string;

  
  @Prop({type:mongoose.Schema.Types.ObjectId,ref:'User'})
  user?:User

}

export const ProfSchema = SchemaFactory.createForClass(Prof);