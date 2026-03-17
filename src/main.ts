import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  process.env.TZ = '-03:00';

  const config = new DocumentBuilder()
  .setTitle('E-commerce Farmacia')
  .setDescription('Projeto E-commerce Farmacia')
  .setContact("Maria Eduarda Gomes","https://github.com/memariaa","mariaeduardao.gms@gmail.com")
  .setVersion('1.0')
  .addBearerAuth()
  .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/swagger', app, document);

  app.useGlobalPipes(new ValidationPipe())

  await app.listen(process.env.PORT ?? 4000);
}
bootstrap();