'use client';

import { Box, Grid } from "@mui/material";
import SaleManagementPayment from "../sale-management-payment";
import { AdminBreadcrumbs } from "src/components/custom-breadcrumbs";
import { paths } from "src/routes/paths";
import { PageTitle } from "../../page-title";
import SaleManagementProducts from "../sale-management-products";
import { useGetOrderProducts } from "src/api/order-products";
import { useBoolean } from "src/hooks/use-boolean";
import InvoiceDialog from "../common/invoice-dialog";
import { useGetOrder } from "src/api/orders";
import { useCallback } from "react";
import { endpoints, server_axios } from "src/utils/axios";
import { useSnackbar } from 'src/components/snackbar';
import { OrderStatus } from "src/types/order";

type Props = {
    id: string;
};

export default function SaleManagementDetailsView({ id }: Props) {
    const invoiceDialog = useBoolean();
    const { enqueueSnackbar } = useSnackbar();

    const { orderProducts } = useGetOrderProducts(+id);
    const { order, orderLoading } = useGetOrder(id);

    const handleApprovOrder = useCallback( async () => {
        await server_axios.patch(endpoints.orders.update(id), {
            status: OrderStatus.accepted
        })
        invoiceDialog.onFalse();
        enqueueSnackbar("وضعیت سفارش تایید شد", {
            variant: 'info',
        })
    }, [id])

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

            <InvoiceDialog
                dialog={invoiceDialog}
                orderProducts={orderProducts}
                submitHandler={() => handleApprovOrder()}
            />

            <Grid container spacing={2}>
                <Grid sm={8} item>
                    <SaleManagementProducts order={orderProducts} o={order} />
                </Grid>
                <Grid sm={4} item>
                    <SaleManagementPayment invoiceDialog={invoiceDialog} />
                </Grid>
            </Grid>
        </Box>
    )
}