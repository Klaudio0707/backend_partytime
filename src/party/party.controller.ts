import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus, UseGuards, Req } from '@nestjs/common';
import { PartiesService } from './party.service';
import { CreatePartyDto } from './dto/create-party.dto';
import { UpdatePartyDto } from './dto/update-party.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('parties')
export class PartiesController {
  constructor(private readonly partiesService: PartiesService) { }


  @UseGuards(AuthGuard('jwt-from-cookie'))
  @Post()
  create(@Body() createPartyDto: CreatePartyDto, @Req() req) {
    const user = req.user;
    return this.partiesService.create(createPartyDto, user);
  }


  @Get()
  findAll() {
    return this.partiesService.findAll();
  }

  @UseGuards(AuthGuard('jwt-from-cookie'))
  @Get('my-parties')
  findUserParties(@Req() req) {
  const userId = req.user.id;
  return this.partiesService.findAllByUserId(userId);
}
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.partiesService.findOne(id);
  }

  @UseGuards(AuthGuard('jwt-from-cookie'))
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePartyDto: UpdatePartyDto,
    @Req() req,
  ) {
    const userId = req.user.id;
    return this.partiesService.update(id, updatePartyDto, userId);
  }
  
  @UseGuards(AuthGuard('jwt-from-cookie'))
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) {
    return this.partiesService.remove(id);
  }
}