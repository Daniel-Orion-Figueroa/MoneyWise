import { TransactionType } from "../constants/transaction-type.constants";

export interface Category {
    id: string;
    name: string;
    type: TransactionType;// ingreso o gasto
    icon: string;
    color: string; // hexadecimal
}
