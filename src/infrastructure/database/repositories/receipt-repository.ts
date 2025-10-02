import { Model } from 'mongoose';
import {
    ReceiptRepository,
    ReceiptModel,
    CreateReceiptParams,
} from 'domain/receipt';

export class ReceiptRepositoryImpl implements ReceiptRepository {
    constructor(
        private readonly model: Model<ReceiptModel>,
    ) {}

    async getById(id: string): Promise<ReceiptModel | null> {
        return this.model.findById(id);
    }

    async create(params: CreateReceiptParams): Promise<ReceiptModel> {
        return this.model.create(params);
    }
}