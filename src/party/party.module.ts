import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { PartiesService  } from './party.service';
import { PartiesController} from './party.controller';
import { PartyEntity } from './entities/party.entity';

@Module({
   imports: [

    SequelizeModule.forFeature([PartyEntity]),
  ],
  controllers: [PartiesController],
  providers: [PartiesService],
})
export class PartyModule {}
