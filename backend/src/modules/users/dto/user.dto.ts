import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsPhoneNumber, IsString } from "class-validator";

export class UserDTO {
  @IsString()
  id: string;

  @ApiProperty({ example: "John_Doe" })
  @IsString()
  username: string;

  @ApiProperty({ example: "John Doe" })
  @IsString()
  name: string;

  @ApiProperty({ example: "+91XXXXYYYZZZ" })
  @IsString()
  @IsPhoneNumber()
  phone: string;

  @IsString()
  @IsOptional()
  password: string;

  @IsString()
  refreshToken: string | null;

  @IsString()
  createdAt: Date;

  @IsString()
  updatedAt: Date;
}
