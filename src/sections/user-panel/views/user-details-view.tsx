import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import UserDetailsRow from "../user-details-row";

export default function UserDetailsView() {
    return (
        <Box sx={{
        }}>
            {[...new Array(6)].map(() => (
                <UserDetailsRow />
            ))}
        </Box>
    )
}