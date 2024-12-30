import { Box } from "@mui/system";
import UserDetailsRow from "../user-details-row";
import { useAuthContext } from "src/auth/hooks";
import { IUserTypes } from "src/types/user";
import { toPhoneNumberInputFormat } from "src/utils/change-case";
import { useBoolean } from "src/hooks/use-boolean";
import UserEditForm from "../user-edit-form";

export default function UserDetailsView() {
    const { user, authenticated } = useAuthContext();
    const dialog = useBoolean();

    return (authenticated && user) && (
        <Box>
            <UserEditForm dialog={dialog} data={user} isLegal={(user.user_type === IUserTypes.legal)} />
            {(user.user_type === IUserTypes.genuine) ? (
                <Box>
                    <UserDetailsRow
                        name="user_type"
                        title="نوع کاربر"
                        value={user.user_type}
                        dialog={dialog}
                    />
                    <UserDetailsRow
                        name="first_name"
                        title="نام"
                        value={user.first_name}
                        dialog={dialog}
                    />
                    <UserDetailsRow
                        name="last_name"
                        title="نام خانوادگی"
                        value={user.last_name}
                        dialog={dialog}
                    />
                    <UserDetailsRow
                        name="id_code"
                        title="کد ملی"
                        value={user.id_code}
                        dialog={dialog}
                    />
                    <UserDetailsRow
                        name="phone"
                        title="شماره موبایل"
                        value={user.phone}
                        defaultValue={toPhoneNumberInputFormat(user.phone)}
                        dialog={dialog}
                    />
                    <UserDetailsRow
                        name="landline_number"
                        title="شماره تلفن ثابت"
                        value={user.landline_number}
                        dialog={dialog}
                    />
                    <UserDetailsRow
                        name="email"
                        title="ایمیل"
                        value={user.email}
                        dialog={dialog}
                    />
                </Box>
            ) : (
                <Box>
                    <UserDetailsRow
                        name="user_type"
                        title="نوع کاربر"
                        value={user.user_type}
                        dialog={dialog}
                    />
                    <UserDetailsRow
                        name="company_name"
                        title="نام شرکت"
                        value={user.company_name}
                        dialog={dialog}
                    />
                    <UserDetailsRow
                        name="national_id"
                        title="کد اقتصادی"
                        value={user.national_id}
                        dialog={dialog}
                    />
                    <UserDetailsRow
                        name="landline_number"
                        title="شماره تلفن ثابت"
                        value={user.landline_number}
                        dialog={dialog}
                    />
                    <UserDetailsRow
                        name="phone"
                        title="شماره موبایل"
                        value={user.phone}
                        dialog={dialog}
                    />
                    <UserDetailsRow
                        name="email"
                        title="ایمیل"
                        value={user.email}
                        dialog={dialog}
                    />
                </Box>
            )}
        </Box>
    )
}