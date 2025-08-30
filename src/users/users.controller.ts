import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
  UseGuards,
  Req,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from '@nestjs/passport';


@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }


  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  // Geralmente, listar todos os usuários é uma rota de administrador,

  @UseGuards(AuthGuard('jwt-from-cookie'))
  @Get()
  findAll() {
    return this.usersService.findAll();
  }
  @UseGuards(AuthGuard('jwt-from-cookie'))
  @Get(':id')
  // 2. Use o ParseUUIDPipe e mude o tipo para string
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.usersService.findOne(id);
  }
  @Patch('patch/profile')
  @UseGuards(AuthGuard('jwt-from-cookie'))
  updateProfile(@Req() req, @Body() updateUserDto: UpdateUserDto) {
    const userId = req.user.id;
    return this.usersService.update(userId, updateUserDto);
  }

  @Delete('delete/profile')
  @UseGuards(AuthGuard('jwt-from-cookie'))
  deleteProfile(@Req() req) {
    const userId = req.user.id;
    return this.usersService.remove(userId);
  }
}