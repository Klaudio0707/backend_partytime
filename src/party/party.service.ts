import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { PartyEntity } from './entities/party.entity';
import { ServiceEntity } from '../service/entities/service.entity';
import { CreatePartyDto } from './dto/create-party.dto';
import { UpdatePartyDto } from './dto/update-party.dto';
import { UserEntity } from 'src/users/entities/user.entity';
import { GuestEntity } from 'src/guest/entities/guest.entity';

@Injectable()
export class PartiesService {
  constructor(
    @InjectModel(PartyEntity)
    private readonly partyModel: typeof PartyEntity,
  ) {}

  /**
   * Método privado para encontrar uma festa e verificar se o usuário é o proprietário.
   */
  private async verifyPartyOwnership(partyId: string, userId: string): Promise<PartyEntity> {
    const party = await this.partyModel.findByPk(partyId);

    if (!party) {
      throw new NotFoundException(`Festa com ID ${partyId} não encontrada.`);
    }

    if (party.userId !== userId) {
      throw new ForbiddenException('Você não tem permissão para modificar esta festa.');
    }

    return party;
  }

  async create(createPartyDto: CreatePartyDto, user: UserEntity): Promise<PartyEntity> {
    // Usando o método .create do Sequelize, que é mais direto
    const partyData = {
      ...createPartyDto,
      author: user.username,
      userId: user.id,
      password: createPartyDto.password ?? null,
    };
    return this.partyModel.create(partyData);
  }

  async findAll(): Promise<PartyEntity[]> {
    return this.partyModel.findAll({
      attributes: { exclude: ['password'] },
      include: [
        { model: ServiceEntity },
        { model: UserEntity, attributes: ['username'] },
      ],
    });
  }

  async findAllByUserId(userId: string): Promise<PartyEntity[]> {
    return this.partyModel.findAll({
      where: { userId },
      include: [ServiceEntity],
    });
  }

  async findOne(id: string): Promise<PartyEntity> {
    const party = await this.partyModel.findByPk(id, {
      include: [ServiceEntity, GuestEntity],
    });

    if (!party) {
      throw new NotFoundException(`Festa com ID ${id} não encontrada.`);
    }

    return party;
  }

  async update(id: string, updatePartyDto: UpdatePartyDto, userId: string): Promise<PartyEntity> {
    // encontrar e validar a permissão
    const party = await this.verifyPartyOwnership(id, userId);
    return party.update(updatePartyDto);
  }

  async remove(id: string, userId: string): Promise<void> {
    // verificação antes de deletar
    const party = await this.verifyPartyOwnership(id, userId);
    await party.destroy();
  }
}