import { ICategory } from "./category";

export interface ISettings {
    meta_title: string;
    meta_description: string;
    meta_tags: string;
    most_sale_category: ICategory;
}