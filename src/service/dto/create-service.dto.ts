import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsUUID,
  IsOptional,
  IsUrl,
} from 'class-validator';

export class CreateServiceDto {
  @IsString()
  @IsNotEmpty({ message: 'O nome do serviço não pode estar vazio.' })
  name: string;

  @IsString()
  @IsOptional() 
  description?: string;

  @IsNumber({}, { message: 'O preço deve ser um número.' })
  @IsPositive({ message: 'O preço deve ser um número positivo.' })
  price: number;

  @IsUrl({}, { message: 'Por favor, insira uma URL válida.' })
  @IsOptional()
  image?: string;

  @IsString()
  @IsUUID('4', { message: 'O ID da festa (partyId) deve ser um UUID válido.' })
  @IsNotEmpty({ message: 'O serviço precisa estar associado a uma festa.' })
  partyId: string;
}