import { Controller, Post, Param, Body } from '@nestjs/common';
import { RsvpService } from './rsvp.service';
import { CreateRsvpDto } from './dto/create-rsvp.dto';
import { EmptyStringToNullPipe } from 'src/shared/pipes/empty-string-to-null.pipe';

@Controller('rsvp')
export class RsvpController {
  constructor(private readonly rsvpService: RsvpService) {}

@Post(':token')

  confirm(
    @Param('token') token: string,
    @Body(new EmptyStringToNullPipe()) rsvpDto: CreateRsvpDto,
  ) {
    return this.rsvpService.confirmPresence(token, rsvpDto);
  }
}