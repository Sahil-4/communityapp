import { Injectable } from "@nestjs/common";
import { CacheService } from "src/common/cache/cache.service";
import { PrismaService } from "src/database/prisma/prisma.service";
import { CreateUserDTO } from "./dto/user-create.dto";
import { UserDTO } from "./dto/user.dto";

@Injectable()
export class UsersService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly cache: CacheService,
  ) {}

  async getUsers(page: number = 1, limit: number = 10) {
    const key = `users${page}${limit}`;
    const data = await this.cache.get(key);

    if (!data) {
      const users = await this.prisma.user.findMany({
        select: {
          id: true,
          username: true,
          name: true,
          phone: true,
          createdAt: true,
        },
        skip: (page - 1) * limit,
        take: limit,
      });
      await this.cache.set(key, JSON.stringify(users));

      return users;
    }

    return JSON.parse(data) as UserDTO[];
  }

  async getUserById(id: string) {
    const key = `users:user_id${id}`;
    const data = await this.cache.get(key);

    if (!data) {
      const user = await this.prisma.user.findUnique({
        where: { id },
        select: {
          id: true,
          username: true,
          name: true,
          phone: true,
          createdAt: true,
        },
      });
      await this.cache.set(key, JSON.stringify(user));

      return user;
    }

    return JSON.parse(data) as UserDTO | null;
  }

  async getUserByPhone(phone: CreateUserDTO["phone"]) {
    return await this.prisma.user.findUnique({ where: { phone } });
  }

  async createUser(data: CreateUserDTO) {
    return await this.prisma.user.create({ data });
  }

  async updateRefreshToken(
    userid: UserDTO["id"],
    refreshToken: UserDTO["refreshToken"],
  ) {
    return await this.prisma.user.update({
      where: { id: userid },
      data: { refreshToken },
      select: {
        id: true,
        username: true,
        name: true,
        phone: true,
        createdAt: true,
      },
    });
  }
}
