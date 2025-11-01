import { Injectable } from '@nestjs/common';
import { ConfigService as NestConfigService } from '@nestjs/config';

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

export interface ConfigSchema {
    env: Environment;

    api: ApiConfigs;

    mongodb: DbConnectionCreds;
}

@Injectable()
export class ConfigService implements ConfigSchema {
    constructor(private configService: NestConfigService) {}

    get env(): Environment {
        return this.configService.get<Environment>('ENVIRONMENT') || 'development';
    }

    get api() {
        return {
            host: this.configService.get<string>('API_HOST') || '127.0.0.1',
            port: this.configService.get<number>('API_PORT') || 3000,
        };
    }

    get mongodb() {
        return {
            dbName: this.configService.get<string>('MONGO_DB_NAME') || 'admin',
            dbConnectionString: this.configService.get<string>('MONGO_DB_CONNECTION_STRING') || 'mongodb://localhost:27017',
            dbAuthEnabled: this.configService.get<boolean>('MONGO_DB_AUTH_ENABLED') ?? true,
            dbUsername: this.configService.get<string>('MONGO_DB_USERNAME') || 'admin',
            dbPassword: this.configService.get<string>('MONGO_DB_PASSWORD') || 'password',
            dbAuthSource: this.configService.get<string>('MONGO_DB_AUTH_SOURCE') || 'admin',
        };
    }
}