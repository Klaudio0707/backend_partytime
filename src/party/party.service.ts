import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
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

  async create(createPartyDto: CreatePartyDto, user: UserEntity): Promise<PartyEntity> {
    const party = new PartyEntity();
    party.title = createPartyDto.title;
    party.description = createPartyDto.description;
    party.budget = createPartyDto.budget;
    party.image = createPartyDto.image;
    party.author = user.username; 
    party.userId = user.id;       
    party.date = createPartyDto.date;
  party.password = createPartyDto.password ?? null;
    return await party.save();
  }

async findAll(): Promise<PartyEntity[]> {
  return this.partyModel.findAll({
    include: [
      { model: ServiceEntity }, 
      { model: UserEntity, attributes: ['username'] } 
    ],
  });
}

async findAllByUserId(userId: string): Promise<PartyEntity[]> {
  return this.partyModel.findAll({ 
    where: { userId },
    include: [ServiceEntity] 
  });
}

async findOne(id: string): Promise<PartyEntity> {
  const party = await this.partyModel.findByPk(id, {
    include: [ServiceEntity, GuestEntity], // inclui os convidados
  });

  if (!party) {
    throw new NotFoundException(`Festa com ID ${id} não encontrada.`);
  }

  return party;
}

async update(id: string, updatePartyDto: UpdatePartyDto, userId: string): Promise<PartyEntity> {
    // Busca a festa para garantir que ela existe
    const party = await this.findOne(id); // findOne já lança NotFoundException se não achar

    //  VERIFICAÇÃO DE PERMISSÃO: Garante que o usuário é o dono da festa
    if (party.userId !== userId) {
      throw new ForbiddenException('Você não tem permissão para editar esta festa.');
    }

    // Se a permissão for válida, atualiza a festa e retorna o resultado
    return party.update(updatePartyDto);
  }
  async remove(id: string): Promise<void> {
    const party = await this.findOne(id);
    //O Sequelize pode ser configurado para deletar
    // os serviços relacionados em cascata (ON DELETE CASCADE no banco).
    await party.destroy();
  }
}