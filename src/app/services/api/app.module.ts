import { Module } from '@nestjs/common';
import { ApiController } from 'infrastructure/controllers/api';
import { ConfigModule } from 'di/modules/infrastructure/config-module';
import { MongoDBModule } from 'di/modules/infrastructure/mongodb-module';
import { ReceiptModule } from 'di/modules/domain/receipt-module';

@Module({
    imports: [
        ConfigModule,
        MongoDBModule,
        ReceiptModule,
    ],
    controllers: [ApiController],
})
export class AppModule {}