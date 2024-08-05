"use client";

import { Box, Container, Grid, InputAdornment, Stack, Table, TableBody, TextField, Typography } from "@mui/material";
import Iconify from "src/components/iconify";
import { BlueNotification } from "src/components/notification";
import OrderTrackingListView from "../order-tracking-list-view";

export default function OrderTrackingView() {

    return (
        <Stack spacing={4} pb={10} mt={4}>
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
            <OrderTrackingListView />
        </Stack>
    )
}