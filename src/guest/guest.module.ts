import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { GuestService } from './guest.service';
import { GuestController } from './guest.controller';
import { GuestEntity } from './entities/guest.entity';
import { PartyEntity } from '../party/entities/party.entity';
import { UserEntity } from '../users/entities/user.entity';

@Module({
  imports: [SequelizeModule.forFeature([GuestEntity, PartyEntity, UserEntity])],
  controllers: [GuestController],
  providers: [GuestService],
})
export class GuestModule {}