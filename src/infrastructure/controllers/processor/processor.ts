import { OnModuleInit, Inject } from '@nestjs/common';
import { Symbols } from 'di/symbols';
import { sleep } from 'domain/utils/sleep';
import type { ConfigSchema } from 'infrastructure/config';
import type { WorkerPool } from 'infrastructure/worker-pool';
import type { TaskModel, TaskService } from 'infrastructure/task';

export class Processor implements OnModuleInit {
    constructor(
        @Inject(Symbols.infrastructure.config.general) private readonly config: ConfigSchema,
        @Inject(Symbols.infrastructure.worker.pool) private readonly workerPool: WorkerPool,
        @Inject(Symbols.infrastructure.task.service) private readonly taskService: TaskService,
    ) {}

    async onModuleInit(): Promise<void> {
        this.fillPool();
    }

    private async fillPool(): Promise<void> {
        while (this.workerPool.acceptsTasks()) {
            const task: TaskModel | null = await this.taskService.getNext();

            if (!task) {
                break;
            }

            this.runNext(task);
        }

        await sleep(this.config.processor.sleepTime);

        this.fillPool();
    }

    private runNext(task: TaskModel): void {
        this.workerPool.run(task._id.toString()).catch(async (e) => {
            await this.taskService.requeue(task);
        });
    }
}