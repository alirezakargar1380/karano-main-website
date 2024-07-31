"use client";

import { Box, Button, Container, Grid, InputAdornment, Stack, Table, TableBody, TextField, Typography } from "@mui/material";
import { DialogWithButton, SuccessDialog } from "src/components/custom-dialog";
import Iconify from "src/components/iconify";
import { BlueNotification } from "src/components/notification";
import { useBoolean } from "src/hooks/use-boolean";
import CompleteOrderView from "./complete-order-view";
import { useGetTrackingOrders } from "src/api/orders";
import TrackingOrderItem from "./tracking-order-item";
import { useCallback, useEffect, useState } from "react";
import ShoppingCartList from "src/sections/shopping-cart/shopping-cart-list";
import { useGetOrderProducts } from "src/api/order-products";
import { endpoints, server_axios } from "src/utils/axios";
import { IOrderDeliveryType, IOrderItem, OrderStatus } from "src/types/order";
import { ProductOrderType } from "src/types/product";
import OrderRejectionListView from "./order-rejection-list-view";
import { LoadingButton } from "@mui/lab";
import { StyledRoundedWhiteButton } from "src/components/styles/props/rounded-white-button";
import { useSnackbar } from "src/components/snackbar";
import SvgColor from "src/components/svg-color";

export default function OrderTrackingListView() {
    const [orderId, setOrderId] = useState<number>(0);
    const [hasCustomMade, setHasCustomMade] = useState(false);

    const orderRejectingDialog = useBoolean();
    const cartDialog = useBoolean();
    const finalOrderDialog = useBoolean();
    const finalPaymentDialog = useBoolean();

    const successDialog = useBoolean();
    const submitSuccessDialog = useBoolean();

    const { enqueueSnackbar } = useSnackbar();

    const {
        orders
    } = useGetTrackingOrders();
    const { orderProducts } = useGetOrderProducts(orderId);

    useEffect(() => {
        if (orderProducts.length > 0) {
            if (orderProducts.some((op) => op.product.order_type === ProductOrderType.custom_made))
                setHasCustomMade(true);
        }
    }, [orderProducts]);

    const handleMore = (id: number, status: OrderStatus) => {
        setOrderId(id);
        if (status === OrderStatus.failed) {
            orderRejectingDialog.onTrue();
        } else if (status === OrderStatus.accepted) {
            finalOrderDialog.onTrue();
        } else if (status === OrderStatus.produced) {
            finalPaymentDialog.onTrue()
        } else {
            cartDialog.onTrue();
        }
    };

    const handleConfirmSubmitDialog = (need_prepayment: boolean) => {
        if (need_prepayment) {
            submitSuccessDialog.onTrue();
        } else {
            successDialog.onTrue();
        }
    }

    const pay = async () => {
        await server_axios.patch(endpoints.orders.update(orderId), {
            status: OrderStatus.ready_to_send
        })
        finalPaymentDialog.onFalse();
        // enqueueSnackbar("سفارش شما با موفقیت پرداخت شد")
        handleConfirmSubmitDialog(orders.find((o) => o.id === orderId)?.need_prepayment || false)
    }

    return (
        <Box>

            <SuccessDialog
                title="ثبت موفق"
                content={`سفارش شما با کد ${orders.find((o) => o.id === orderId)?.order_number || ''}، با موفقیت ثبت شد و وارد فرایند تولید می‌شود.`}
                open={submitSuccessDialog.value}
                onClose={submitSuccessDialog.onFalse}
            />

            <SuccessDialog
                title="پرداخت موفق"
                content={hasCustomMade ?
                    `سفارش شما با کد ${orders.find((o) => o.id === orderId)?.order_number || ''}، با موفقیت ثبت شد و وارد فرایند تولید می‌شود.`
                    : `پرداخت شما برای سفارش کد ${orders.find((o) => o.id === orderId)?.order_number || ''}، با موفقیت ثبت شد و 
وارد فرایند آماده‌سازی و ارسال می‌شود.`}
                open={successDialog.value}
                onClose={successDialog.onFalse}
            />

            <DialogWithButton dialog={finalPaymentDialog} fullWith={false} width={800}>
                <Box p={3}>
                    <Stack direction={"row"} borderBottom={'1px solid #1D1D1D'} pb={2} justifyContent={"space-between"}>
                        <Typography variant="h4" fontFamily={'peyda-bold'}>پرداخت نهایی</Typography>
                        <Button
                            sx={{ color: "#0B7BA7", fontFamily: "peyda-bold", fontSize: '16px' }}
                        >
                            <SvgColor src="/assets/icons/orders/download-01.svg" sx={{ mr: 0.5 }} />
                            دانلود فاکتور نهایی
                        </Button>
                    </Stack>
                    <Typography variant="body1" fontFamily={'peyda-regular'} color={"#727272"} py={4}>برای نهایی‌کردن سفارش، لطفا مبلغ باقی‌مانده فاکتور خود را پرداخت کنید.</Typography>
                    <Stack direction={"row"}>
                        <Typography fontFamily={'peyda-bold'}>مبلغ:</Typography>
                        <Typography px={3}>1455555</Typography>
                        <Typography color={"#727272"} fontFamily={'peyda-light'}>ریال</Typography>
                    </Stack>
                    <Stack direction={'row'} justifyContent={'end'} pt={4} spacing={1}>
                        <StyledRoundedWhiteButton variant='outlined' onClick={finalPaymentDialog.onFalse} sx={{ px: 3 }}>انصراف</StyledRoundedWhiteButton>
                        <LoadingButton variant='contained' sx={{ borderRadius: '24px', px: 4 }} onClick={() => pay()}>پرداخت</LoadingButton>
                    </Stack>
                </Box>
            </DialogWithButton>

            <DialogWithButton dialog={finalOrderDialog} fullWith={true}>
                <CompleteOrderView
                    orderId={orderId}
                    finalOrderDialog={finalOrderDialog}
                    hasCustomMade={hasCustomMade}
                    handleAfterLastSection={(n) => handleConfirmSubmitDialog(n)}
                />
            </DialogWithButton>

            <DialogWithButton dialog={cartDialog} fullWith={true}>
                <Box p={2}>
                    <ShoppingCartList
                        type="cart"
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
                                        rejection_reason: null,
                                        dimension: property.dimension,
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
                </Box>
            </DialogWithButton>

            <DialogWithButton dialog={orderRejectingDialog} fullWith={true}>
                <OrderRejectionListView
                    orderProducts={orderProducts}
                    dialog={orderRejectingDialog}
                    orderId={orderId}
                />
            </DialogWithButton>

            <Stack spacing={4} pb={10}>
                {orders.map((order) => (
                    <TrackingOrderItem
                        key={order.id}
                        order={order}
                        handleMoreBtn={handleMore}
                    />
                ))}
            </Stack>
        </Box>
    )
}