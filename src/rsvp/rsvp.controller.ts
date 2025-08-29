import { Controller, Post, Param, Body } from '@nestjs/common';
import { RsvpService } from './rsvp.service';
import { CreateRsvpDto } from './dto/create-rsvp.dto';


@Controller('rsvp')
export class RsvpController {
  constructor(private readonly rsvpService: RsvpService) {}

@Post(':token')

  confirm(
    @Param('token') token: string,
    @Body(()) rsvpDto: CreateRsvpDto,
  ) {
    return this.rsvpService.confirmPresence(token, rsvpDto);
  }
}