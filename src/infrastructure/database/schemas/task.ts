import { Schema, SchemaTypes } from 'mongoose';
import { TaskModel } from 'infrastructure/task';

export const TaskSchema = new Schema<TaskModel>(
    {
        state: {
            type: SchemaTypes.String,
            required: true,
        },
        data: {
            type: SchemaTypes.Map,
            required: true,
            default: {},
        },
        createdAt: {
            type: SchemaTypes.Date,
            required: true,
        },
        processTime: {
            type: SchemaTypes.Date,
            required: true,
        },
        completedAt: {
            type: SchemaTypes.Date,
            default: null,
        },
        lastUpdatedAt: {
            type: SchemaTypes.Date,
            default: null,
        },
        attempts: {
            type: SchemaTypes.Number,
            required: true,
            default: 0,
        },
        error: {
            type: SchemaTypes.Map,
            default: null,
        },
        erroredAt: {
            type: SchemaTypes.Date,
            default: null,
        },
    },
    {
        collection: 'tasks',
        versionKey: false,
    },
);