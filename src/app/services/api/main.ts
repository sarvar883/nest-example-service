import { NestFactory } from '@nestjs/core';
import { Symbols } from 'di/symbols';
import { ConfigSchema } from 'infrastructure/config';
import { AppModule } from './app.module';

async function bootstrap(): Promise<void> {
    const app = await NestFactory.create(AppModule);
    app.enableShutdownHooks();

    const config: ConfigSchema = app.get(Symbols.infrastructure.config.general);

    const host: string = config.api.host;
    const port: number = config.api.port;
    console.log(`[CPU Heavy service] Server started on port ${port}`);
    await app.listen(port, host);
}

bootstrap();