import {
  BadRequestException,
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import bcrypt from "bcrypt";
import { LoginPayloadDTO } from "./dto/login.dto";
import { SignupPayloadDTO } from "./dto/signup.dto";
import { UsersService } from "../users/users.service";
import { JwtService } from "@nestjs/jwt";
import { UserDTO } from "../users/dto/user.dto";
import config from "src/config/config";

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async generateToken(user: UserDTO) {
    // token payload
    const payload = { id: user.id, username: user.username, phone: user.phone };

    const accessToken = await this.jwtService.signAsync(payload);
    const refreshToken = await this.jwtService.signAsync(payload, {
      expiresIn: config.jwt.refreshExpiresIn,
    });

    return { accessToken, refreshToken };
  }

  encodePassword(password: SignupPayloadDTO["password"]) {
    return bcrypt.hashSync(password, Number(config.jwt.saltRounds));
  }

  verifyPassword(payload: LoginPayloadDTO, user: UserDTO) {
    return bcrypt.compareSync(payload.password, user.password);
  }

  async signup(payload: SignupPayloadDTO) {
    const { phone, password } = payload;

    if (!phone || !password) {
      throw new BadRequestException(
        "phone, password, name, username are required",
      );
    }

    const existingUser = await this.usersService.getUserByPhone(phone);
    if (existingUser) {
      throw new ConflictException("User already exists");
    }

    payload.password = this.encodePassword(password);

    const user = await this.usersService.createUser(payload);

    if (!user) {
      throw new InternalServerErrorException("Something went wrong");
    }

    const { accessToken, refreshToken } = await this.generateToken(user);

    await this.usersService.updateRefreshToken(user.id, refreshToken);

    const responsePayload = {
      ...user,
      accessToken,
      refreshToken,
      password: null,
    };

    return responsePayload;
  }

  async login(payload: LoginPayloadDTO) {
    const user = await this.usersService.getUserByPhone(payload.phone);
    if (!user) {
      throw new NotFoundException("User not found");
    }

    const check = this.verifyPassword(payload, user);
    if (!check) {
      throw new UnauthorizedException("Invalid credentials");
    }

    const { accessToken, refreshToken } = await this.generateToken(user);

    await this.usersService.updateRefreshToken(user.id, refreshToken);

    const responsePayload = {
      ...user,
      accessToken,
      refreshToken,
      password: null,
    };

    return responsePayload;
  }

  async refreshToken(phone: UserDTO["phone"]) {
    const user = await this.usersService.getUserByPhone(phone);
    if (!user) {
      throw new NotFoundException("User not found");
    }

    const { accessToken, refreshToken } = await this.generateToken(user);

    await this.usersService.updateRefreshToken(user.id, refreshToken);

    const responsePayload = {
      ...user,
      accessToken,
      refreshToken,
      password: null,
    };

    return responsePayload;
  }
}
