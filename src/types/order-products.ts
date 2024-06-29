import { IProductItem, IProductProperties } from "./product"

export enum IOrderProductStatus {
    normal = 'normal',
    cancelled = 'cancelled',
    more_time = 'more_time',
    deleted = 'deleted',
}

export interface IOrderProductItem {
    id: number
    status: IOrderProductStatus
    need_to_assemble: boolean
    product: IProductItem
    properties: IProductProperties[]
}