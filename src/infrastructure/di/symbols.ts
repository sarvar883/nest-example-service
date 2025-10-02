import { asUniqueArray, generateSymbols } from 'di/helper';

export const Symbols = generateSymbols({
    domain: {
        utils: asUniqueArray(['randomGenerator'] as const),
        receipt: asUniqueArray(['service', 'repository', 'schema'] as const),
    },
    infrastructure: {
        config: asUniqueArray(['general'] as const),
        db: asUniqueArray(['mongo'] as const),
    },
    useCases: asUniqueArray([

    ] as const),
} as const);