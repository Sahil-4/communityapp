import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsString } from "class-validator";

export class PostUpdateDTO {
  @ApiProperty({ example: "title of post" })
  @IsString()
  title: string;

  @ApiProperty({ example: "post content" })
  @IsString()
  content: string;

  @IsArray()
  tags: string[];
}
