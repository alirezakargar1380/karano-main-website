import { IOrderProductPropertyStatus } from "./order-products-property";

export interface ICartItem {
    id?: number
    status?: IOrderProductPropertyStatus;
    profile_type: string;
    final_coating: string;
    frame_type: string;
    coating: string;
    dimensions: string;
    quality: number;
}