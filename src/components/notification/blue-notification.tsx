import { Stack, Typography } from "@mui/material";
import { Box, SxProps } from "@mui/system";
import SvgColor from "../svg-color";
import { useState } from "react";

interface Props {
    children?: React.ReactNode;
    title?: string
    sx?: SxProps;
}

export default function BlueNotification({ children, title, sx }: Props) {
    const [show, setShow] = useState<boolean>(true)
    return show && (
        <Box sx={{ width: '100%', height: '100%', backgroundColor: '#DCF9FF', border: '1px solid #0B7BA7', borderRadius: '8px', py: 2, px: 2, ...sx }}>
            <Stack direction={'row'} justifyContent={'space-between'}>
                {title && (
                    <Stack direction={'row'} spacing={2}>
                        <SvgColor src="/assets/icons/notification/alert-circle.svg" color={'#0B7BA7'} />
                        <Typography variant="h6" fontFamily={'peyda-bold'}>{title}</Typography>
                    </Stack>
                )}

                {!title && (
                    <Stack direction={'row'} spacing={2}>
                        <SvgColor src="/assets/icons/notification/alert-circle.svg" color={'#0B7BA7'} />
                        <Typography variant="h6">{children}</Typography>
                    </Stack>
                )}

                <SvgColor src="/assets/icons/notification/x-close.svg" sx={{
                    cursor: 'pointer'
                }} color={'#0B7BA7'} onClick={() => setShow(false)} />
            </Stack>
            {title && (
                <Typography variant="h6" sx={{ pl: 5, pt: 2 }}>{children}</Typography>
            )}
        </Box>
    )
}