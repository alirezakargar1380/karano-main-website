import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import UserDetailsRow from "../user-details-row";
import { useAuthContext } from "src/auth/hooks";

export default function UserDetailsView() {
    const { user, authenticated } = useAuthContext();
    console.log(user);
    return (authenticated && user) && (
        <Box sx={{
        }}>
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
            />
            <UserDetailsRow
                name="email"
                title="ایمیل"
                value={user.email}
            />
        </Box>
    )
}