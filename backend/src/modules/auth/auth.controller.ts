import {
  Controller,
  Post,
  Body,
  Get,
  UseGuards,
  Request,
} from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { AuthService } from "./auth.service";
import { AuthGuard } from "src/common/guards/auth.guard";
import { SignupPayloadDTO } from "./dto/signup.dto";
import { LoginPayloadDTO } from "./dto/login.dto";
import type { Request as ERequest } from "express";
import { UserDTO } from "../users/dto/user.dto";

@ApiTags("Authentication")
@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({
    summary: "signup | register new user",
  })
  @ApiResponse({
    status: 200,
    description: "user signup successful",
  })
  @Post("signup")
  async signup(@Body() payload: SignupPayloadDTO) {
    const responsePayload = await this.authService.signup(payload);
    return { message: "User signed up successfully", data: responsePayload };
  }

  @ApiOperation({
    summary: "login | already registered user",
  })
  @ApiResponse({
    status: 200,
    description: "user login successful",
  })
  @Post("login")
  async login(@Body() payload: LoginPayloadDTO) {
    const responsePayload = await this.authService.login(payload);
    return { message: "User logged in successfully", data: responsePayload };
  }

  @ApiOperation({
    summary: "refresh auth tokens",
  })
  @ApiResponse({
    status: 200,
    description: "auth tokens refreshed",
  })
  @UseGuards(AuthGuard)
  @Get("refresh")
  async refreshToken(@Request() req: ERequest) {
    const phone: UserDTO["phone"] = (req as any).user.phone;
    const responsePayload = await this.authService.refreshToken(phone);
    return { message: "Token refreshed successfully", data: responsePayload };
  }
}
