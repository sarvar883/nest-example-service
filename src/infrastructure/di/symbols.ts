import { asUniqueArray, generateSymbols } from 'di/helper';

export const Symbols = generateSymbols({
    domain: {
        utils: asUniqueArray(['randomGenerator', 'dateUtils'] as const),
    },
    infrastructure: {
        config: asUniqueArray(['general'] as const),
        db: asUniqueArray(['mongo'] as const),
        task: asUniqueArray(['service', 'repository', 'schema'] as const),
        taskProcessor: asUniqueArray(['service'] as const),
        worker: asUniqueArray(['pool'] as const),
    },
    useCases: asUniqueArray([
        'Pbkdf2',
    ] as const),
} as const);