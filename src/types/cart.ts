import { IOrderProductPropertyStatus } from "./order-products-property";

export enum ECoverEdgeTape {
    none = '',
    does_not_have = 'does_not_have',
    length_width = 'length_width',
    sides = 'sides'
}

export enum ECoatingTexture {
    none = '',
    right_vein = 'right-vein',
    wavy = 'wavy'
}


export interface ICartItem {
    id?: number
    status?: IOrderProductPropertyStatus;
    profile_type: string;
    final_coating: string;
    frame_type: string;
    coating: string;
    dimensions: string;
    quality: number;
    rejection_reason: string | null;
    inlaid_flower_emty_space: number,
    inlaid_flower: string | boolean,
    cover_edge_tape: ECoverEdgeTape,
    coating_texture: ECoatingTexture,
}