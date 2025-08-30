import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ServiceEntity } from './entities/service.entity';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { PartyEntity } from '../party/entities/party.entity'; 

@Injectable()
export class ServicesService {
  constructor(
    @InjectModel(ServiceEntity)
    private readonly serviceModel: typeof ServiceEntity,
    @InjectModel(PartyEntity) 
    private readonly partyModel: typeof PartyEntity,
  ) {}

  async create(createServiceDto: CreateServiceDto, userId: string): Promise<ServiceEntity> {
    //encontramos a festa à qual o serviço pertence
    const party = await this.partyModel.findByPk(createServiceDto.partyId);

    if (!party) {
      throw new NotFoundException(`Festa com ID ${createServiceDto.partyId} não encontrada.`);
    }
    if (party.userId !== userId) {
      throw new ForbiddenException('Você não tem permissão para adicionar serviços a esta festa.');
    }
    return this.serviceModel.create({ ...createServiceDto });
  }
  // O método findAll é geralmente usado para admin. Para o usuário,
  // os serviços são buscados através da festa (no PartiesService).
  async findAll(): Promise<ServiceEntity[]> {
    return this.serviceModel.findAll();
  }

  async update(
  serviceId: string,
  updateServiceDto: UpdateServiceDto,
  userId: string, // Recebe o ID do usuário logado que vem do controller
): Promise<ServiceEntity> {
  //  Busca o serviço para garantir que ele existe
  const service = await this.findOne(serviceId);
  // Busca a festa à qual o serviço pertence para encontrar o dono
  const party = await this.partyModel.findByPk(service.partyId);
  // VERIFICAÇÃO DE PERMISSÃO
  // Garante que o usuário que está tentando editar é o dono da festa
  if (!party || party.userId !== userId) {
    throw new ForbiddenException('Você não tem permissão para editar este serviço.');
  }
  // Se a permissão for válida, atualiza o serviço com os novos dados
  return service.update(updateServiceDto);
}
  // Os métodos findOne, update e remove também precisariam de uma lógica
  async remove(serviceId: string, userId?: string): Promise<void> {
    const service = await this.findOne(serviceId);
    // Verificamos se o usuário que está tentando deletar o serviço
    // é o mesmo que é dono da festa.
    const party = await this.partyModel.findByPk(service.partyId);
    if (!party || party.userId !== userId) {
      throw new ForbiddenException('Você não tem permissão para remover este serviço.');
    }
    await service.destroy();
  }

  // ... (findOne e update seguiriam a mesma lógica de verificação)
  async findOne(id: string): Promise<ServiceEntity> {
    const service = await this.serviceModel.findByPk(id);
    if (!service) {
      throw new NotFoundException(`Serviço com ID ${id} não encontrado.`);
    }
    return service;
  }
}