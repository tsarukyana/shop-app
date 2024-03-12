export interface IUser {
    id: number;
    name: string;
    phone_number: string;
}

export interface IProduct {
    id: number;
    name: string;
    price: number;
}

export interface IOrderItem {
    id: number;
    name: string;
    price: number;
    quantity: number;
    notes?: string;
}

export interface IOrder {
    id: number;
    name: string;
    total: number;
    user: IUser;
    items: IOrderItem[];
    created_at: string;
}

export interface IBasketItem {
    id: number;
    name: string;
    price: number;
    quantity: number;
}

export type PageProps<T extends Record<string, unknown> = Record<string, unknown>> = T & {
    auth: {
        user: IUser;
    };
};
