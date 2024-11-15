import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import UserDetailsRow from "../user-details-row";
import { useAuthContext } from "src/auth/hooks";
import { IUserTypes } from "src/types/user";
import { toPhoneNumberInputFormat } from "src/utils/change-case";

export default function UserDetailsView() {
    const { user, authenticated } = useAuthContext();
    return (authenticated && user) && (
        <>
            {(user.user_type === IUserTypes.genuine) ? (
                <Box>
                    <UserDetailsRow
                        name="user_type"
                        title="نوع کاربر"
                        value={user.user_type}
                    />
                    <UserDetailsRow
                        name="first_name"
                        title="نام"
                        value={user.first_name}
                    />
                    <UserDetailsRow
                        name="last_name"
                        title="نام خانوادگی"
                        value={user.last_name}
                    />
                    <UserDetailsRow
                        name="id_code"
                        title="کد ملی"
                        value={user.id_code}
                    />
                    <UserDetailsRow
                        name="phone"
                        title="شماره موبایل"
                        value={user.phone}
                        defaultValue={toPhoneNumberInputFormat(user.phone)}
                    />
                    <UserDetailsRow
                        name="landline_number"
                        title="شماره تلفن ثابت"
                        value={user.landline_number}
                    />
                    <UserDetailsRow
                        name="email"
                        title="ایمیل"
                        value={user.email}
                    />
                </Box>
            ) : (
                <Box>
                    <UserDetailsRow
                        name="user_type"
                        title="نوع کاربر"
                        value={user.user_type}
                    />
                    <UserDetailsRow
                        name="company_name"
                        title="نام شرکت"
                        value={user.company_name}
                    />
                    <UserDetailsRow
                        name="national_id"
                        title="کد اقتصادی"
                        value={user.national_id}
                    />
                    <UserDetailsRow
                        name="landline_number"
                        title="شماره تلفن ثابت"
                        value={user.landline_number}
                    />
                    <UserDetailsRow
                        name="phone"
                        title="شماره موبایل"
                        value={user.phone}
                    />
                    <UserDetailsRow
                        name="email"
                        title="ایمیل"
                        value={user.email}
                    />
                </Box>
            )}
        </>
    )
}