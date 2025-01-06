import { IProductCodes } from "./product";

export interface IRoomDoor {
    id: number;
    name: string;
    is_raised: boolean;
    bottom_of_door: number;
    door_belt: number;
    door_framework: number;
    instrumental_adverb: number;

    door_belt_code: IProductCodes;
    bottom_of_door_code: IProductCodes;
    door_framework_code: IProductCodes;
    instrumental_adverb_code: IProductCodes;

    sealant: number;
}

export interface IRoomDoorDetails {
    id: number;
    room_door_frame: IRoomDoor;
    is_length_fixed: boolean;
    is_width_fixed: boolean;

    width_division: boolean;

    fixed_length: string;
    fixed_width: string;
    length_subtract: string;
    width_subtract: string;

    quantity: number;
}