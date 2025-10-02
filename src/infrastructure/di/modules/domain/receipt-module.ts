import { Module } from '@nestjs/common';
import { Model } from 'mongoose';
import { Symbols } from 'di/symbols';
import { MongoDBModule } from 'di/modules/infrastructure/mongodb-module';

import { ReceiptService, ReceiptServiceImpl, ReceiptRepository, ReceiptModel } from 'domain/receipt';
import { ReceiptRepositoryImpl } from 'infrastructure/database/repositories/receipt-repository';

@Module({
    imports: [MongoDBModule],
    providers: [
        {
            provide: Symbols.domain.receipt.service,
            useFactory: (repository: ReceiptRepository): ReceiptService => {
                return new ReceiptServiceImpl(repository);
            },
            inject: [Symbols.domain.receipt.repository],
        },
        {
            provide: Symbols.domain.receipt.repository,
            useFactory: (model: Model<ReceiptModel>): ReceiptRepository => {
                return new ReceiptRepositoryImpl(model);
            },
            inject: [Symbols.domain.receipt.schema],
        },
    ],
    exports: [Symbols.domain.receipt.service, Symbols.domain.receipt.repository],
})
export class ReceiptModule {}