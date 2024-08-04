import { EAdminRole } from "src/types/admin";

export function adminRoleTranslate(role: string) {
    return (role === EAdminRole.adminstrator && "سوپر ادمین") ||
        (role === EAdminRole.delivery && "مدیر ارسال") ||
        (role === EAdminRole.production && "مدیر ارسال") ||
        (role === EAdminRole.sale && "مدیر فروش") ||
        (role === EAdminRole.storage && "مدیر انبار") ||
        ""
}