'use client';

import { Button, Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";
import Iconify from "src/components/iconify";
import { endpoints } from "src/utils/axios";

export function DownloadView() {
    return (
        <Box textAlign={'center'}>
            <Typography variant="heading3" my={10}>
                دانلود لیست قیمت و کاتالوگ کارانو
            </Typography>
            <Stack spacing={3} mx={'auto'} justifyContent={'center'} width={1}>
                <Button variant="contained" color="primary" size="large" href={endpoints.settings.direct_price_list} sx={{ width: 200, typography: 'body1', mx: 'auto' }}>
                    <Iconify icon={'ic:round-download'} sx={{ mr: 0.5 }} width={24} />
                    دانلود لیست قیمت
                </Button>
                <Button variant="contained" color="inherit" size="large" href={endpoints.settings.direct_catalog} sx={{ width: 200, typography: 'body1', mx: 'auto' }}>
                    <Iconify icon={'ic:round-download'} sx={{ mr: 0.5 }} width={24} />
                    دانلود کاتالوگ
                </Button>
            </Stack>
        </Box>
    )
}