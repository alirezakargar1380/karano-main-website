import { Box, Stack, Typography } from "@mui/material";
import Image from "src/components/image";
import { StyledRoundedWhiteButton } from "src/components/styles/props/rounded-white-button";

export default function UserAddressView() {
    return (
        <Box sx={{
            border: (theme) => `1px solid #A9A9A9`,
            borderRadius: '16px',
        }}>
            <Stack direction="row" justifyContent="space-between" spacing={1} sx={{
                mx: 2,
                my: 2,
                borderBottom: (theme) => `1px solid ${theme.palette.divider}`
            }}>
                <Typography variant="subtitle1" sx={{ fontFamily: 'peyda-bold' }}>
                    آدرس های ثبت شده
                </Typography>
                <StyledRoundedWhiteButton variant="outlined" sx={{ mb: 1, color: 'blue' }}>
                    آدرس جدید
                </StyledRoundedWhiteButton>
            </Stack>
            <Box sx={{textAlign: 'center' }}>
                <Image src="/assets/images/user-panel/Empty-State-address.png" />
            </Box>
        </Box>
    )
}