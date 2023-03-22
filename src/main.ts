import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const PORT = 3008;
  await app.listen(PORT);
  console.log(`Run server is port: ${PORT}`);
}
bootstrap();
