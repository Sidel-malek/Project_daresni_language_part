import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';

import { MongooseModule } from '@nestjs/mongoose';
import { EurekaModule } from 'nestjs-eureka';
import { KafkaModule } from './kafka/kafka.module';

@Module({
  imports: [
    ConfigModule.forRoot(
      {
        envFilePath: '.env',
        isGlobal: true
      }
    ),
    KafkaModule,
    AuthModule,
    UserModule,
    MongooseModule.forRoot('mongodb+srv://<username>:<password>@darisnicluster0.oo896.mongodb.net/bdd'),
    EurekaModule.forRoot({
      eureka: {
        host: process.env.EUREKA_SERVER_HOST ||'localhost',
        port: process.env.EUREKA_SERVER_PORT||8888,
        registryFetchInterval: 1000,
        servicePath: '/eureka/apps/',
        maxRetries: 3,
      },
      service: {
        name: 'auth-service',
        port: 3001,
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],

})
export class AppModule {}

