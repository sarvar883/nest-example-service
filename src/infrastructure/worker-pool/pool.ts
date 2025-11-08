import path from 'path';
import { OnModuleInit } from '@nestjs/common';
import { WorkerPoolConfigs } from 'infrastructure/config';
import { QueueFullError } from 'infrastructure/worker-pool';

export interface WorkerPool {
    run(taskId: string): Promise<void>;
    acceptsTasks(): boolean;
}

export class WorkerPoolImpl implements WorkerPool, OnModuleInit {
    private pool;

    constructor(
        private readonly config: WorkerPoolConfigs,
    ) {}

    async onModuleInit(): Promise<void> {
        await this.initialize();
    }

    private async initialize(): Promise<void> {
        const { default: Tinypool } = await import('tinypool');

        this.pool = new Tinypool({
            runtime: 'child_process',
            filename: path.resolve(__dirname, this.config.filename),
            minThreads: this.config.threads,
            maxThreads: this.config.threads,
            idleTimeout: this.config.idleTimeout,
            maxQueue: this.config.maxQueue,
            terminateTimeout: 30 * 1000,
        });
    }

    async run(taskId: string): Promise<void> {
        console.log('[WorkerPool] Running task ', taskId);

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