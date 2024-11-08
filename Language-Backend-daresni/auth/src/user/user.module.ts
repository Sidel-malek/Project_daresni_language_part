import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/schemas/User.schema';
import { Prof, ProfSchema } from 'src/schemas/Prof.schema';
import { Student, StudentSchema } from 'src/schemas/Student.schema';
import { AuthService } from 'src/auth/auth.service';

@Module({
  providers: [UserService,AuthService],
  imports:[MongooseModule.forFeature([{
    name:User.name,schema:UserSchema},{
    name:Prof.name,schema:ProfSchema},{
    name:Student.name,schema:StudentSchema
  }])],
  controllers: [UserController]
})
export class UserModule {}
