import { Box, IconButton, Stack, Typography } from "@mui/material";
import SvgColor from "src/components/svg-color";

import { useRouter } from 'src/routes/hooks';

interface Props {
    title?: string
    back?: boolean | undefined
}

export default function RegisterLoginHead({ back, title = "ثبت نام | ورود" }: Props) {
    const router = useRouter();
    return (
        <Stack spacing={2} sx={{ mb: 4 }}>
            <Box sx={{ borderBottom: '1px solid #D1D1D1' }}>
                <Stack direction={'row'} justifyContent={back ? '' : 'center'}>
                    {(back) && (
                        <Box sx={{
                            mr: '15%'
                        }}>
                            <IconButton onClick={() => router.back()}>
                                <SvgColor src="/assets/icons/arrow/arrow-narrow-right.svg" color={"#727272"} />
                            </IconButton>
                        </Box>
                    )}
                    <Typography variant="h4" textAlign={'center'} fontFamily={'peyda-bold'} sx={{ pb: 3 }}>
                        {title}
                    </Typography>
                </Stack>
            </Box>
        </Stack>
    )
}