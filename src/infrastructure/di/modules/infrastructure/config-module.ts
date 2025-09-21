import { Module } from '@nestjs/common';
import { Symbols } from 'di/symbols';
import { createConfig, ConfigSchema } from 'infrastructure/config';

@Module({
    providers: [
        {
            provide: Symbols.infrastructure.config.general,
            useFactory: (): ConfigSchema => {
                return createConfig();
            },
            inject: [],
        },
    ],
    exports: [Symbols.infrastructure.config.general],
})
export class ConfigModule {}