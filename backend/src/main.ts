import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { AppModule } from "./app.module";
import appConfig from "./config/config";

(async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Swagger config
  const config = new DocumentBuilder()
    .setTitle(appConfig.app.name)
    .setDescription(appConfig.app.description)
    .setVersion(appConfig.app.version)
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api/v1/docs", app, document);

  await app.listen(appConfig.app.port);
})();
