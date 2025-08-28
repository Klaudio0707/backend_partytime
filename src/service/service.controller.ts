import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, HttpCode, HttpStatus } from '@nestjs/common';
import { ServicesService } from './service.service';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';

@Controller('services')
export class ServicesController {
  constructor(private readonly servicesService: ServicesService) {}

  @Post()
  create(@Body() createServiceDto: CreateServiceDto, @Req() req) {
    const userId = req.user.id; // Pega o ID do usuário logado
    return this.servicesService.create(createServiceDto, userId);
  }

  @Get()
  findAll() {
    return this.servicesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.servicesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string,
  @Body() updateServiceDto: UpdateServiceDto,
  @Req() req) {
    const userId = req.user.id; // Pega o ID do usuário logado
    return this.servicesService.update(id, updateServiceDto, userId);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string, @Req() req) {
    const userId = req.user.id; // Pega o ID do usuário logado
    return this.servicesService.remove(id, userId);
  }
}