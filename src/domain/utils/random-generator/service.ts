import { randomBytes, randomUUID } from 'crypto';

export interface RandomGenerator {
    string(length: number): string;
    uuid(): string;
}

export class RandomGeneratorImpl implements RandomGenerator {
    string(length: number): string {
        // randomBytes генерирует строку длиной в (length * 2) символов
        const randomString: string = randomBytes(length).toString('hex');

        // вернем отрезок нужной длины
        return randomString.slice(0, length);
    }

    uuid(): string {
        return randomUUID();
    }
}