import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserEntity } from './entities/user.entity';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';

@Module({
   imports: [
      SequelizeModule.forFeature([UserEntity]),],
  controllers: [UsersController],
  providers: [UsersService],
   exports: [UsersService],
})
export class UsersModule {}