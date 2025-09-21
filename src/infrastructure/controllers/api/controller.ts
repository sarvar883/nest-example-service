import { Controller, Inject, Post } from '@nestjs/common';
import { Symbols } from 'di/symbols';
import { ConfigSchema } from 'infrastructure/config';

@Controller('/api')
export class ApiController {
    constructor(
       @Inject(Symbols.infrastructure.config.general) private readonly config: any,
    ) {}

    @Post('route1')
    async route1(): Promise<any> {
        console.log('route1 this.config', this.config);
        return {
            success: true,
        };
    }
}