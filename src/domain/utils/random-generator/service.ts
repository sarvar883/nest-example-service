import { randomBytes, randomUUID } from 'crypto';

export interface RandomGenerator {
    string(length: number): string;
    uuid(): string;
}

export class RandomGeneratorImpl implements RandomGenerator {
    string(length: number): string {
        // randomBytes generates a string with (length * 2) symbols
        const randomString: string = randomBytes(length).toString('hex');

        // return a string with the required length
        return randomString.slice(0, length);
    }

    uuid(): string {
        return randomUUID();
    }
}