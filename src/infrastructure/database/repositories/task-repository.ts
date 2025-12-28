import { Model, SortOrder } from 'mongoose';
import { AnyObject } from 'domain/common';
import {
    TaskRepository,
    TaskModel,
    TaskState,
} from 'infrastructure/task';

export class TaskRepositoryImpl implements TaskRepository {
    constructor(
        private readonly model: Model<TaskModel>,
    ) {}

    async getById(id: string): Promise<TaskModel | null> {
        return this.model.findById(id);
    }

    async create(task: TaskModel): Promise<TaskModel> {
        return this.model.create(task);
    }

    async getNext(states: TaskState[]): Promise<TaskModel | null> {
        const currentDate = new Date();

        const query = {
            state: { $in: states },
            processTime: { $lt: currentDate },
        };

        const update = {
            state: TaskState.Processing,
            $inc: { attempts: 1 },
        };

        return this.model.findOneAndUpdate(query, update);
    }

    async requeue(task: TaskModel, processTime: Date): Promise<void> {
        const update = {
            state: TaskState.Created,
            processTime,
        };

        await this.model.findByIdAndUpdate(task._id, update);
    }

    async getCurrentTasks(states: TaskState[]): Promise<TaskModel[]> {
        const currentDate = new Date();

        const query = {
            state: { $in: states },
            processTime: { $lt: currentDate },
        };

        const sort = {
            createdAt: 'asc' as SortOrder,
        };

        return this.model.find(query).sort(sort);
    }

    async update(taskId: string, update: AnyObject): Promise<void> {
        await this.model.findByIdAndUpdate(taskId, update);
    }
}