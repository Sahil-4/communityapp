import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsPhoneNumber, IsString } from "class-validator";

export class LoginPayloadDTO {
  @ApiProperty({ example: "+91XXXXYYYZZZ" })
  @IsString()
  @IsPhoneNumber()
  phone: string;

  @IsString()
  @IsOptional()
  password: string;
}
