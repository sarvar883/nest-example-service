import { asUniqueArray, generateSymbols } from 'di/helper';

export const Symbols = generateSymbols({
    domain: {
        utils: asUniqueArray(['randomGenerator'] as const),
    },
    infrastructure: {
        config: asUniqueArray(['general'] as const),
        db: asUniqueArray(['mongo'] as const),
        task: asUniqueArray(['service', 'repository', 'schema'] as const),
    },
    useCases: asUniqueArray([

    ] as const),
} as const);