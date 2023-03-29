import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common'
import * as config from 'config'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const serverConfig = config.get('server');
  const logger = new Logger('bootstrap');
  const app = await NestFactory.create(AppModule);

  if(process.env.NODE_ENV === 'development'){
    app.enableCors();
  } else{
    app.enableCors({ origin: serverConfig.origin})
    logger.log(`Accepting requests from origin ${serverConfig.origin}"`);
  }

  const config_swagger = new DocumentBuilder()
    .setTitle('Cats example')
    .setDescription('The cats API description')
    .setVersion('1.0')
    .addTag('cats')
    .build();
  const document = SwaggerModule.createDocument(app, config_swagger);
  SwaggerModule.setup('api', app, document);

  const PORT = process.env.PORT || serverConfig.port;
  await app.listen(PORT);
  logger.log(`Run server is port: ${PORT}`);
}
bootstrap();
