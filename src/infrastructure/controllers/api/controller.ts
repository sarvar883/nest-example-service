import {
    Controller,
    Inject,
    Post,
    Body,
    BadRequestException,
    InternalServerErrorException,
} from '@nestjs/common';
import { Symbols } from 'di/symbols';
import { ConfigSchema } from 'infrastructure/config';
import { ReceiptService, ReceiptModel } from 'domain/receipt';

@Controller('/api')
export class ApiController {
    constructor(
       // @ts-ignore
       @Inject(Symbols.infrastructure.config.general) private readonly config: ConfigSchema,
       // @ts-ignore
       @Inject(Symbols.domain.receipt.service) private readonly receiptService: ReceiptService,
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
            const result: ReceiptModel | null = await this.receiptService.createNew(body.amount);

            if (!result) {
                throw new InternalServerErrorException({ message: 'Cannot create receipt' });
            }

            return {
                success: true,
                data: {
                    id: result._id,
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