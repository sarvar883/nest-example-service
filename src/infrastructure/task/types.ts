import { BaseModel, AnyObject } from 'domain/common';

export interface TaskModel<T = AnyObject, K = AnyObject> extends BaseModel {
    type: TaskType;
    state: TaskState;
    input: T;
    result: K;
    createdAt: Date;
    processTime: Date;
    completedAt?: Date;
    lastUpdatedAt?: Date;
    attempts: number;
    error?: AnyObject;
    erroredAt?: Date;
}

export enum TaskType {
    Pbkdf2 = 'pbkdf2',
}

export enum TaskState {
    Created = 'created',
    Processing = 'processing',
    QueuedForRetrying = 'queued_for_retrying',
    Completed = 'completed',
    Error = 'error',
}

export type TaskCreateParams<T = AnyObject> = {
    type: TaskType;
    input: T;
}