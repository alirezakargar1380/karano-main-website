export enum EAdminRole {
    sale = 'sale',
    adminstrator = 'adminstrator', 
    delivery = 'delivery', 
    storage = 'storage', 
    production = 'production', 
}

export interface IAdmin {
    id: number
    fullName: string
    username: string
    password: string
    phone: string
    role: EAdminRole
    createdAt: string
    updatedAt: string
}