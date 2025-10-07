import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { PostsService } from "./posts.service";
import { PostCreateDTO } from "./dto/post-create.dto";
import { PostUpdateDTO } from "./dto/post-update.dto";
import { AuthGuard } from "src/common/guards/auth.guard";

@ApiTags("Posts CRUD")
@UseGuards(AuthGuard)
@Controller("posts")
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @ApiOperation({
    summary: "get all posts",
  })
  @ApiResponse({
    status: 200,
    description: "Posts retrieved successfully",
  })
  @Get()
  async getPosts() {
    const data = await this.postsService.getPosts();
    return { message: "All posts retrieved", data };
  }

  @ApiOperation({
    summary: "get post by id",
  })
  @ApiResponse({
    status: 200,
    description: "Post retrieved successfully",
  })
  @Get("/:id")
  async getPostById(@Param("id") id: string) {
    const data = await this.postsService.getPostById(id);
    return { message: `Post with id ${id} retrieved`, data };
  }

  @ApiOperation({
    summary: "create new post",
  })
  @ApiResponse({
    status: 200,
    description: "Post created successfully",
  })
  @Post()
  async addPost(@Body() payload: PostCreateDTO) {
    const data = await this.postsService.addPost(payload);
    return { message: "Post created", data };
  }

  @ApiOperation({
    summary: "update post by id",
  })
  @ApiResponse({
    status: 200,
    description: "Post updated successfully",
  })
  @Patch("/:id")
  async updatePost(@Param("id") id: string, @Body() payload: PostUpdateDTO) {
    const data = await this.postsService.updatePost(id, payload);
    return { message: `Post with id ${id} updated`, data };
  }

  @ApiOperation({
    summary: "delete post by id",
  })
  @ApiResponse({
    status: 200,
    description: "Post deleted successfully",
  })
  @Delete("/:id")
  async deletePost(@Param("id") id: string) {
    const data = await this.postsService.deletePost(id);
    return { message: `Post with id ${id} deleted`, data };
  }
}
