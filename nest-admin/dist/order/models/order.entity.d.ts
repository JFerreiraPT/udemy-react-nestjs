import { OrderItem } from './order-item';
export declare class Order {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    created_at: string;
    updated_at: string;
    order_items: OrderItem[];
    get name(): string;
    get total(): number;
}
