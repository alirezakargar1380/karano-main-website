import { Stack, Typography } from "@mui/material";
import { Box, SxProps } from "@mui/system";
import SvgColor from "../svg-color";
import { useState } from "react";

interface Props {
    children?: React.ReactNode;
    sx?: SxProps;
}

export default function GrayNotification({ children, sx }: Props) {
    return (
        <Box sx={{ width: '100%', height: '100%', backgroundColor: '#F2F2F2', border: '1px solid #A9A9A9', borderRadius: '8px', py: 2, px: 2, ...sx }}>
            <Stack direction={'row'} justifyContent={'space-between'}>
                <SvgColor src="/assets/icons/notification/alert-circle.svg" color={'#A9A9A9'} />
                <Typography variant="h6" sx={{ pl: 1 }}>{children}</Typography>
            </Stack>
        </Box>
    )
}