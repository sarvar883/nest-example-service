import { Module } from '@nestjs/common';
import { ConfigModule } from 'di/modules/infrastructure/config-module';
import { MongoDBModule } from 'di/modules/infrastructure/mongodb-module';
import { TaskProcessorModule } from 'di/modules/infrastructure/task-processor-module';
import { TaskModule } from 'di/modules/infrastructure/task-module';

@Module({
    imports: [ConfigModule, MongoDBModule, TaskProcessorModule, TaskModule],
})
export class AppModule {}