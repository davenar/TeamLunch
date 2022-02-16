export interface OrderContract {
    id: number;
    person: string;
    dish: string;
    quantity: number;
}

export interface TotalOrdersContract {
    dish: string;
    quantity: number;
}
