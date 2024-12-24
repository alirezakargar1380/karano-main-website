'use client';

import { Box, Container, Grid } from "@mui/material";
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

            <AdminBreadcrumbs
                links={[
                    { name: 'پنل کاربری ادمین', href: paths.admin_dashboard.root },
                    { name: 'مدیریت فروش' },
                ]}
                sx={{
                    mb: { xs: 3, md: 5 },
                }}
            />
            <Box>
                <PageTitle title="مدیریت فروش" icon="/assets/icons/shop/shopping-cart-01.svg" />
            </Box>

            <Container maxWidth="xl">
                <Grid container spacing={2}>
                    <Grid sm={8} item>
                        <SaleManagementProducts
                            // orderProducts={orderProducts}
                            order={order}
                            updateHasAnydeapprove={handleHasApprove}
                        />
                    </Grid>
                    <Grid sm={4} item>
                        <SaleManagementPayment
                            invoiceDialog={invoiceDialog}
                            sendToUser={sendToUser}
                            // order={order}
                            orderId={+id}
                            hasCustomMade={hasCustomMade}
                            // orderProducts={orderProducts}
                        />
                    </Grid>
                </Grid>
            </Container>
        </Box>
    )
}