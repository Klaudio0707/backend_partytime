import { Controller, Post, Body, UseGuards, Req, Delete, Param } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GuestService } from './guest.service';
import { CreateGuestDto } from './dto/create-guest.dto';

@Controller('guests')
export class GuestController {
  constructor(private readonly guestService: GuestService) {}

 
  @Post()
  @UseGuards(AuthGuard('jwt-from-cookie'))
  create(@Body() createGuestDto: CreateGuestDto, @Req() req) {
    const userId = req.user.id;
    return this.guestService.create(createGuestDto, userId);
  }
  
  @Delete(':id')
  @UseGuards(AuthGuard('jwt-from-cookie'))
  remove(@Param('id') id: string, @Req() req) {
    const userId = req.user.id;
    return this.guestService.remove(id, userId);
  }
  
}