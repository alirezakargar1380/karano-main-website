import { Box, IconButton, Stack, Typography } from "@mui/material";
import SvgColor from "src/components/svg-color";

export default function UserDetailsRow() {
    return (
        <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={1} sx={{
            borderBottom: (theme) => `1px solid ${theme.palette.divider}`
        }}>
            <Box display={'flex'} sx={{ py: 3 }}>
                <Typography variant="subtitle1">نوع کاربر:</Typography>
                <Typography variant="subtitle1" sx={{ fontFamily: 'peyda-bold', pl: 0.5 }}>حقیقی</Typography>
            </Box>
            <IconButton>
                <SvgColor src="/assets/icons/user-panel/edit-02.svg" color={'#727272'} sx={{ width: 16, height: 16 }} />
            </IconButton>
        </Stack>
    )
}