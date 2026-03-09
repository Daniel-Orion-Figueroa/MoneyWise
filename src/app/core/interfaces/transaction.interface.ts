import { TransactionType } from "../constants/transaction-type.constants";

export interface Transaction {
    id: string;
    userId: string;
    type: TransactionType;
    categoryId: string;
    amount: number;
    description: string;
    date: string;
    photoUrl?: string;
    createdAt: string;
    updatedAt?: string;
}
