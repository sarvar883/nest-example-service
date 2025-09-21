export function generateSymbols<T extends Readonly<Pairs>>(pairs: T, suffix = ''): ComplexSymbolListType<T> {
    const symbols = {} as ComplexSymbolListType<T>;
    const entries = Object.entries(pairs) as [keyof T, T[keyof T]][];
    for (const [key, value] of entries) {
        if (isStringArray(value)) {
            symbols[key] = StringToSymbol(value, key as string, suffix) as ComplexSymbolListType<T>[keyof T];
        } else {
            symbols[key] = generateSymbols(value, suffix + '_' + (key as string)) as ComplexSymbolListType<T>[keyof T];
        }
    }
    return symbols;
}

export const asUniqueArray = <
    TypeOfElementOfArray extends Narrowable,
    Array extends [] | (ReadonlyArray<TypeOfElementOfArray> & AsUniqueArray<Array>)
>(
    a: Array
): Array => a;

function isStringArray(value: any): value is ReadonlyArray<string> {
    return Array.isArray(value);
}

function StringToSymbol<ARRAY extends ReadonlyArray<string>>(
    array: ARRAY,
    prefix: string,
    suffix = ''
): SymbolsListType<ARRAY> {
    return array.reduce((obj: SymbolsListType<ARRAY>, value: ARRAY[number]) => {
        obj[value] = Symbol.for(`${prefix}_${suffix}_${value}`);
        return obj;
    }, {} as SymbolsListType<ARRAY>);
}

type AsUniqueArray<Array extends ReadonlyArray<any>> = {
    [Index in keyof Array]: unknown extends {
            [PossiblySameIndex in keyof Array]: PossiblySameIndex extends Index
                ? never
                : Array[PossiblySameIndex] extends Array[Index]
                    ? unknown
                    : never;
        }[number]
        ? Invalid<[Array[Index], 'is repeated']>
        : Array[Index];
}

type Invalid<T> = Error & { __errorMessage: T };

type Narrowable = string | number | boolean | object | null | undefined | symbol;

export type ComplexSymbolListType<T extends Readonly<Pairs>> = {
    [symbolName in keyof T]: T[symbolName] extends ReadonlyArray<string>
        ? SymbolsListType<T[symbolName]>
        : ComplexSymbolListType<T[symbolName] & Readonly<Pairs>>;
}

type SymbolsListType<T extends readonly string[]> = {
    [symbolName in T[number]]: symbol;
}

type Pairs = { [name: Readonly<string>]: ReadonlyArray<string> | Pairs }