import { Module } from '@nestjs/common';
import { ApiController } from 'infrastructure/controllers/api';

@Module({
    imports: [],
    controllers: [ApiController],
    providers: [],
})
export class AppModule {}