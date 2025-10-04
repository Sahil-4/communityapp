import { Controller, Get, Param, UseGuards } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { AuthGuard } from "src/common/guards/auth.guard";
import { UsersService } from "./users.service";

@ApiTags("Users")
@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ summary: "Get all users" })
  @ApiResponse({ status: 200, description: "Users retrieved successfully" })
  @UseGuards(AuthGuard)
  @Get()
  async getUsers() {
    const users = await this.usersService.getUsers();
    return { success: true, data: users, message: "users retrieved" };
  }

  @ApiOperation({ summary: "Get user by id" })
  @ApiResponse({ status: 200, description: "User retrieved successfully" })
  @UseGuards(AuthGuard)
  @Get("/:id")
  async getUserById(@Param("id") id: string) {
    const user = await this.usersService.getUserById(id);
    return { success: true, data: user, message: `user retrieved id ${id}` };
  }
}
