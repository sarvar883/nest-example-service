import { Module } from '@nestjs/common';
import { ConfigModule } from 'di/modules/infrastructure/config-module';
import { MongoDBModule } from 'di/modules/infrastructure/mongodb-module';
import { WorkerPoolModule } from 'di/modules/infrastructure/worker-pool-module';
import { TaskModule } from 'di/modules/infrastructure/task-module';
import { Processor } from 'infrastructure/controllers/processor';

@Module({
    imports: [
        ConfigModule,
        MongoDBModule,
        WorkerPoolModule,
        TaskModule,
    ],
    providers: [Processor],
})
export class AppModule {}