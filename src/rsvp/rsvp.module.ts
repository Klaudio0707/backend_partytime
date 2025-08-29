import { Module } from '@nestjs/common';
import { RsvpService } from './rsvp.service';
import { RsvpController } from './rsvp.controller';
import { GuestEntity } from 'src/guest/entities/guest.entity';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
   imports: [
    SequelizeModule.forFeature([GuestEntity]) 
  ],
  controllers: [RsvpController],
  providers: [RsvpService],
})
export class RsvpModule {}