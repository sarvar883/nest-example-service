import { Module } from '@nestjs/common';
import { Symbols } from 'di/symbols';
import { DateUtils, DateUtilsImpl } from 'domain/utils/date';

@Module({
    providers: [
        {
            provide: Symbols.domain.utils.dateUtils,
            useFactory: (): DateUtils => {
                return new DateUtilsImpl();
            },
            inject: [],
        },
    ],
    exports: [Symbols.domain.utils.dateUtils],
})
export class DateUtilsModule {}