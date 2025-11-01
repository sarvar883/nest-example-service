import {
    Controller,
    Inject,
    Post,
    Body,
    BadRequestException,
    InternalServerErrorException,
} from '@nestjs/common';
import { Symbols } from 'di/symbols';
import type { ConfigSchema } from 'infrastructure/config';

@Controller('/api')
export class ApiController {
    constructor(
       @Inject(Symbols.infrastructure.config.general) private readonly config: ConfigSchema,
    ) {}

    @Post('route1')
    async route1(
        @Body() body: { amount: number; }
    ): Promise<any> {
        console.log('route1 body =', body);

        if (!body || !body.amount) {
            throw new BadRequestException({ message: 'Invalid input data' });
        }

        try {
            const result = null;

            if (!result) {
                throw new InternalServerErrorException({ message: 'Cannot create receipt' });
            }

            return {
                success: true,
                data: {
                    id: result,
                },
            };

        } catch (e) {
            if (e instanceof InternalServerErrorException) {
                throw e;
            }

            throw new InternalServerErrorException({ message: 'Unknown Error' });
        }
    }
}