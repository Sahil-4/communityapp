import { Inject, Injectable } from "@nestjs/common";
import Redis from "ioredis";

// !TODO - enable caching
const disabled = true;

@Injectable()
export class CacheService {
  constructor(@Inject("REDIS_CLIENT") private readonly redis: Redis) {}

  async set(key: string, value: string) {
    if (disabled) return null;
    return await this.redis.set(key, value, "EX", 3600);
  }

  async get(key: string) {
    if (disabled) return null;
    return await this.redis.get(key);
  }

  async ping() {
    return await this.redis.ping();
  }
}
