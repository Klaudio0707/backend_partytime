import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateRsvpDto {
    @IsString()
  @IsNotEmpty()
   @IsOptional() 
  password?: string;
}
