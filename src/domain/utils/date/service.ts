import { Milliseconds, Timestamp } from 'domain/common';

export interface DateUtils {
    addMsToDate(date: Date, ms: Milliseconds): Date;
}

export class DateUtilsImpl implements DateUtils {
    // добавить миллисекунды к Дате и вернуть новую дату
    addMsToDate(date: Date, ms: Milliseconds): Date {
        const timeStamp: Timestamp = new Date(date).getTime();

        return new Date(timeStamp + ms);
    }
}