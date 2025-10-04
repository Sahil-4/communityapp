import { Module } from "@nestjs/common";
import { UsersService } from "./users.service";
import { UsersController } from "./users.controller";

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService], // by this UsersService will be accessible in other services too
})
export class UsersModule {}
