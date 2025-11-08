import { OnModuleInit, Inject } from '@nestjs/common';
import { Symbols } from 'di/symbols';
import { sleep } from 'domain/utils/sleep';
import type { WorkerPool } from 'infrastructure/worker-pool';
import { QueueFullError } from 'infrastructure/worker-pool';
import type { TaskModel, TaskService } from 'infrastructure/task';

export class Processor implements OnModuleInit {
    constructor(
        @Inject(Symbols.infrastructure.worker.pool) private readonly workerPool: WorkerPool,
        @Inject(Symbols.infrastructure.task.service) private readonly taskService: TaskService,
    ) {}

    async onModuleInit(): Promise<void> {
        console.log('[Processor] Starting Processor ...');
        this.fillPool();
    }

    private async fillPool(): Promise<void> {
        console.log('[Processor] fillPool iteration');
        while (this.workerPool.acceptsTasks()) {
            const task: TaskModel | null = await this.taskService.getNext();

            if (!task) {
                break;
            }

            this.runNext(task._id);
        }
        console.log('[Processor] fillPool after while loop');
        await sleep(5000);
        this.fillPool();
    }

    private runNext(taskId: string): void {
        this.workerPool.run(taskId).catch(async (e) => {
            if (e instanceof QueueFullError) {
                await sleep(1000);
                this.runNext(taskId);
            } else {

            }
        });
    }
}