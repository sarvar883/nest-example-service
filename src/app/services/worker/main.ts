import { NestFactory } from '@nestjs/core';
import { Symbols } from 'di/symbols';
import { AppModule } from 'services/worker/app.module';
import { WorkerFunction } from 'services/worker/types';
import { TaskProcessor } from 'infrastructure/task-processor';

async function startWorker(): Promise<WorkerFunction> {
    const app = await NestFactory.create(AppModule);
    app.enableShutdownHooks();

    const taskProcessor: TaskProcessor = app.get(Symbols.infrastructure.taskProcessor.service);

    await app.init();
    console.log('[Worker] Started');

    return async (taskId: string): Promise<void> => {
        try {
            await taskProcessor.run(taskId);
        } catch (e) {
            console.log('[Worker] Error on running task ', taskId, ' Error = ', e);
        }
    }
}

export default startWorker();