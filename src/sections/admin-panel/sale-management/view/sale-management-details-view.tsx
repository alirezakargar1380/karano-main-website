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

type Props = {
    id: string;
};

export default function SaleManagementDetailsView({ id }: Props) {
    const invoiceDialog = useBoolean(true);

    const { orderProducts } = useGetOrderProducts(+id);

    return (
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
            />

            <Grid container spacing={2}>
                <Grid sm={8} item>
                    <SaleManagementProducts order={orderProducts} />
                </Grid>
                <Grid sm={4} item>
                    <SaleManagementPayment />
                </Grid>
            </Grid>
        </Box>
    )
}