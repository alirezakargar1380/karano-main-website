"use client";

import { LoadingButton } from "@mui/lab";
import { Box, Container, Grid, InputAdornment, Stack, Table, TableBody, TextField, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { DialogWithButton } from "src/components/custom-dialog";
import FormProvider, { RHFRadioGroupTitleText } from "src/components/hook-form";
import Iconify from "src/components/iconify";
import Image from "src/components/image";
import Label from "src/components/label";
import { BlueNotification, YellowNotification } from "src/components/notification";
import Scrollbar from "src/components/scrollbar";
import { StyledRoundedWhiteButton } from "src/components/styles/props/rounded-white-button";
import { TableHeadCustom } from "src/components/table";
import { useBoolean } from "src/hooks/use-boolean";
import CartTableRow from "src/sections/cart/cart-table-row";
import { CartTableHead } from "src/sections/cart/view/cart-dialog-view";
import CompleteOrderView from "./complete-order-view";
import OrderRejectionDialogView from "./order-rejection-dialog-view";
import { useGetTrackingOrders } from "src/api/orders";
import TrackingOrderItem from "../tracking-order-item";
import { useState } from "react";
import ShoppingCartList from "src/sections/shopping-cart/shopping-cart-list";
import { useGetOrderProducts } from "src/api/order-products";
import { endpoints } from "src/utils/axios";
import { OrderStatus } from "src/types/order";

export default function OrderTrackingView() {
    const [orderId, setOrderId] = useState<number>(0);

    const orderRejectingDialog = useBoolean();
    const cartDialog = useBoolean();
    const finalOrderDialog = useBoolean();

    const {
        orders
    } = useGetTrackingOrders();
    const { orderProducts } = useGetOrderProducts(orderId);

    const handleMore = (id: number, status: OrderStatus) => {
        setOrderId(id);
        if (status === OrderStatus.failed) {

        } else if (status === OrderStatus.pending) {
            cartDialog.onTrue()
        } else {
            finalOrderDialog.onTrue()
        }

    };

    return (
        <Box>

            <DialogWithButton dialog={finalOrderDialog} fullWith={true}>
                <CompleteOrderView orderId={orderId} />
            </DialogWithButton>

            <DialogWithButton dialog={cartDialog} fullWith={true}>
                <ShoppingCartList
                    items={orderProducts.map((op) => {
                        return {
                            // id: op.product.id,
                            // name: op.product.name,
                            ...op.product,
                            coverUrl: endpoints.image.url(op.product.images.find((item) => item.main)?.name || ''),
                            need_to_assemble: op.need_to_assemble,
                            order_form_id: op.product.order_form_options.id,
                            subTotal: 0,
                            properties: op.properties.map((property) => {
                                return {
                                    // ...property,
                                    dimention: property.product_dimension,
                                    quantity: property.quantity,
                                    coating_type: property.coating_type,
                                    cover_type: property.cover_type,
                                    profile_type: property.profile_type,
                                    frame_type: property.frame_type,
                                }
                            }),
                        }
                    })}
                />
            </DialogWithButton>

            <DialogWithButton dialog={orderRejectingDialog} fullWith={true}>
                <OrderRejectionDialogView dialog={orderRejectingDialog} />
            </DialogWithButton>

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
                {orders.map((order) => (
                    <TrackingOrderItem
                        key={order.id}
                        order={order}
                        handleMoreBtn={handleMore}
                    />
                ))}
                {/* <Box sx={{ bgcolor: '#F8F8F8', borderRadius: '16px', border: '1px solid #D1D1D1', padding: 4 }}>
                    <Stack direction={'row'} justifyContent={'space-between'} sx={{ borderBottom: '1px solid #D1D1D1', pb: 2 }}>
                        <Label color="error" fontFamily={'peyda-bold'}>وضعیت: رد شده</Label>
                        <StyledRoundedWhiteButton
                            variant="outlined"
                            onClick={() => { orderRejectingDialog.onTrue() }}
                        >
                            مشاهده جزئیات
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
                        <Label color="info" fontFamily={'peyda-bold'}>
                            وضعیت: درحال بررسی
                        </Label>
                        <StyledRoundedWhiteButton
                            onClick={() => { cartDialog.onTrue() }}
                            variant="outlined"
                        >
                            مشاهده سبد خرید
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
                            variant="outlined"
                            onClick={() => { finalOrderDialog.onTrue() }}
                        >
                            ادامه و تکمیل خرید
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
                </Box> */}
            </Stack>
        </Box>
    )
}