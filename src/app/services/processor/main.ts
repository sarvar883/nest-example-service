import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap(): Promise<void> {
    const app = await NestFactory.create(AppModule);
    app.enableShutdownHooks();

    await app.init();
    console.log('[CPU Heavy service] Processor started');
}

bootstrap();