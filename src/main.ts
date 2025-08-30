import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import cookieParser from 'cookie-parser'; 

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  app.useGlobalPipes(new ValidationPipe({transform: true}));
  app.use(cookieParser()); 

  app.enableCors({
    origin: 'https://front-partytime.vercel.app', 
    
    // Métodos HTTP liberados
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', 
    
    allowedHeaders: 'Content-Type, Accept, Authorization', 
    
    credentials: true, 
  
  });

  await app.listen(process.env.PORT || 3000);
}
bootstrap();