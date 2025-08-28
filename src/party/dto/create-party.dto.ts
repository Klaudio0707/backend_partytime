import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsUrl,
  IsArray,
  ValidateNested,
  IsOptional, 
  MinLength,    
  IsDateString,
  ValidateIf,
} from 'class-validator';
import { Transform, Type } from 'class-transformer';
import { CreateServiceDto } from '../../service/dto/create-service.dto';

export class CreatePartyDto {
  @IsString()
  @IsNotEmpty()
  title: string; // titulo da festa


  @IsString()
  @IsNotEmpty()
  description: string; // descrição da festa

  @IsDateString({}, { message: 'Por favor, insira uma data válida.' })
  @IsNotEmpty({ message: 'A data da festa não pode estar vazia.' })
  date: Date; // data e hora da festa

  @IsNumber()
  @IsPositive()
  budget: number; // orçamento da festa

  @IsUrl({}, { message: 'Por favor, insira uma URL válida.' })
  @ValidateIf((object, value) =>  value !== '') // o objeto conter algo passa, se não bloqueia
  @IsOptional() // a url da imagem é opcional e caso o usuario inclua alguma url, ela exige http no inicio
  image?: string;

  @Transform(({ value }) => (value === '' ? null : value))
  @IsString()
  @IsOptional() 
  @MinLength(4, { message: 'A senha da festa precisa ter no mínimo 4 caracteres.' })
  password?: string;


  @IsArray()
  @ValidateNested({ each: true }) // Diz ao validator para validar cada item do array
  @Type(() => CreateServiceDto)   // Diz qual DTO usar para a validação aninhada
  services: CreateServiceDto[];
}
