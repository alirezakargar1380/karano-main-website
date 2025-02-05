import { Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";
import SvgColor from "../svg-color";
import { LoadingButton } from "@mui/lab";
import { useBooleanReturnType } from "src/hooks/use-boolean";
import { PrimaryButton } from "../styles/buttons/primary";

interface Props {
    children?: React.ReactNode;
    title?: string
    dialog: useBooleanReturnType
}

export default function CheckCartCard({ children, dialog }: Props) {
    return (
        <Box sx={{ width: '100%', height: '100%', backgroundColor: '#F8F8F8', border: '1px solid #D1D1D1', borderRadius: '20px', py: 2, px: 2 }}>
            <Stack direction={'row'} justifyContent={'space-between'}>
                <Typography variant="body2" sx={{ width: '80%', pr: 2, display: 'flex' }}>
                    {children}
                </Typography>
                <Box sx={{ width: '20%', borderLeft: '1px solid #D1D1D1', pl: 3, py: 2 }}>
                    <PrimaryButton size="medium" sx={{ borderRadius: '24px', width: 1 }} onClick={() => dialog.onTrue()}>
                        ارسال برای بررسی
                    </PrimaryButton>
                </Box>
            </Stack>
        </Box>
    )
}