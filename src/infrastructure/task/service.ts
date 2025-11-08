import { AnyObject } from 'domain/common';
import { DateUtils } from 'domain/utils/date';
import {
    TaskModel,
    TaskState,
    TaskRepository,
    TaskCreateParams,
} from 'infrastructure/task';

export interface TaskService {
    getById(id: string): Promise<TaskModel | null>;
    create(params: TaskCreateParams): Promise<TaskModel>;
    getNext(): Promise<TaskModel | null>;
    markAsComplete(task: TaskModel, result: AnyObject): Promise<void>;
    markForRetry(task: TaskModel): Promise<void>;
    markError(task: TaskModel, error: AnyObject): Promise<void>;
}

export class TaskServiceImpl implements TaskService {
    constructor(
        private readonly dateUtils: DateUtils,
        private readonly repository: TaskRepository,
    ) {}

    async getById(id: string): Promise<TaskModel | null> {
        return this.repository.getById(id);
    }

    async create(params: TaskCreateParams): Promise<TaskModel> {
        const currentDate = new Date();

        const task = {
            type: params.type,
            state: TaskState.Created,
            input: params.input,
            createdAt: currentDate,
            processTime: this.dateUtils.addMsToDate(currentDate, 10 * 1000),
            attempts: 0,
        };

        return this.repository.create(task as TaskModel);
    }

    async getNext(): Promise<TaskModel | null> {
        const states: TaskState[] = [
            TaskState.Created,
            TaskState.QueuedForRetrying,
        ];

        return this.repository.getNext(states);
    }

    async markAsComplete(task: TaskModel, result: AnyObject): Promise<void> {
        const update = {
            state: TaskState.Completed,
            result,
            lastUpdatedAt: new Date(),
            completedAt: new Date(),
        };

        await this.repository.update(task._id, update);
    }

    async markForRetry(task: TaskModel): Promise<void> {
        const update = {
            state: TaskState.QueuedForRetrying,
            processTime: this.dateUtils.addMsToDate(task.processTime, 60 * 1000),
            lastUpdatedAt: new Date(),
        };

        await this.repository.update(task._id, update);
    }

    async markError(task: TaskModel, error: AnyObject): Promise<void> {
        const update = {
            state: TaskState.Error,
            error,
            erroredAt: new Date(),
            lastUpdatedAt: new Date(),
        };

        await this.repository.update(task._id, update);
    }
}