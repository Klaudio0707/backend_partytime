import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ServiceEntity } from './entities/service.entity';
import { ServicesService } from './service.service';
import { ServicesController  } from './service.controller';
import { PartyEntity } from 'src/party/entities/party.entity';

@Module({
 imports: [SequelizeModule.forFeature([ServiceEntity, PartyEntity])],
  controllers: [ServicesController ],
  providers: [ServicesService],
})
export class ServiceModule {}