"use client";

import { Box, Container, Grid, InputAdornment, Stack, Table, TableBody, TextField, Typography } from "@mui/material";
import { DialogWithButton } from "src/components/custom-dialog";
import Iconify from "src/components/iconify";
import { BlueNotification } from "src/components/notification";
import { useBoolean } from "src/hooks/use-boolean";
import CompleteOrderView from "../complete-order-view";
import ReadyProductsOrderRejectionDialogView from "../ready-products-order-rejection-view";
import { useGetTrackingOrders } from "src/api/orders";
import TrackingOrderItem from "../tracking-order-item";
import { useCallback, useEffect, useState } from "react";
import ShoppingCartList from "src/sections/shopping-cart/shopping-cart-list";
import { useGetOrderProducts } from "src/api/order-products";
import { endpoints } from "src/utils/axios";
import { IOrderItem, OrderStatus } from "src/types/order";
import { ProductOrderType } from "src/types/product";
import OrderRejectionListView from "../order-rejection-list-view";

export default function OrderTrackingView() {
    const [order, setOrder] = useState<IOrderItem>();
    const [orderId, setOrderId] = useState<number>(0);
    const [hasReady, setHasReady] = useState<boolean>(false);
    const [hasCustomize, setHasCustomize] = useState<boolean>(false);

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
            orderRejectingDialog.onTrue();
            setOrder(orders.find((order) => order.id === id));
        } else if (status === OrderStatus.pending) {
            cartDialog.onTrue();
        } else {
            finalOrderDialog.onTrue();
        }
    };

    useEffect(() => {
        if (orderProducts.length > 0) {
            setHasReady(orderProducts.some((order) => order.product.order_type === ProductOrderType.ready_to_use));
            setHasCustomize(orderProducts.some((order) => order.product.order_type === ProductOrderType.custom_made));
            // setHasReady(!!orders.find((order) => order.order_products.some((product) => product.product.order_type === ProductOrderType.ready_to_use)));
            // setHasCustomize(!!orders.some((order) => order.order_products.some((product) => product.product.order_type === ProductOrderType.custom_made)));
        }
    }, [orderProducts, orderRejectingDialog.value]);

    const handleAfterSubmitReadyProductsOrderRejection = useCallback(() => {
        setHasReady(false);
    }, [setHasReady]);

    return (
        <Box>

            <DialogWithButton dialog={finalOrderDialog} fullWith={true}>
                <CompleteOrderView orderId={orderId} finalOrderDialog={finalOrderDialog} />
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
                                    id: property.id,
                                    status: property.status,
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
                <OrderRejectionListView
                    orderProducts={orderProducts}
                />
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