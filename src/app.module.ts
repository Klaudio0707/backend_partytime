import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PartyModule } from './party/party.module';
import { ServiceModule } from './service/service.module';
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { GuestModule } from './guest/guest.module';
import { RsvpModule } from './rsvp/rsvp.module';
import * as dotenv from "dotenv"
import { EmptyStringToNullMiddleware } from './shared/middlewares/empty-string-to-null.middleware';


dotenv.config()
@Module({
imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    PartyModule,    
    ServiceModule, 
    UsersModule, 
    AuthModule, GuestModule, RsvpModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(EmptyStringToNullMiddleware) // Aplica nosso novo middleware
      .forRoutes('*'); 
  }
}