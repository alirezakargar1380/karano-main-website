import { CoatingType, ECoatingTexture, ECoverEdgeTape, IProductCodes, IProductCoverType, IProductFrameType, IProductProfileType } from "./product";

export interface IPriceList {
    id: number;
    code: IProductCodes;
    cover_type: IProductCoverType;
    profile_type: IProductProfileType;
    frame_type: IProductFrameType;
    coating_type: CoatingType;
    coating_texture: ECoatingTexture;
    price: number;
}