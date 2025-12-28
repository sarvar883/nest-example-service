import { Module } from '@nestjs/common';
import { Model } from 'mongoose';
import { Symbols } from 'di/symbols';
import { ConfigModule } from 'di/modules/infrastructure/config-module';
import { ConfigSchema, TaskConfigs } from 'infrastructure/config';
import { MongoDBModule } from 'di/modules/infrastructure/mongodb-module';
import { TaskService, TaskServiceImpl, TaskRepository, TaskModel } from 'infrastructure/task';
import { TaskRepositoryImpl } from 'infrastructure/database/repositories/task-repository';
import { DateUtilsModule } from 'di/modules/domain/date-utils-module';
import { DateUtils } from 'domain/utils/date';

@Module({
    imports: [ConfigModule, MongoDBModule, DateUtilsModule],
    providers: [
        {
            provide: Symbols.infrastructure.task.service,
            useFactory: (cc: ConfigSchema, dateUtils: DateUtils, repository: TaskRepository): TaskService => {
                const config: TaskConfigs = {
                    debounceAfterCreate: cc.task.debounceAfterCreate,
                    debounceForRetry: cc.task.debounceForRetry,
                };

                return new TaskServiceImpl(config, dateUtils, repository);
            },
            inject: [Symbols.infrastructure.config.general, Symbols.domain.utils.dateUtils, Symbols.infrastructure.task.repository],
        },
        {
            provide: Symbols.infrastructure.task.repository,
            useFactory: (model: Model<TaskModel>): TaskRepository => {
                return new TaskRepositoryImpl(model);
            },
            inject: [Symbols.infrastructure.task.schema],
        },
    ],
    exports: [Symbols.infrastructure.task.service],
})
export class TaskModule {}