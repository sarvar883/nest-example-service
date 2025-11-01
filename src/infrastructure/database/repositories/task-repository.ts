import { Model, SortOrder } from 'mongoose';
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

    async getByStates(states: TaskState[]): Promise<TaskModel[]> {
        const query = {
            state: { $in: states },
        };

        return this.model.find(query);
    }

    async getCurrentTasks(states: TaskState[]): Promise<TaskModel[]> {
        const currentDate = new Date();

        const query = {
            state: { $in: states },
            processTime: { $lt: currentDate },
        };

        const sort = {
            createdAt: 1 as SortOrder,
        };

        return this.model.find(query).sort(sort);
    }
}