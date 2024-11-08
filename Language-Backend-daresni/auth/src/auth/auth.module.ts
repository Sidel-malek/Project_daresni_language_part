import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/schemas/User.schema';
import { Prof, ProfSchema } from 'src/schemas/Prof.schema';
import { Student, StudentSchema } from 'src/schemas/Student.schema';
import { JwtModule } from '@nestjs/jwt';
import { KafkaModule } from 'src/kafka/kafka.module';

@Module({
  controllers: [AuthController],
  imports:[KafkaModule,
  JwtModule.register({
    global: true,
    secret: 'Very$secret',
    signOptions: { expiresIn: '24h' },
  }),MongooseModule.forFeature([{
    name:User.name,schema:UserSchema},{
    name:Prof.name,schema:ProfSchema},{
    name:Student.name,schema:StudentSchema
  }])],
  

  providers: [AuthService]
})
export class AuthModule {}
