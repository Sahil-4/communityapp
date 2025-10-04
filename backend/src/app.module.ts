import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { PrismaModule } from "./database/prisma/prisma.module";
import { CacheModule } from "./common/cache/cache.module";
import { AuthModule } from "./modules/auth/auth.module";
import { PostsModule } from "./modules/posts/posts.module";
import { UsersModule } from "./modules/users/users.module";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import config from "./config/config";

@Module({
  imports: [
    MongooseModule.forRoot(config.mongo.url, config.mongo.options),
    PrismaModule,
    CacheModule,
    AuthModule,
    PostsModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
