import { UseCase } from 'domain/common';

export type Pbkdf2UsecaseInput = {
    secret: string;
    salt: string;
    iterations: number;
}

export type Pbkdf2UsecaseOutput = {
    derivedKey: string;
}

export interface Pbkdf2Usecase extends UseCase<Pbkdf2UsecaseInput, Pbkdf2UsecaseOutput> {}