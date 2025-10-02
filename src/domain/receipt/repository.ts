import { ReceiptModel, CreateReceiptParams } from 'domain/receipt';

export interface ReceiptRepository {
    getById(id: string): Promise<ReceiptModel | null>;
    create(params: CreateReceiptParams): Promise<ReceiptModel>;
}