import { Injectable } from '@nestjs/common';
import { ConfigService as NestConfigService } from '@nestjs/config';
import { Milliseconds } from 'domain/common';

export type Environment = 'development' | 'production';

export type ApiConfigs = {
    host: string;
    port: number;
}

export type DbConnectionCreds = {
    dbName: string;
    dbConnectionString: string;
    dbAuthEnabled: boolean;
    dbUsername: string;
    dbPassword: string;
    dbAuthSource: string;
}

export type WorkerPoolConfigs = {
    filename: string;
    minThreads: number;
    maxThreads: number;
    idleTimeout: Milliseconds;
    maxQueue: number;
}

export type ProcessorConfigs = {
    sleepTime: Milliseconds;
}

export type TaskConfigs = {
    debounceAfterCreate: Milliseconds;
    debounceForRetry: Milliseconds;
}

export interface ConfigSchema {
    env: Environment;

    api: ApiConfigs;

    mongodb: DbConnectionCreds;

    workerPool: WorkerPoolConfigs;

    processor: ProcessorConfigs;

    task: TaskConfigs;
}

@Injectable()
export class ConfigService implements ConfigSchema {
    constructor(private configService: NestConfigService) {}

    get env(): Environment {
        return this.configService.get<Environment>('ENVIRONMENT') || 'development';
    }

    get api(): ApiConfigs {
        return {
            host: this.configService.get<string>('API_HOST') || '127.0.0.1',
            port: Number(this.configService.get<number>('API_PORT')) || 3000,
        };
    }

    get mongodb(): DbConnectionCreds {
        let authEnabled: boolean = true;

        if (this.configService.get('MONGO_DB_AUTH_ENABLED') === 'false') {
            authEnabled = false;
        }

        return {
            dbName: this.configService.get<string>('MONGO_DB_NAME') || 'admin',
            dbConnectionString: this.configService.get<string>('MONGO_DB_CONNECTION_STRING') || 'mongodb://localhost:27017',
            dbAuthEnabled: authEnabled,
            dbUsername: this.configService.get<string>('MONGO_DB_USERNAME') || 'admin',
            dbPassword: this.configService.get<string>('MONGO_DB_PASSWORD') || 'password',
            dbAuthSource: this.configService.get<string>('MONGO_DB_AUTH_SOURCE') || 'admin',
        };
    }

    get workerPool(): WorkerPoolConfigs {
        return {
            filename: this.configService.get<string>('WORKER_POOL_FILENAME') || '../../app/services/worker/main.js',
            minThreads: Number(this.configService.get<number>('WORKER_POOL_MIN_THREADS')) || 2,
            maxThreads: Number(this.configService.get<number>('WORKER_POOL_MAX_THREADS')) || 2,
            idleTimeout: Number(this.configService.get<Milliseconds>('WORKER_POOL_IDLE_TIMEOUT')) || 30 * 1000,
            maxQueue: Number(this.configService.get<number>('WORKER_POOL_MAX_QUEUE')) || 10,
        };
    }

    get processor(): ProcessorConfigs {
        return {
            sleepTime: Number(this.configService.get<number>('PROCESSOR_SLEEP_TIME')) || 5 * 1000,
        };
    }

    get task(): TaskConfigs {
        return {
            debounceAfterCreate: Number(this.configService.get<number>('TASK_DEBOUNCE_AFTER_CREATE')) || 10 * 1000,
            debounceForRetry: Number(this.configService.get<number>('TASK_DEBOUNCE_FOR_RETRY')) || 60 * 1000,
        };
    }
}