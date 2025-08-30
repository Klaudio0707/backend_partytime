import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(UserEntity)
    private readonly userModel: typeof UserEntity,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<UserEntity> {
    const { email, username } = createUserDto;
    // Verifica se o e-mail já existe
    const existingUserByEmail = await this.userModel.findOne({ where: { email } });
    if (existingUserByEmail) {
      throw new ConflictException('Este endereço de e-mail já está em uso.');
    }
    // Verifica se o nome de utilizador já existe
    const existingUserByUsername = await this.userModel.findOne({ where: { username } });
    if (existingUserByUsername) {
      throw new ConflictException('Este nome de utilizador já está em uso.');
    }
    //Se ambos estiverem livres, cria o novo utilizador
    return this.userModel.create(createUserDto as any);
  }
  // --- O resto do seu serviço continua igual ---
  async findAll(): Promise<UserEntity[]> {
    return this.userModel.findAll({
      attributes: { exclude: ['password'] }, 
    });
  }

  async findOne(id: string): Promise<UserEntity> {
    const user = await this.userModel.findByPk(id, {
      attributes: { exclude: ['password'] },
    });
    if (!user) {
      throw new NotFoundException(`Utilizador com ID ${id} não encontrado.`);
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
      throw new NotFoundException(`Utilizador com ID ${id} não encontrado.`);
    }
    return user.update(updateUserDto);
  }

  async remove(id: string): Promise<void> {
    const user = await this.userModel.findByPk(id);
    if (!user) {
      throw new NotFoundException(`Utilizador com ID ${id} não encontrado.`);
    }
    await user.destroy();
  }
}