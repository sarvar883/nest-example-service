export type Environment = 'development' | 'production';

export type ApiConfigs = {
    host: string;
    port: number;
}

export interface ConfigSchema {
    env: Environment;

    api: ApiConfigs;
}

export function createConfig(): ConfigSchema {
    return {
        env: (process.env.ENVIRONMENT as Environment) || 'development',

        api: {
            host: process.env.API_HOST || '127.0.0.1',
            port: Number(process.env.API_PORT) || 3000,
        },
    };
}