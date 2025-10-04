import { Global, Module } from "@nestjs/common";
import Redis from "ioredis";
import { CacheService } from "./cache.service";
import config from "../../config/config";

const redisProvider = {
  provide: "REDIS_CLIENT",
  useFactory: () => {
    return new Redis(config.redis.url, config.redis.options);
  },
};

@Global()
@Module({
  providers: [redisProvider, CacheService],
  exports: [redisProvider, CacheService],
})
export class CacheModule {}
