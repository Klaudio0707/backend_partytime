import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateRsvpDto {
    @IsString()
   @IsOptional() 
  password?: string;
}
