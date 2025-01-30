'use client';

import { Box, Container, Grid, Stack } from "@mui/material";
import SaleManagementPayment from "../sale-management-payment";
import { AdminBreadcrumbs } from "src/components/custom-breadcrumbs";
import { paths } from "src/routes/paths";
import { PageTitle } from "../../page-title";
import SaleManagementProducts from "../sale-management-products";
import { useGetOrderProducts } from "src/api/order-products";
import { useBoolean } from "src/hooks/use-boolean";
import { useGetOrder } from "src/api/orders";
import { useCallback, useEffect, useState } from "react";
import { ProductOrderType } from "src/types/product";
import Scrollbar from "src/components/scrollbar";
import { endpoints, server_axios } from "src/utils/axios";
import { IOrderProductPropertyStatus } from "src/types/order-products-property";

type Props = {
    id: string;
};

export default function SaleManagementDetailsView({ id }: Props) {
    const invoiceDialog = useBoolean();

    const [sendToUser, setSendToUser] = useState(false);
    const [hasCustomMade, setHasCustomMade] = useState(false);

    const { orderProducts } = useGetOrderProducts(+id);
    const { order, orderLoading, refreshOrder } = useGetOrder(id);

    useEffect(() => {
        refreshOrder();
        if (orderProducts.length > 0) {
            if (orderProducts.some((op) => op.product.order_type === ProductOrderType.custom_made))
                setHasCustomMade(true)
            // if (orderProducts.some((op) => op.status === IOrderProductStatus.deleted && op.product.order_type === ProductOrderType.ready_to_use))
            //     deleteReminder.onTrue();
            // if (orderProducts.some((op) => op.status === IOrderProductStatus.more_time && op.product.order_type === ProductOrderType.ready_to_use))
            //     timeReminder.onTrue();
        }
    }, [orderProducts]);

    const handleHasApprove = useCallback(async () => {
        const op = await server_axios.get(endpoints.orderProducts.one(id))
            .then(({ data }) => data)

        const find = op.find((item: any) => item.properties.find((op: any) => op.status === IOrderProductPropertyStatus.denied && item.product.order_type === ProductOrderType.custom_made))
        if (find)
            setSendToUser(true)
        else
            setSendToUser(false)
    }, [setSendToUser, id]);

    // const handleAddId = () => {}
    // const handleRemoveId = () => {}

    return (!orderLoading) && (
        <Box>

            <Box>
                <PageTitle title="مدیریت فروش" icon="/assets/icons/shop/shopping-cart-01.svg" />
            </Box>

            <Box sx={{ height: 768, maxWidth: 1080, ml: '20px' }}>
                <Stack direction={'row'} spacing={'20px'}>
                    <Box width={'-webkit-fill-available'} height={768}>
                        <SaleManagementProducts
                            // orderProducts={orderProducts}
                            order={order}
                            updateHasAnydeapprove={handleHasApprove}
                        />
                    </Box>
                    <Box minWidth={340}>
                        <SaleManagementPayment
                            invoiceDialog={invoiceDialog}
                            sendToUser={sendToUser}
                            // order={order}
                            orderId={+id}
                            hasCustomMade={hasCustomMade}
                            orderProducts={orderProducts}
                        />
                    </Box>
                </Stack>
            </Box>
        </Box>
    )
}