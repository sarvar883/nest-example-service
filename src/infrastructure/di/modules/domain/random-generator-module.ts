import { Module } from '@nestjs/common';
import { Symbols } from 'di/symbols';
import { RandomGenerator, RandomGeneratorImpl } from 'domain/utils/random-generator';

@Module({
    providers: [
        {
            provide: Symbols.domain.utils.randomGenerator,
            useFactory: (): RandomGenerator => {
                return new RandomGeneratorImpl();
            },
            inject: [],
        },
    ],
    exports: [Symbols.domain.utils.randomGenerator],
})
export class RandomGeneratorModule {}