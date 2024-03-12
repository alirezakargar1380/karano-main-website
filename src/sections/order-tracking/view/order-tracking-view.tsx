"use client";

import { Box, InputAdornment, Stack, TextField, Typography } from "@mui/material";
import Iconify from "src/components/iconify";
import Label from "src/components/label";
import { BlueNotification } from "src/components/notification";
import { StyledRoundedWhiteButton } from "src/components/styles/props/rounded-white-button";

export default function OrderTrackingView() {

    return (
        <Box>


            <Stack spacing={4}>
                <BlueNotification title='مهلت پرداخت'>
                    ما تنها برای ۴۸ ساعت می‌توانیم پیش‌فاکتورتان را فعال نگه داریم. در صورت عدم‌پرداخت، ناچار به بررسی مجدد سفارش‌تان هستیم.
                </BlueNotification>
                <TextField
                    placeholder="جست و جو"
                    variant="outlined"
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="end" sx={{ cursor: 'pointer', paddingRight: '16px' }}>
                                <Iconify icon={'material-symbols:search'} />
                            </InputAdornment>
                        ),
                        sx: {
                            borderRadius: '24px'
                        }
                    }}
                />
                <Box sx={{ bgcolor: '#F8F8F8', borderRadius: '16px', border: '1px solid #D1D1D1', padding: 4 }}>
                    <Stack direction={'row'} justifyContent={'space-between'} sx={{ borderBottom: '1px solid #D1D1D1', pb: 2 }}>
                        <Label color="success" fontFamily={'peyda-bold'}>وضعیت: تایید شده</Label>
                        <StyledRoundedWhiteButton
                            variant="outlined">
                            مشاهده پیش فاکتور
                            <Iconify icon={'solar:arrow-left-linear'} sx={{ ml: 1 }} />
                        </StyledRoundedWhiteButton>
                    </Stack>
                    <Stack direction={'row'} justifyContent={'space-between'} sx={{ pt: 2 }}>
                        <Stack spacing={2} sx={{ width: 0.5 }}>
                            <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                                <Typography fontFamily={'peyda-bold'} sx={{ pr: 1 }}>شماره سفارش:</Typography>
                                <Typography fontFamily={'peyda-medium'}>
                                    15558476
                                </Typography>
                            </Box>
                            <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                                <Typography fontFamily={'peyda-bold'} sx={{ pr: 1 }}>
                                    تاریخ ثبت سفارش:
                                </Typography>
                                <Typography fontFamily={'peyda-medium'}>
                                    1402/02/01
                                </Typography>
                            </Box>
                        </Stack>
                        <Stack spacing={2} sx={{ width: 0.5 }}>
                            <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                                <Typography fontFamily={'peyda-bold'} sx={{ pr: 1 }}>
                                    تعداد کالا:
                                </Typography>
                                <Typography fontFamily={'peyda-medium'}>
                                    59
                                </Typography>
                            </Box>
                            <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                                <Typography fontFamily={'peyda-bold'} sx={{ pr: 1 }}>
                                    تاریخ تحویل:
                                </Typography>
                                <Typography fontFamily={'peyda-medium'}>
                                    1402/02/01
                                </Typography>
                            </Box>
                        </Stack>
                    </Stack>
                </Box>
                <Box sx={{ bgcolor: '#F8F8F8', borderRadius: '16px', border: '1px solid #D1D1D1', padding: 4 }}>
                    <Stack direction={'row'} justifyContent={'space-between'} sx={{ borderBottom: '1px solid #D1D1D1', pb: 2 }}>
                        <Label color="success" fontFamily={'peyda-bold'}>وضعیت: تایید شده</Label>
                        <StyledRoundedWhiteButton
                            variant="outlined">
                            مشاهده پیش فاکتور
                            <Iconify icon={'solar:arrow-left-linear'} sx={{ ml: 1 }} />
                        </StyledRoundedWhiteButton>
                    </Stack>
                    <Stack direction={'row'} justifyContent={'space-between'} sx={{ pt: 2 }}>
                        <Stack spacing={2} sx={{ width: 0.5 }}>
                            <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                                <Typography fontFamily={'peyda-bold'} sx={{ pr: 1 }}>شماره سفارش:</Typography>
                                <Typography fontFamily={'peyda-medium'}>
                                    15558476
                                </Typography>
                            </Box>
                            <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                                <Typography fontFamily={'peyda-bold'} sx={{ pr: 1 }}>
                                    تاریخ ثبت سفارش:
                                </Typography>
                                <Typography fontFamily={'peyda-medium'}>
                                    1402/02/01
                                </Typography>
                            </Box>
                        </Stack>
                        <Stack spacing={2} sx={{ width: 0.5 }}>
                            <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                                <Typography fontFamily={'peyda-bold'} sx={{ pr: 1 }}>
                                    تعداد کالا:
                                </Typography>
                                <Typography fontFamily={'peyda-medium'}>
                                    59
                                </Typography>
                            </Box>
                            <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                                <Typography fontFamily={'peyda-bold'} sx={{ pr: 1 }}>
                                    تاریخ تحویل:
                                </Typography>
                                <Typography fontFamily={'peyda-medium'}>
                                    1402/02/01
                                </Typography>
                            </Box>
                        </Stack>
                    </Stack>
                </Box>
                <Box sx={{ bgcolor: '#F8F8F8', borderRadius: '16px', border: '1px solid #D1D1D1', padding: 4 }}>
                    <Stack direction={'row'} justifyContent={'space-between'} sx={{ borderBottom: '1px solid #D1D1D1', pb: 2 }}>
                        <Label color="success" fontFamily={'peyda-bold'}>وضعیت: تایید شده</Label>
                        <StyledRoundedWhiteButton
                            variant="outlined">
                            مشاهده پیش فاکتور
                            <Iconify icon={'solar:arrow-left-linear'} sx={{ ml: 1 }} />
                        </StyledRoundedWhiteButton>
                    </Stack>
                    <Stack direction={'row'} justifyContent={'space-between'} sx={{ pt: 2 }}>
                        <Stack spacing={2} sx={{ width: 0.5 }}>
                            <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                                <Typography fontFamily={'peyda-bold'} sx={{ pr: 1 }}>شماره سفارش:</Typography>
                                <Typography fontFamily={'peyda-medium'}>
                                    15558476
                                </Typography>
                            </Box>
                            <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                                <Typography fontFamily={'peyda-bold'} sx={{ pr: 1 }}>
                                    تاریخ ثبت سفارش:
                                </Typography>
                                <Typography fontFamily={'peyda-medium'}>
                                    1402/02/01
                                </Typography>
                            </Box>
                        </Stack>
                        <Stack spacing={2} sx={{ width: 0.5 }}>
                            <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                                <Typography fontFamily={'peyda-bold'} sx={{ pr: 1 }}>
                                    تعداد کالا:
                                </Typography>
                                <Typography fontFamily={'peyda-medium'}>
                                    59
                                </Typography>
                            </Box>
                            <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                                <Typography fontFamily={'peyda-bold'} sx={{ pr: 1 }}>
                                    تاریخ تحویل:
                                </Typography>
                                <Typography fontFamily={'peyda-medium'}>
                                    1402/02/01
                                </Typography>
                            </Box>
                        </Stack>
                    </Stack>
                </Box>
                <Box sx={{ bgcolor: '#F8F8F8', borderRadius: '16px', border: '1px solid #D1D1D1', padding: 4 }}>
                    <Stack direction={'row'} justifyContent={'space-between'} sx={{ borderBottom: '1px solid #D1D1D1', pb: 2 }}>
                        <Label color="success" fontFamily={'peyda-bold'}>وضعیت: تایید شده</Label>
                        <StyledRoundedWhiteButton
                            variant="outlined">
                            مشاهده پیش فاکتور
                            <Iconify icon={'solar:arrow-left-linear'} sx={{ ml: 1 }} />
                        </StyledRoundedWhiteButton>
                    </Stack>
                    <Stack direction={'row'} justifyContent={'space-between'} sx={{ pt: 2 }}>
                        <Stack spacing={2} sx={{ width: 0.5 }}>
                            <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                                <Typography fontFamily={'peyda-bold'} sx={{ pr: 1 }}>شماره سفارش:</Typography>
                                <Typography fontFamily={'peyda-medium'}>
                                    15558476
                                </Typography>
                            </Box>
                            <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                                <Typography fontFamily={'peyda-bold'} sx={{ pr: 1 }}>
                                    تاریخ ثبت سفارش:
                                </Typography>
                                <Typography fontFamily={'peyda-medium'}>
                                    1402/02/01
                                </Typography>
                            </Box>
                        </Stack>
                        <Stack spacing={2} sx={{ width: 0.5 }}>
                            <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                                <Typography fontFamily={'peyda-bold'} sx={{ pr: 1 }}>
                                    تعداد کالا:
                                </Typography>
                                <Typography fontFamily={'peyda-medium'}>
                                    59
                                </Typography>
                            </Box>
                            <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                                <Typography fontFamily={'peyda-bold'} sx={{ pr: 1 }}>
                                    تاریخ تحویل:
                                </Typography>
                                <Typography fontFamily={'peyda-medium'}>
                                    1402/02/01
                                </Typography>
                            </Box>
                        </Stack>
                    </Stack>
                </Box>
            </Stack>
        </Box>
    )
}