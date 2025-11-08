import { AnyObject } from 'domain/common';

export type Pbkdf2CreateBody = {
    secret: string;
    salt: string;
    iterations: number;
}

export type Pbkdf2CreateResponse = {
    taskId: string;
}

export type Pbkdf2CheckBody = {
    taskId: string;
}

export type Pbkdf2CheckResponse = {
    taskId: string;
    state: 'in_progress' | 'finished' | 'error';
    result?: AnyObject;
}