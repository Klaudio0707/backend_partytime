import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { PartiesService } from './party.service';
import { CreatePartyDto } from './dto/create-party.dto';
import { UpdatePartyDto } from './dto/update-party.dto';
import { AuthGuard } from '@nestjs/passport';
import { UserEntity } from 'src/users/entities/user.entity';
import { Request } from 'express';

// O AuthGuard anexa o UserEntity ao request.
// Para ter o tipo correto, podemos estender a interface Request.
interface RequestWithUser extends Request {
  user: UserEntity;
}

@Controller('parties')
export class PartiesController {
  constructor(private readonly partiesService: PartiesService) {}

  @Post()
  @UseGuards(AuthGuard('jwt-from-cookie'))
  create(@Body() createPartyDto: CreatePartyDto, @Req() req: RequestWithUser) {
    // Passamos a entidade completa do usuário para o serviço
    return this.partiesService.create(createPartyDto, req.user);
  }

  @Get()
  findAll() {
    return this.partiesService.findAll();
  }

  @Get('my-parties')
  @UseGuards(AuthGuard('jwt-from-cookie'))
  findUserParties(@Req() req: RequestWithUser) {
    return this.partiesService.findAllByUserId(req.user.id);
  }
  
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.partiesService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard('jwt-from-cookie')) // Apenas um AuthGuard é necessário
  update(
    @Param('id') partyId: string,
    @Body() updatePartyDto: UpdatePartyDto,
    @Req() req: RequestWithUser,
  ) {
    return this.partiesService.update(partyId, updatePartyDto, req.user.id);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT) // Retorna 204 No Content em caso de sucesso
  @UseGuards(AuthGuard('jwt-from-cookie'))
  remove(@Param('id') partyId: string, @Req() req: RequestWithUser) {
    return this.partiesService.remove(partyId, req.user.id);
  }
}