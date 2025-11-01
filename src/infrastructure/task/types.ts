import { BaseModel, AnyObject } from 'domain/common';

export interface TaskModel<T = AnyObject> extends BaseModel {
    state: TaskState;
    data: T;
    createdAt: Date;
    processTime: Date;
    completedAt?: Date;
    lastUpdatedAt?: Date;
    attempts: number;
    error?: AnyObject;
    erroredAt?: Date;
}

export enum TaskState {
    Created = 'created',
    Processing = 'processing',
    QueuedForRetrying = 'queued_for_retrying',
    Completed = 'completed',
    Error = 'error',
}