import { Injectable, NotFoundException } from '@nestjs/common';
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

  /**
   * Cria um novo usuário. A senha é automaticamente hasheada
   * pelo hook @BeforeCreate na entidade UserEntity.
   */
  async create(
    createUserDto: CreateUserDto,
  ): Promise<UserEntity> {
    const user = new UserEntity();
    user.email = createUserDto.email;
    user.password = createUserDto.password; 
    user.username = createUserDto.username;

    return await user.save();
  }

  /**
   * Retorna todos os usuários sem o campo de senha.
   */
  async findAll(): Promise<UserEntity[]> {
    return this.userModel.findAll({
      attributes: { exclude: ['password'] }, // Exclui a senha da resposta
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