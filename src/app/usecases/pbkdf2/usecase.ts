import { pbkdf2 } from 'node:crypto';
import { Pbkdf2Usecase, Pbkdf2UsecaseInput, Pbkdf2UsecaseOutput } from 'usecases/pbkdf2';

export class Pbkdf2UseCaseImpl implements Pbkdf2Usecase {
    async execute(input: Pbkdf2UsecaseInput): Promise<Pbkdf2UsecaseOutput> {
        return new Promise((resolve, reject) => {
            pbkdf2(input.secret, input.salt, input.iterations, 512, 'sha512', (error, derivedKey) => {
                if (error) {
                    reject(error);
                }

                resolve({
                    derivedKey: derivedKey.toString('hex'),
                });
            });
        });
    }
}