import { CreateReceiptParams, ReceiptModel, ReceiptRepository } from 'domain/receipt';

export interface ReceiptService {
    createNew(amount: number): Promise<ReceiptModel>;
    getById(id: string): Promise<ReceiptModel | null>;
}

export class ReceiptServiceImpl implements ReceiptService {
    constructor(
        private readonly repository: ReceiptRepository,
    ) {}

    async createNew(amount: number): Promise<ReceiptModel> {
        const params: CreateReceiptParams = {
            amount,
        };

        return await this.repository.create(params);
    }

    async getById(id: string): Promise<ReceiptModel | null> {
        return await this.repository.getById(id);
    }
}