import { Module } from '@nestjs/common';
import { MongoDBModule } from 'di/modules/infrastructure/mongodb-module';
import { Symbols } from 'di/symbols';
import { Model } from 'mongoose';
import { TaskService, TaskServiceImpl, TaskRepository, TaskModel } from 'infrastructure/task';
import { TaskRepositoryImpl } from 'infrastructure/database/repositories/task-repository';
import { DateUtilsModule } from 'di/modules/domain/date-utils-module';
import { DateUtils } from 'domain/utils/date';

@Module({
    imports: [MongoDBModule, DateUtilsModule],
    providers: [
        {
            provide: Symbols.infrastructure.task.service,
            useFactory: (dateUtils: DateUtils, repository: TaskRepository): TaskService => {
                return new TaskServiceImpl(dateUtils, repository);
            },
            inject: [Symbols.domain.utils.dateUtils, Symbols.infrastructure.task.repository],
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