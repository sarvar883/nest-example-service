import { Module } from '@nestjs/common';
import { MongoDBModule } from 'di/modules/infrastructure/mongodb-module';
import { Symbols } from 'di/symbols';
import { Model } from 'mongoose';
import { TaskService, TaskServiceImpl, TaskRepository, TaskModel } from 'infrastructure/task';
import { TaskRepositoryImpl } from 'infrastructure/database/repositories/task-repository';

@Module({
    imports: [MongoDBModule],
    providers: [
        {
            provide: Symbols.infrastructure.task.service,
            useFactory: (repository: TaskRepository): TaskService => {
                return new TaskServiceImpl(repository);
            },
            inject: [Symbols.infrastructure.task.repository],
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