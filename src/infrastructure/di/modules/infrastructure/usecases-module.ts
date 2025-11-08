import { Module } from '@nestjs/common';
import { Symbols } from 'di/symbols';

import { Pbkdf2Usecase, Pbkdf2UseCaseImpl } from 'usecases/pbkdf2';

@Module({
    imports: [],
    providers: [
        {
            provide: Symbols.useCases.Pbkdf2,
            useFactory: (): Pbkdf2Usecase => {
                return new Pbkdf2UseCaseImpl();
            },
            inject: [],
        },
    ],
    exports: [Symbols.useCases.Pbkdf2],
})
export class UseCasesModule {}