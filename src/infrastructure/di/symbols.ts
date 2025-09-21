import { asUniqueArray, generateSymbols } from 'di/helper';

export const Symbols = generateSymbols({
    domain: {
        utils: asUniqueArray(['randomGenerator'] as const),
    },
    infrastructure: {
        config: asUniqueArray(['general'] as const),
    },
    useCases: asUniqueArray([

    ] as const),
} as const);