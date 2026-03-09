import { Category } from "../interfaces/category.interface";
import { TRANSACTION_TYPES } from "./transaction-type.constants";

export const DEFAULT_CATEGORIES: Category[] = [
    // INGRESOS
    {
        id: '1',
        name: 'Salario',
        type: TRANSACTION_TYPES.INCOME,
        icon: 'cash-outline',
        color: '#2dd36f'
    },
    {
        id: '3',
        name: 'Inversiones',
        type: TRANSACTION_TYPES.INCOME,
        icon: 'trending-up-outline',
        color: '#2dd36f'
    },
    {
        id: '4',
        name: 'Ventas',
        type: TRANSACTION_TYPES.INCOME,
        icon: 'cart-outline',
        color: '#2dd36f'
    },
    {
        id: '5',
        name: 'Regalo',
        type: TRANSACTION_TYPES.INCOME,
        icon: 'gift-outline',
        color: '#2dd36f'
    },
    {
        id: '6',
        name: 'Otros Ingresos',
        type: TRANSACTION_TYPES.INCOME,
        icon: 'add-circle-outline',
        color: '#2dd36f'
    },

    // GASTOS - NECESIDADES BÁSICAS
    {
        id: '7',
        name: 'Comida',
        type: TRANSACTION_TYPES.EXPENSE,
        icon: 'restaurant-outline',
        color: '#eb445a'
    },
    {
        id: '8',
        name: 'Supermercado',
        type: TRANSACTION_TYPES.EXPENSE,
        icon: 'storefront-outline',
        color: '#eb445a'
    },
    {
        id: '9',
        name: 'Transporte',
        type: TRANSACTION_TYPES.EXPENSE,
        icon: 'bus-outline',
        color: '#eb445a'
    },
    {
        id: '10',
        name: 'Gasolina',
        type: TRANSACTION_TYPES.EXPENSE,
        icon: 'local-gas-station-outline',
        color: '#eb445a'
    },
    {
        id: '11',
        name: 'Vivienda',
        type: TRANSACTION_TYPES.EXPENSE,
        icon: 'home-outline',
        color: '#eb445a'
    },
    {
        id: '12',
        name: 'Alquiler',
        type: TRANSACTION_TYPES.EXPENSE,
        icon: 'key-outline',
        color: '#eb445a'
    },
    {
        id: '13',
        name: 'Servicios Públicos',
        type: TRANSACTION_TYPES.EXPENSE,
        icon: 'flash-outline',
        color: '#eb445a'
    },
    {
        id: '15',
        name: 'Internet',
        type: TRANSACTION_TYPES.EXPENSE,
        icon: 'wifi-outline',
        color: '#eb445a'
    },
    {
        id: '16',
        name: 'Teléfono',
        type: TRANSACTION_TYPES.EXPENSE,
        icon: 'call-outline',
        color: '#eb445a'
    },

    // GASTOS - ENTRETENIMIENTO
    {
        id: '17',
        name: 'Entretenimiento',
        type: TRANSACTION_TYPES.EXPENSE,
        icon: 'game-controller-outline',
        color: '#eb445a'
    },
    {
        id: '18',
        name: 'Cine',
        type: TRANSACTION_TYPES.EXPENSE,
        icon: 'film-outline',
        color: '#eb445a'
    },
    {
        id: '19',
        name: 'Conciertos',
        type: TRANSACTION_TYPES.EXPENSE,
        icon: 'musical-notes-outline',
        color: '#eb445a'
    },
    {
        id: '20',
        name: 'Deportes',
        type: TRANSACTION_TYPES.EXPENSE,
        icon: 'football-outline',
        color: '#eb445a'
    },
    {
        id: '21',
        name: 'Gimnasio',
        type: TRANSACTION_TYPES.EXPENSE,
        icon: 'fitness-outline',
        color: '#eb445a'
    },

    // GASTOS - COMPRAS
    {
        id: '22',
        name: 'Ropa',
        type: TRANSACTION_TYPES.EXPENSE,
        icon: 'shirt-outline',
        color: '#eb445a'
    },
    {
        id: '23',
        name: 'Calzado',
        type: TRANSACTION_TYPES.EXPENSE,
        icon: 'walk-outline',
        color: '#eb445a'
    },
    {
        id: '24',
        name: 'Electrónicos',
        type: TRANSACTION_TYPES.EXPENSE,
        icon: 'phone-portrait-outline',
        color: '#eb445a'
    },
    {
        id: '25',
        name: 'Hogar',
        type: TRANSACTION_TYPES.EXPENSE,
        icon: 'bed-outline',
        color: '#eb445a'
    },

    // GASTOS - SALUD
    {
        id: '26',
        name: 'Salud',
        type: TRANSACTION_TYPES.EXPENSE,
        icon: 'medkit-outline',
        color: '#eb445a'
    },
    {
        id: '27',
        name: 'Medicamentos',
        type: TRANSACTION_TYPES.EXPENSE,
        icon: 'capsule-outline',
        color: '#eb445a'
    },
    {
        id: '28',
        name: 'Doctor',
        type: TRANSACTION_TYPES.EXPENSE,
        icon: 'person-outline',
        color: '#eb445a'
    },

    // GASTOS - EDUCACIÓN
    {
        id: '30',
        name: 'Educación',
        type: TRANSACTION_TYPES.EXPENSE,
        icon: 'school-outline',
        color: '#eb445a'
    },
    {
        id: '31',
        name: 'Cursos',
        type: TRANSACTION_TYPES.EXPENSE,
        icon: 'book-outline',
        color: '#eb445a'
    },
    {
        id: '32',
        name: 'Libros',
        type: TRANSACTION_TYPES.EXPENSE,
        icon: 'library-outline',
        color: '#eb445a'
    },

    // GASTOS - VIAJES
    {
        id: '33',
        name: 'Viajes',
        type: TRANSACTION_TYPES.EXPENSE,
        icon: 'airplane-outline',
        color: '#eb445a'
    },
    {
        id: '34',
        name: 'Hotel',
        type: TRANSACTION_TYPES.EXPENSE,
        icon: 'business-outline',
        color: '#eb445a'
    },
    {
        id: '35',
        name: 'Restaurante',
        type: TRANSACTION_TYPES.EXPENSE,
        icon: 'pizza-outline',
        color: '#eb445a'
    },

    // GASTOS - OTROS
    {
        id: '36',
        name: 'Impuestos',
        type: TRANSACTION_TYPES.EXPENSE,
        icon: 'receipt-outline',
        color: '#eb445a'
    },
    {
        id: '37',
        name: 'Seguros',
        type: TRANSACTION_TYPES.EXPENSE,
        icon: 'shield-checkmark-outline',
        color: '#eb445a'
    },
    {
        id: '38',
        name: 'Donaciones',
        type: TRANSACTION_TYPES.EXPENSE,
        icon: 'heart-outline',
        color: '#eb445a'
    },
    {
        id: '39',
        name: 'Mascotas',
        type: TRANSACTION_TYPES.EXPENSE,
        icon: 'paw-outline',
        color: '#eb445a'
    },
    {
        id: '40',
        name: 'Otros Gastos',
        type: TRANSACTION_TYPES.EXPENSE,
        icon: 'remove-circle-outline',
        color: '#eb445a'
    }
]