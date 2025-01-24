import { IProductItem } from "./product";

export enum EIdeaSections {
    left = 'left',
    right = 'right',
    centerTop = 'center-top',
    centerBottom = 'center-bottom',
}

export interface IdeaImages {
    id: number;
    image_name: string;
    location: EIdeaSections;
}

export interface IdeaPoints {
    id: number;
    margin_top: number;
    margin_right: number;
    product: IProductItem;
    location: EIdeaSections;
}

export interface Idea {
    id: number;
    margin_top: number;
    margin_right: number;
    product: IProductItem;
    location: EIdeaSections;
}