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

export function createConfig(): ConfigSchema {
    return {
        env: (process.env.ENVIRONMENT as Environment) || 'development',

        api: {
            host: process.env.API_HOST || '127.0.0.1',
            port: Number(process.env.API_PORT) || 3000,
        },

        mongodb: {
            dbName: process.env.MONGO_DB_NAME || 'admin',
            dbConnectionString: process.env.MONGO_DB_CONNECTION_STRING || 'mongodb://localhost:27017',
            dbAuthEnabled: Boolean(process.env.MONGO_DB_AUTH_ENABLED) || true,
            dbUsername: process.env.MONGO_DB_USERNAME || 'admin',
            dbPassword: process.env.MONGO_DB_PASSWORD || 'password',
            dbAuthSource: process.env.MONGO_DB_AUTH_SOURCE || 'admin',
        },
    };
}