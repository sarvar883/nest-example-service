export type Pbkdf2Body = {
    secret: string;
    salt: string;
    iterations: number;
}

export type Pbkdf2Response = {
    taskId: string;
}