import { JwtModule } from "@nestjs/jwt";
import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { UsersModule } from "../users/users.module";
import config from "../../config/config";

@Module({
  imports: [UsersModule, JwtModule.register(config.jwt.moduleOptions)],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
