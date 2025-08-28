import { Injectable, ForbiddenException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { GuestEntity } from './entities/guest.entity';
import { CreateGuestDto } from './dto/create-guest.dto';
import { PartyEntity } from '../party/entities/party.entity';
import { UserEntity } from '../users/entities/user.entity';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class GuestService {
  constructor(
    @InjectModel(GuestEntity) private readonly guestModel: typeof GuestEntity,
    @InjectModel(PartyEntity) private readonly partyModel: typeof PartyEntity,
    @InjectModel(UserEntity) private readonly userModel: typeof UserEntity,
  ) {}

  
  async create(createGuestDto: CreateGuestDto, userId: string): Promise<GuestEntity> {
    const { name, phone, partyId } = createGuestDto;

    // 1. VERIFICAR PERMISSÃO
    const party = await this.partyModel.findByPk(partyId);
    if (!party) {
      throw new NotFoundException(`Festa com ID ${partyId} não encontrada.`);
    }
    if (party.userId !== userId) {
      throw new ForbiddenException('Você não tem permissão para adicionar convidados a esta festa.');
    }

    // 2. VERIFICAR LIMITE (QUOTA)
    const user = await this.userModel.findByPk(userId);
    if (!user) {
      throw new NotFoundException(`Usuário com ID ${userId} não encontrado.`);
    }
    if (user.invitationSendsLeft <= 0) {
      throw new ForbiddenException('Você atingiu seu limite de criação de convites.');
    }

    // DECREMENTAR O LIMITE E SALVAR O USUÁRIO
    user.invitationSendsLeft -= 1;
    await user.save();

    //  CRIAR E SALVAR O CONVIDADO NO BANCO DE DADOS
    const guest = await this.guestModel.create({
    name,
    phone,
    partyId,
    rsvpToken: uuidv4(), //token único para o convite
  });

    return guest;
  }
  async remove(guestId: string, userId: string): Promise<void> {
    const guest = await this.guestModel.findByPk(guestId, {
      include: [PartyEntity], // Inclui a festa para podermos verificar o dono
    });

    if (!guest) {
      throw new NotFoundException(`Convidado com ID ${guestId} não encontrado.`);
    }
    // VERIFICAÇÃO DE PERMISSÃO
    if (guest.party.userId !== userId) {
      throw new ForbiddenException('Você não tem permissão para remover este convidado.');
    }

    await guest.destroy();
  }
}