import { Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';
import { Symbols } from 'di/symbols';
import { ConfigService, ConfigSchema } from 'infrastructure/config';

@Module({
    imports: [
        NestConfigModule.forRoot({ envFilePath: '.env' }),
    ],
    providers: [
        {
            provide: Symbols.infrastructure.config.general,
            useClass: ConfigService,
        },
        // {
        //     provide: Symbols.infrastructure.config.general,
        //     useFactory: (): ConfigSchema => {
        //         return createConfig();
        //     },
        //     inject: [],
        // },
    ],
    exports: [Symbols.infrastructure.config.general],
})
export class ConfigModule {}