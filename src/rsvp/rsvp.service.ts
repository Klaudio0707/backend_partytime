import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Resend } from 'resend';
import { ConfigService } from '@nestjs/config';
import { GuestEntity, GuestStatus } from '../guest/entities/guest.entity';
import { PartyEntity } from '../party/entities/party.entity';
import { UserEntity } from '../users/entities/user.entity';
import { CreateRsvpDto } from './dto/create-rsvp.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class RsvpService {
  private readonly resend: Resend;

  constructor(
    @InjectModel(GuestEntity) private readonly guestModel: typeof GuestEntity,
    private readonly configService: ConfigService, 
  ) {
    // Usamos o ConfigService para pegar a chave da API de forma segura
    this.resend = new Resend(this.configService.get<string>('RESEND_API_KEY'));
  }

  async confirmPresence(token: string, rsvpDto: CreateRsvpDto): Promise<{ message: string }> {
    const guest = await this.guestModel.findOne({
      where: { rsvpToken: token },
      include: [{ model: PartyEntity, include: [UserEntity] }],
    });

    if (!guest) throw new NotFoundException('Convite não encontrado ou inválido.');
    if (guest.status === GuestStatus.CONFIRMED) return { message: 'Presença já confirmada!' };
 if (guest.party.password) {
  //comparar senha de entrada com a senha da festa salva no banco ****
    const passwordMatches = await bcrypt.compare(rsvpDto.password || '', guest.party.password);
    
    if (!passwordMatches) {
      throw new UnauthorizedException('Senha da festa incorreta.');
    }
  }
    guest.status = GuestStatus.CONFIRMED;
    await guest.save();

  
    const adminEmail = this.configService.get<string>('ADMIN_NOTIFICATION_EMAIL');
    if (!adminEmail) {
      throw new Error('ADMIN_NOTIFICATION_EMAIL is not set in environment variables.');
    }
    const organizer = guest.party.user;

    await this.resend.emails.send({
      from: 'PartyTime Notificações <onboarding@resend.dev>',
      to: [adminEmail], // Envia sempre para o e-mail do admin
      subject: `🎉 Nova Confirmação: ${guest.name} na festa "${guest.party.title}"!`,
      html: `O convidado <strong>${guest.name}</strong> confirmou presença na festa de <strong>${organizer.username}</strong>.`,
    });

    return { message: 'Presença confirmada com sucesso!' };
  }
}