import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import config from "src/config/config";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const authorization = request.headers.accesstoken;
    const accesstoken = (authorization as string)?.split(" ")[1];

    if (!accesstoken) {
      throw new UnauthorizedException();
    }

    try {
      const payload = await this.jwtService.verifyAsync(
        accesstoken,
        config.jwt.moduleOptions,
      );
      if (!payload) return false;

      request.user = payload;

      return true;
    } catch {
      throw new UnauthorizedException();
    }
  }
}
