import { Module } from '@nestjs/common';
import { Symbols } from 'di/symbols';
import { MongoDBModule } from 'di/modules/infrastructure/mongodb-module';
import { TaskModule } from 'di/modules/infrastructure/task-module';
import { UseCasesModule } from 'di/modules/infrastructure/usecases-module';
import { TaskService } from 'infrastructure/task';
import { TaskProcessor, TaskProcessorImpl } from 'infrastructure/task-processor';
import { Pbkdf2Usecase } from 'usecases/pbkdf2';

@Module({
    imports: [MongoDBModule, TaskModule, UseCasesModule],
    providers: [
        {
            provide: Symbols.infrastructure.taskProcessor.service,
            useFactory: (taskService: TaskService, pbkdf2UseCase: Pbkdf2Usecase): TaskProcessor => {
                return new TaskProcessorImpl(taskService, pbkdf2UseCase);
            },
            inject: [Symbols.infrastructure.task.service, Symbols.useCases.Pbkdf2],
        },
    ],
    exports: [Symbols.infrastructure.taskProcessor.service],
})
export class TaskProcessorModule {}