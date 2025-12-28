import { Schema, SchemaTypes } from 'mongoose';
import { TaskModel } from 'infrastructure/task';

export const TaskSchema = new Schema<TaskModel>(
    {
        type: {
            type: SchemaTypes.String,
            required: true,
        },
        state: {
            type: SchemaTypes.String,
            required: true,
        },
        input: {
            type: SchemaTypes.Mixed,
            required: true,
            default: {},
        },
        result: {
            type: SchemaTypes.Map,
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