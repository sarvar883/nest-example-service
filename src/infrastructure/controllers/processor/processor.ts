import { OnModuleInit, Inject } from '@nestjs/common';
import { Symbols } from 'di/symbols';
import { sleep } from 'domain/utils/sleep';
import type { ConfigSchema } from 'infrastructure/config';
import type { WorkerPool } from 'infrastructure/worker-pool';
import { QueueFullError } from 'infrastructure/worker-pool';
import type { TaskModel, TaskService } from 'infrastructure/task';

export class Processor implements OnModuleInit {
    constructor(
        @Inject(Symbols.infrastructure.config.general) private readonly config: ConfigSchema,
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

            this.runNext(task);
        }
        console.log('[Processor] fillPool after while loop');
        await sleep(this.config.processor.sleepTime);

        this.fillPool();
    }

    private runNext(task: TaskModel): void {
        this.workerPool.run(task._id.toString()).catch(async (e) => {
            console.log('[Processor] runNext catch e =', e);
            await this.taskService.requeue(task);
            // if (e instanceof QueueFullError) {
            //
            // }
        });
    }
}