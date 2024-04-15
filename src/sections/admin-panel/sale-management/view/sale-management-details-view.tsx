'use client';

import { Box, Grid } from "@mui/material";
import SaleManagementPayment from "../sale-management-payment";
import { AdminBreadcrumbs } from "src/components/custom-breadcrumbs";
import { paths } from "src/routes/paths";
import { PageTitle } from "../../page-title";
import SaleManagementProducts from "../sale-management-products";

type Props = {
    id: string;
};

export default function SaleManagementDetailsView({ id }: Props) {
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
            <Grid container spacing={2}>
                <Grid sm={8} item>
                    <SaleManagementProducts />
                </Grid>
                <Grid sm={4} item>
                    <SaleManagementPayment />
                </Grid>
            </Grid>
        </Box>
    )
}