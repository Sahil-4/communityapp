import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema({ timestamps: true })
export class Post extends Document {
  @Prop({ required: true })
  title: string;

  @Prop()
  content: string;

  @Prop([String])
  tags: string[];

  @Prop([String])
  mediaURLs: string[];
}

export const PostSchema = SchemaFactory.createForClass(Post);
