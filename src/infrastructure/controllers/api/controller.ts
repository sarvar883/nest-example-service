import {
    Controller,
    Inject,
    Get,
    Post,
    Body,
    Query,
    HttpCode,
    HttpStatus,
    BadRequestException,
    NotFoundException,
    InternalServerErrorException,
} from '@nestjs/common';
import { Symbols } from 'di/symbols';
import type { ConfigSchema } from 'infrastructure/config';
import type { TaskService } from 'infrastructure/task';
import { TaskModel, TaskType, TaskState } from 'infrastructure/task';
import type {
    Pbkdf2CreateBody,
    Pbkdf2CreateResponse,
    Pbkdf2CheckBody,
    Pbkdf2CheckResponse,
} from 'infrastructure/controllers/api';

@Controller('/api')
export class ApiController {
    constructor(
        @Inject(Symbols.infrastructure.config.general) private readonly config: ConfigSchema,
        @Inject(Symbols.infrastructure.task.service) private readonly taskService: TaskService,
    ) {}

    @Post('/pbkdf2/create')
    @HttpCode(HttpStatus.CREATED)
    async pbkdf2Create(@Body() body: Pbkdf2CreateBody): Promise<Pbkdf2CreateResponse> {
        console.log('/pbkdf2/create body =', body);
        this.validatePbkdf2CreateInput(body);

        try {
            const result: TaskModel = await this.taskService.create({
                type: TaskType.Pbkdf2,
                input: body,
            });

            return {
                taskId: result._id,
            };

        } catch (e) {
            throw new InternalServerErrorException({ message: 'Unknown Error' });
        }
    }

    private validatePbkdf2CreateInput(body: Pbkdf2CreateBody): void | never {
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

    @Get('/pbkdf2/check')
    @HttpCode(HttpStatus.OK)
    async pbkdf2Check(@Query('taskId') taskId: string): Promise<Pbkdf2CheckResponse> {
        this.validateTaskId(taskId);

        try {
            const task: TaskModel | null = await this.taskService.getById(taskId);

            if (!task) {
                throw new NotFoundException({ message: 'Task not found' });
            }

            if (task.state === TaskState.Completed) {
                return {
                    taskId: taskId,
                    state: 'finished',
                    result: task.result,
                };
            }

            if (task.state === TaskState.Error) {
                return {
                    taskId: taskId,
                    state: 'error',
                };
            }

            return {
                taskId: taskId,
                state: 'in_progress',
            };

        } catch (e) {
            if (e instanceof NotFoundException) {
                throw e;
            }

            throw new InternalServerErrorException({ message: 'Unknown Error' });
        }
    }

    private validateTaskId(taskId: string): void | never {
        if (!taskId) {
            throw new BadRequestException({ message: 'TaskId parameter must be present' });
        }

        if (/^[0-9a-fA-F]{24}$/.test(taskId) === false) {
            throw new BadRequestException({ message: 'TaskId parameter is invalid' });
        }
    }
}