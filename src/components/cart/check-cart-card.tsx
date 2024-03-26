import { Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";
import SvgColor from "../svg-color";
import { LoadingButton } from "@mui/lab";
import { useBooleanReturnType } from "src/hooks/use-boolean";

interface Props {
    children?: React.ReactNode;
    title?: string
    dialog: useBooleanReturnType
}

export default function CheckCartCard({ children, dialog }: Props) {
    return (
        <Box sx={{ width: '100%', height: '100%', backgroundColor: '#F8F8F8', border: '1px solid #D1D1D1', borderRadius: '8px', py: 2, px: 2 }}>
            <Stack direction={'row'} justifyContent={'space-between'}>
                <Typography variant="h6" sx={{ width: '80%', pr: 2 }}>
                    نتیجه بررسی سفارش شما بعد  از ارسال به کارشناسان کارانو، از طریق «پیام کوتاه» اعلام و پیش‌فاکتور صادر می‌شود.
                    همچنین همواره می‌توانید برای پیگیری وضعیت سفارش خود، به صفحه «پیگیری سفارش» در بالای صفحه مراجعه کنید.
                </Typography>
                <Box sx={{ width: '20%', borderLeft: '1px solid #D1D1D1', pl: 3, py: 2 }}>
                    <LoadingButton variant="contained" sx={{ borderRadius: '24px', width: 1 }} onClick={() => dialog.onTrue()}>
                        ارسال برای بررسی
                    </LoadingButton>
                </Box>
            </Stack>
        </Box>
    )
}