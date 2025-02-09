import { IOrderProductPropertyStatus } from "./order-products-property";
import { EFrameCore } from "./product";

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
    frame_core: EFrameCore;
    frame_width: string
    has_raised_rim: string | boolean
    raised_rim: string
    rejection_reason: string | null;
    inlaid_flower_emty_space: number,
    inlaid_flower: string | boolean,
    cover_edge_tape: ECoverEdgeTape,
    coating_texture: ECoatingTexture,
}