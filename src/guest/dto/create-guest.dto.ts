import { IsString, IsEmail, IsUUID, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateGuestDto {
  @IsString() @IsNotEmpty() name: string;
  @IsUUID() @IsNotEmpty() partyId: string;
  @IsString() @IsOptional() phone: string;
}
