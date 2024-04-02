import { Box, Radio, Stack, Typography } from "@mui/material";
import { useCallback, useState } from "react";
import SvgColor from "src/components/svg-color";


export default function HowToSendDialogOption({ children }: { children: React.ReactNode, icon?: string }) {
    const [clicked, setClicked] = useState(false);

    const handleOptionClick = useCallback(() => {
        setClicked(!clicked);
    }, [setClicked, clicked])

    return (
        <Stack direction="row" spacing={2} sx={{ pt: 2 }}>
            <Box
                onClick={handleOptionClick}
                sx={{
                    border: (!clicked) ? '1px solid #D1D1D1' : '1px solid #000',
                    borderRadius: '8px',
                    width: 1,
                    display: 'flex',
                    py: 1,
                    transition: 'border 0.3s',
                    '&:hover': {
                        cursor: 'pointer',
                        border: '1px solid #000'
                    }
                }}>
                <Radio size="small" checked={clicked} />
                <SvgColor src='/assets/icons/orders/delivery/flag-01.svg' sx={{ mt: 1 }} />
                <Typography variant="h6" sx={{
                    //fontFamily: 'peyda-bold',
                    mt: 1,
                    pl: 1
                }}>
                    {children}
                </Typography>
            </Box>
        </Stack>
    )
}