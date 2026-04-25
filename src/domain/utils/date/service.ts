import { Milliseconds, Timestamp } from 'domain/common';

export interface DateUtils {
    addMsToDate(date: Date, ms: Milliseconds): Date;
}

export class DateUtilsImpl implements DateUtils {
    // add milliseconds to the Date and return a new Date
    addMsToDate(date: Date, ms: Milliseconds): Date {
        const timeStamp: Timestamp = new Date(date).getTime();

        return new Date(timeStamp + ms);
    }
}