import { Module } from '@nestjs/common';
import { ConfigModule } from 'di/modules/infrastructure/config-module';
import { Symbols } from 'di/symbols';
import { ConfigSchema, WorkerPoolConfigs } from 'infrastructure/config';
import { WorkerPool, WorkerPoolImpl } from 'infrastructure/worker-pool/pool';

@Module({
    imports: [ConfigModule],
    providers: [
        {
            provide: Symbols.infrastructure.worker.pool,
            useFactory: (cc: ConfigSchema): WorkerPool => {
                const config: WorkerPoolConfigs = {
                    filename: cc.workerPool.filename,
                    threads: cc.workerPool.threads,
                    idleTimeout: cc.workerPool.idleTimeout,
                    maxQueue: cc.workerPool.maxQueue,
                };

                return new WorkerPoolImpl(config);
            },
            inject: [Symbols.infrastructure.config.general],
        },
    ],
    exports: [Symbols.infrastructure.worker.pool],
})
export class WorkerPoolModule {}