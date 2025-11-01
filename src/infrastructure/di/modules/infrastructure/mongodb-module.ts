import { Module } from '@nestjs/common';
import { createConnection, Connection, Model } from 'mongoose';
import { Symbols } from 'di/symbols';
import { ConfigModule } from 'di/modules/infrastructure/config-module';
import { ConfigSchema } from 'infrastructure/config';

import { TaskModel } from 'infrastructure/task';
import { TaskSchema } from 'infrastructure/database/schemas/task';

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
            provide: Symbols.infrastructure.task.schema,
            useFactory: (connection: Connection): Model<TaskModel> => {
                return connection.model(Symbols.infrastructure.task.schema.toString(), TaskSchema);
            },
            inject: [
                Symbols.infrastructure.db.mongo,
            ],
        },
    ],
    exports: [Symbols.infrastructure.db.mongo, Symbols.infrastructure.task.schema,],
})
export class MongoDBModule {}