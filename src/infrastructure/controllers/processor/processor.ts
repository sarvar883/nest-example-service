import { OnModuleInit } from '@nestjs/common';

export class Processor implements OnModuleInit {
    async onModuleInit(): Promise<void> {
        console.log('[Processor] onModuleInit');
    }

    private async run(): Promise<void> {

    }
}