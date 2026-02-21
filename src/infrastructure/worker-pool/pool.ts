import path from 'path';
import { OnModuleInit } from '@nestjs/common';
import Piscina from 'piscina';
import { WorkerPoolConfigs } from 'infrastructure/config';
import { QueueFullError } from 'infrastructure/worker-pool';

export interface WorkerPool {
    run(taskId: string): Promise<void>;
    acceptsTasks(): boolean;
}

export class WorkerPoolImpl implements WorkerPool, OnModuleInit {
    private pool: Piscina;

    constructor(
        private readonly config: WorkerPoolConfigs,
    ) {}

    async onModuleInit(): Promise<void> {
        await this.initialize();
    }

    private async initialize(): Promise<void> {
        this.pool = new Piscina({
            filename: path.resolve(__dirname, this.config.filename),
            minThreads: this.config.minThreads,
            maxThreads: this.config.maxThreads,
            maxQueue: this.config.maxQueue,
        });
    }

    async run(taskId: string): Promise<void> {
        console.log('[WorkerPool] Running taskId =', taskId);

        console.log('Threads: ', this.pool.threads.length);
        console.log('queueSize: ', this.pool.queueSize);
        console.log('queueLimit: ', this.pool.options.maxQueue);

        if (this.acceptsTasks()) {
            return this.pool.run(taskId);
        }

        throw new QueueFullError();
    }

    acceptsTasks(): boolean {
        return this.pool.queueSize === 0 || this.pool.queueSize < this.pool.options.maxQueue;
    }
}