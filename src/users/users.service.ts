import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';
import { Sequelize } from 'sequelize-typescript';
import { Op } from 'sequelize';

@Injectable()
export class UsersService {
  constructor(
  
    @InjectModel(UserEntity)
    private readonly userModel: typeof UserEntity,
    private sequelize: Sequelize,
  ) {}

 
  async create(createUserDto: CreateUserDto): Promise<UserEntity> {
    const { email, username } = createUserDto;
  
    const existingUser = await this.userModel.findOne({
      where: {
        [Op.or]: [
          this.sequelize.where(this.sequelize.fn('LOWER', this.sequelize.col('email')), this.sequelize.fn('LOWER', email)),
          this.sequelize.where(this.sequelize.fn('LOWER', this.sequelize.col('username')), this.sequelize.fn('LOWER', username)),
        ],
      },
    });

    if (existingUser) {
      if (existingUser.email.toLowerCase() === email.toLowerCase()) {
        throw new ConflictException('Este endereço de e-mail já está em uso.');
      }
      if (existingUser.username.toLowerCase() === username.toLowerCase()) {
        throw new ConflictException('Este nome de utilizador já está em uso.');
      }
    }

    return this.userModel.create(createUserDto as any);
  }

  async findAll(): Promise<UserEntity[]> {
    return this.userModel.findAll({
      attributes: { exclude: ['password'] }, 
    });
  }

  /**
   * Busca um usuário pelo seu ID (UUID).
   * Lança um erro se o usuário não for encontrado.
   */
  async findOne(id: string): Promise<UserEntity> {
    const user = await this.userModel.findByPk(id, {
      attributes: { exclude: ['password'] },
    });

    if (!user) {
      throw new NotFoundException(`Usuário com ID ${id} não encontrado.`);
    }
    return user;
  }

 
  async findOneByEmail(email: string): Promise<UserEntity | undefined> {
  
    const user = await this.userModel.findOne({ where: { email } });
    return user ?? undefined;
  }

 async update(id: string, updateUserDto: UpdateUserDto): Promise<UserEntity> {
    const user = await this.userModel.findByPk(id);
    if (!user) {
      throw new NotFoundException(`Usuário com ID ${id} não encontrado.`);
    }
    // O hook BeforeUpdate na UserEntity irá refazer o hash da senha automaticamente
    // se uma nova senha for fornecida.
    return user.update(updateUserDto);
  }

  async remove(id: string): Promise<void> {
    const user = await this.userModel.findByPk(id);
    if (!user) {
      throw new NotFoundException(`Usuário com ID ${id} não encontrado.`);
    }
    await user.destroy();
  }
}