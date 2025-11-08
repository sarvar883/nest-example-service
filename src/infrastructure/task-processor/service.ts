import { AnyObject } from 'domain/common';
import { UseCase } from 'domain/common';
import { Pbkdf2Usecase } from 'usecases/pbkdf2';
import { TaskModel, TaskType, TaskService } from 'infrastructure/task';
import { TaskNotFound, UseCaseNotFound } from 'infrastructure/task-processor';

export interface TaskProcessor {
    run(taskId: string): Promise<void>;
}

export class TaskProcessorImpl implements TaskProcessor {
    private readonly map: Record<TaskType, UseCase<unknown, AnyObject>>;

    constructor(
        private readonly taskService: TaskService,
        private readonly pbkdf2: Pbkdf2Usecase,
    ) {
        this.map = {
            [TaskType.Pbkdf2]: pbkdf2,
        };
    }

    async run(taskId: string): Promise<void> {
        const task: TaskModel | null = await this.taskService.getById(taskId);

        if (!task) {
            throw new TaskNotFound();
        }

        try {
            const useCaseResponse = await this.forwardToUseCase(task);

            await this.taskService.markAsComplete(task, useCaseResponse);
        } catch (e) {
            if (e instanceof UseCaseNotFound) {
                await this.taskService.markError(task, { message: e?.constructor?.name });
                return;
            }

            await this.taskService.markForRetry(task);
        }
    }

    private async forwardToUseCase(task: TaskModel) {
        const useCase = this.map[task.type];

        if (!useCase) {
            throw new UseCaseNotFound();
        }

        return useCase.execute(task.input);
    }
}