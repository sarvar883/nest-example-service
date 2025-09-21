import { Module } from '@nestjs/common';
import { ApiController } from 'infrastructure/controllers/api';
import { ConfigModule } from 'di/modules/infrastructure/config-module';

@Module({
    imports: [
        ConfigModule,
    ],
    controllers: [ApiController],
})
export class AppModule {}