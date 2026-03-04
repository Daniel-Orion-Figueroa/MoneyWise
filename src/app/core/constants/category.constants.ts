import { Category } from "../interfaces/category.interface";
import { TRANSACTION_TYPES } from "./transaction-type.constants";

export const DEFAULT_CATEGORIES: Category[] = [
    {
        id: '1',
        name: 'Salario',
        type: TRANSACTION_TYPES.INCOME,
        icon: 'cash-outline',
        color: '#2dd36f'
    },
    {
        id: '2',
        name: 'Comida',
        type: TRANSACTION_TYPES.EXPENSE,
        icon: 'restaurant-outline',
        color: '#2dd36f'
    },
    {
        id: '3',
        name: 'Transporte',
        type: TRANSACTION_TYPES.EXPENSE,
        icon: 'bus-outline',
        color: '#2dd36f'
    },
]