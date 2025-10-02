export interface BaseModel {
    _id: string;
}

export interface ReceiptModel extends BaseModel {
    amount: number;
}

export type CreateReceiptParams = {
    amount: number;
}