import { Milliseconds } from 'domain/common';

export async function sleep(ms: Milliseconds) {
    return new Promise(resolve => setTimeout(resolve, ms));
}