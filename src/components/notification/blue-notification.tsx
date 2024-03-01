import { Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";
import SvgColor from "../svg-color";

interface Props {
    children?: React.ReactNode;
    title?: string
}

export default function BlueNotification({ children, title }: Props) {

    return (
        <Box sx={{ width: '100%', height: '100%', backgroundColor: '#DCF9FF', border: '1px solid #0B7BA7', borderRadius: '8px', py: 2, px: 2 }}>
            <Stack direction={'row'} justifyContent={'space-between'}>
                <Stack direction={'row'} spacing={2}>
                    <SvgColor src="/assets/icons/notification/alert-circle.svg" color={'#0B7BA7'} />
                    <Typography variant="h6" fontFamily={'peyda-bold'}>{title || 'مشاهده پیش فاکتور'}</Typography>
                </Stack>
                <SvgColor src="/assets/icons/notification/x-close.svg" color={'#0B7BA7'} />
            </Stack>
            <Typography variant="h6" sx={{ pl: 5, pt: 2 }}>{children}</Typography>
        </Box>
    )
}