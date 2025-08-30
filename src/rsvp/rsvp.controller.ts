import { Controller, } from '@nestjs/common';
import { RsvpService } from './rsvp.service';
import { CreateRsvpDto } from './dto/create-rsvp.dto';
import { EmptyStringToNullPipe } from 'src/shared/pipes/empty-string-to-null.pipe';
import { Body, Param } from '@nestjs/common/decorators/http/route-params.decorator';
import { Post } from '@nestjs/common/decorators/http/request-mapping.decorator';

@Controller('rsvp')
export class RsvpController {
  constructor(private readonly rsvpService: RsvpService) { }

  @Post(':token')

  confirm(
    @Param('token') token: string,
    @Body(new EmptyStringToNullPipe()) rsvpDto: CreateRsvpDto,
  ) {
    return this.rsvpService.confirmPresence(token, rsvpDto);
  }
}