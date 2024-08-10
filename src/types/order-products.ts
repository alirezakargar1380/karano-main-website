import { IOrderItem } from "./order"
import { IProductItem, IProductProperties } from "./product"

export enum IOrderProductStatus {
    preparing = 'preparing',
    ready = 'ready',
}

export interface IOrderProductItem {
    id: number
    status: IOrderProductStatus
    need_to_assemble: boolean
    product: IProductItem
    order: IOrderItem
    properties: IProductProperties[]
}