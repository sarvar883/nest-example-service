import { Module } from '@nestjs/common';
import { createConnection, Connection, Model } from 'mongoose';
import { Symbols } from 'di/symbols';
import { ConfigModule } from 'di/modules/infrastructure/config-module';
import { ConfigSchema } from 'infrastructure/config';

import { ReceiptModel } from 'domain/receipt';
import { ReceiptSchema } from 'infrastructure/database/schemas/receipt';


const data = [

];

@Module({
    imports: [ConfigModule],
    providers: [
        {
            provide: Symbols.infrastructure.db.mongo,
            useFactory: (config: ConfigSchema) => {
                const dbName: string = config.mongodb.dbName;
                const dbConnectionString: string = config.mongodb.dbConnectionString;
                const dbAuthEnabled: boolean = config.mongodb.dbAuthEnabled;
                const dbUsername: string = config.mongodb.dbUsername;
                const dbPassword: string = config.mongodb.dbPassword;
                const dbAuthSource: string = config.mongodb.dbAuthSource;

                const dbOptions: Record<string, any> = {
                    dbName,
                };

                if (dbAuthEnabled) {
                    dbOptions.auth = {
                        username: dbUsername,
                        password: dbPassword,
                    };
                    dbOptions.authSource = dbAuthSource;
                }

                return createConnection(dbConnectionString, dbOptions);
            },
            inject: [Symbols.infrastructure.config.general],
        },
        {
            provide: Symbols.domain.receipt.schema,
            useFactory: (connection: Connection): Model<ReceiptModel> => {
                return connection.model(Symbols.domain.receipt.schema.toString(), ReceiptSchema);
            },
            inject: [
                Symbols.infrastructure.db.mongo,
            ],
        },
    ],
    exports: [Symbols.infrastructure.db.mongo, Symbols.domain.receipt.schema,],
})
export class MongoDBModule {}