import { asUniqueArray, generateSymbols } from 'di/helper';

export const Symbols = generateSymbols({
    domain: {
        utils: asUniqueArray(['randomGenerator'] as const),
    },
    infrastructure: {

    },
    useCases: asUniqueArray([

    ] as const),
} as const);