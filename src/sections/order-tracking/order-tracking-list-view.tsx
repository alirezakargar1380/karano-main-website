"use client";

import { Box, Container, Grid, InputAdornment, Stack, Table, TableBody, TextField, Typography } from "@mui/material";
import { DialogWithButton } from "src/components/custom-dialog";
import Iconify from "src/components/iconify";
import { BlueNotification } from "src/components/notification";
import { useBoolean } from "src/hooks/use-boolean";
import CompleteOrderView from "./complete-order-view";
import { useGetTrackingOrders } from "src/api/orders";
import TrackingOrderItem from "./tracking-order-item";
import { useCallback, useEffect, useState } from "react";
import ShoppingCartList from "src/sections/shopping-cart/shopping-cart-list";
import { useGetOrderProducts } from "src/api/order-products";
import { endpoints } from "src/utils/axios";
import { IOrderItem, OrderStatus } from "src/types/order";
import { ProductOrderType } from "src/types/product";
import OrderRejectionListView from "./order-rejection-list-view";

export default function OrderTrackingListView() {
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
            orderRejectingDialog.onTrue();
        } else if (status === OrderStatus.pending || status === OrderStatus.edited) {
            cartDialog.onTrue();
        } else if (status === OrderStatus.accepted) {
            finalOrderDialog.onTrue();
        }
    };

    return (
        <Box>

            <DialogWithButton dialog={finalOrderDialog} fullWith={true}>
                <CompleteOrderView orderId={orderId} finalOrderDialog={finalOrderDialog} />
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