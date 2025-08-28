import { Module } from '@nestjs/common';
import { PartyModule } from './party/party.module';
import { GuestModule } from './guest/guest.module';
import { ServiceModule } from './service/service.module';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';

@Module({
imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    PartyModule,    
    ServiceModule, 
    UsersModule, 
    GuestModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
