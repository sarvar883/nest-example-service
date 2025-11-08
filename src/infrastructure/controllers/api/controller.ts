import {
    Controller,
    Inject,
    Post,
    Body,
    HttpCode,
    HttpStatus,
    BadRequestException,
    InternalServerErrorException,
} from '@nestjs/common';
import { Symbols } from 'di/symbols';
import type { ConfigSchema } from 'infrastructure/config';
import type { TaskService } from 'infrastructure/task';
import { TaskModel, TaskType } from 'infrastructure/task';
import type { Pbkdf2Body, Pbkdf2Response } from 'infrastructure/controllers/api';

@Controller('/api')
export class ApiController {
    constructor(
       @Inject(Symbols.infrastructure.config.general) private readonly config: ConfigSchema,
       @Inject(Symbols.infrastructure.task.service) private readonly taskService: TaskService,
    ) {}

    @Post('/pbkdf2')
    @HttpCode(HttpStatus.CREATED)
    async pbkdf2(@Body() body: Pbkdf2Body): Promise<Pbkdf2Response> {
        console.log('/pbkdf2 body =', body);
        this.validatePbkdf2Input(body);

        try {
            const result: TaskModel = await this.taskService.create({
                type: TaskType.Pbkdf2,
                input: body,
            });

            return {
                taskId: result._id,
            };

        } catch (e) {
            console.log('[Controller] pbkdf2 e =', e);
            throw new InternalServerErrorException({ message: 'Unknown Error' });
        }
    }

    private validatePbkdf2Input(body): void | never {
        if (!body) {
            throw new BadRequestException({ message: 'Invalid input data' });
        }

        if (!body.secret || typeof body.secret !== 'string') {
            throw new BadRequestException({ message: 'Secret parameter is invalid' });
        }

        if (!body.salt || typeof body.salt !== 'string') {
            throw new BadRequestException({ message: 'Salt parameter is invalid' });
        }

        if (!body.iterations || typeof body.iterations !== 'number') {
            throw new BadRequestException({ message: 'Iterations parameter is invalid' });
        }
    }
}