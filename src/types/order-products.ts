import { IProductItem, IProductProperties } from "./product"

export interface IOrderProductItem {
    id: number
    need_to_assemble: boolean
    product: IProductItem
    properties: IProductProperties[]
}