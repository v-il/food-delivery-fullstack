import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const PORT = process.env.PORT || 5000;
  const app = await NestFactory.create(AppModule);
  app.enableCors()
  app.use(cookieParser());

  const docsConfig = new DocumentBuilder().setTitle('Еда. Документация').build();

  const docs = SwaggerModule.createDocument(app, docsConfig);
  SwaggerModule.setup('/docs', app, docs);
  await app.listen(PORT, () => console.log(`SERVER STARTED ON PORT ${PORT}`));
}
bootstrap();
