import { Schema, SchemaTypes } from 'mongoose';
import { ReceiptModel } from 'domain/receipt';

export const ReceiptSchema = new Schema<ReceiptModel>(
    {
        amount: {
            type: SchemaTypes.Number,
            required: true,
        },
    },
    {
        collection: 'receipts',
        versionKey: false,
    },
);