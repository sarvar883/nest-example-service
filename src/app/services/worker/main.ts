import { NestFactory } from '@nestjs/core';
import { AppModule } from 'services/worker/app.module';
import { WorkerFunction } from 'services/worker/types';

async function startWorker(): Promise<WorkerFunction> {
    const app = await NestFactory.create(AppModule);

    await app.init();
    console.log('[Worker] Started');
    return async (taskId: string): Promise<void> => {
        try {

        } catch (e) {
            
        }
    }
}

export default startWorker();