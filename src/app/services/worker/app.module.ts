import { Module } from '@nestjs/common';
import { ConfigModule } from 'di/modules/infrastructure/config-module';
import { MongoDBModule } from 'di/modules/infrastructure/mongodb-module';
import { TaskModule } from 'di/modules/infrastructure/task-module';

@Module({
    imports: [ConfigModule, MongoDBModule, TaskModule],
})
export class AppModule {}