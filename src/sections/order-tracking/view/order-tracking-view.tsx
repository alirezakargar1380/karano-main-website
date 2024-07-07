"use client";

import { Box, Container, Grid, InputAdornment, Stack, Table, TableBody, TextField, Typography } from "@mui/material";
import { DialogWithButton } from "src/components/custom-dialog";
import Iconify from "src/components/iconify";
import { BlueNotification } from "src/components/notification";
import { useBoolean } from "src/hooks/use-boolean";
import CompleteOrderView from "../complete-order-view";
import { useGetTrackingOrders } from "src/api/orders";
import TrackingOrderItem from "../tracking-order-item";
import { useCallback, useEffect, useState } from "react";
import ShoppingCartList from "src/sections/shopping-cart/shopping-cart-list";
import { useGetOrderProducts } from "src/api/order-products";
import { endpoints } from "src/utils/axios";
import { IOrderItem, OrderStatus } from "src/types/order";
import { ProductOrderType } from "src/types/product";
import OrderRejectionListView from "../order-rejection-list-view";
import OrderTrackingListView from "../order-tracking-list-view";

export default function OrderTrackingView() {

    return (
        <Stack spacing={4} pb={10}>
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