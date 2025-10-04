import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { PostCreateDTO } from "./dto/post-create.dto";
import { PostUpdateDTO } from "./dto/post-update.dto";
import { Post } from "../../database/mongoose/post.schema";

@Injectable()
export class PostsService {
  constructor(@InjectModel(Post.name) private postModel: Model<Post>) {}

  async getPosts(page: number = 1, limit: number = 10) {
    return await this.postModel
      .find()
      .limit(limit)
      .skip((page - 1) * limit);
  }

  async getPostById(id: string) {
    return await this.postModel.findById(id);
  }

  async addPost(payload: PostCreateDTO) {
    return await this.postModel.create({ ...payload });
  }

  async updatePost(id: string, payload: PostUpdateDTO) {
    return await this.postModel.findByIdAndUpdate(id, payload, {
      new: true,
    });
  }

  async deletePost(id: string) {
    return await this.postModel.findByIdAndDelete(id);
  }
}
