import { Stack, Typography } from "@mui/material";
import { Box, SxProps } from "@mui/system";
import SvgColor from "../svg-color";
import { useState } from "react";

interface Props {
    children?: React.ReactNode;
    sx: SxProps;
    title?: string
}

export default function YellowNotification({ children, title, sx }: Props) {
    const [show, setShow] = useState<boolean>(true)
    return show && (
        <Box sx={{ width: '100%', height: '100%', backgroundColor: '#FFF6DD', border: '1px solid #795105', borderRadius: '8px', py: 2, px: 2, ...sx }}>
            <Stack direction={'row'} justifyContent={'space-between'}>
                <Stack direction={'row'} spacing={'12px'}>
                    <Box>
                        <SvgColor src="/assets/icons/notification/alert-circle.svg" color={'#795105'} />
                    </Box>
                    <Box>
                        <Typography variant="title3" fontFamily={'peyda-bold'} display={'block'} width={1}>{title}</Typography>
                        <Typography variant="body4" sx={{ pt: '4px', color: '#2B2B2B', mt: '4px' }}>{children}</Typography>
                    </Box>
                </Stack>
                <Box>
                    <SvgColor src="/assets/icons/notification/x-close.svg" sx={{
                        cursor: 'pointer'
                    }} color={'#795105'} onClick={() => setShow(false)} />
                </Box>
            </Stack>

        </Box>
    )
}