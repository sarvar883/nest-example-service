import { TaskModel, TaskState } from 'infrastructure/task';
import { AnyObject } from 'domain/common';

export interface TaskRepository {
    getById(id: string): Promise<TaskModel | null>;
    create(task: TaskModel): Promise<TaskModel>;
    getNext(states: TaskState[]): Promise<TaskModel | null>;
    requeue(task: TaskModel, processTime: Date): Promise<void>;
    update(taskId: string, update: AnyObject): Promise<void>;
}