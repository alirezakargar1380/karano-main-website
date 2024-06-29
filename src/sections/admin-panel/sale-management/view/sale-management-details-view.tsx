'use client';

import { Box, Button, Grid } from "@mui/material";
import SaleManagementPayment from "../sale-management-payment";
import { AdminBreadcrumbs } from "src/components/custom-breadcrumbs";
import { paths } from "src/routes/paths";
import { PageTitle } from "../../page-title";
import SaleManagementProducts from "../sale-management-products";
import { useGetOrderProducts } from "src/api/order-products";
import { useBoolean } from "src/hooks/use-boolean";
import InvoiceDialog from "../common/invoice-dialog";
import { useGetOrder } from "src/api/orders";
import { useCallback, useEffect } from "react";
import { endpoints, server_axios } from "src/utils/axios";
import { useSnackbar } from 'src/components/snackbar';
import { OrderStatus } from "src/types/order";
import { ReminderDialog } from "src/components/custom-dialog";
import { IOrderProductStatus } from "src/types/order-products";
import { ProductOrderType } from "src/types/product";

type Props = {
    id: string;
};

export default function SaleManagementDetailsView({ id }: Props) {
    const invoiceDialog = useBoolean();
    const deleteReminder = useBoolean();
    const timeReminder = useBoolean();

    const { enqueueSnackbar } = useSnackbar();

    const { orderProducts } = useGetOrderProducts(+id);
    const { order, orderLoading } = useGetOrder(id);

    const handleApprovOrder = useCallback(async () => {
        await server_axios.patch(endpoints.orders.update(id), {
            status: OrderStatus.accepted
        })
        invoiceDialog.onFalse();
        enqueueSnackbar("وضعیت سفارش تایید شد", {
            variant: 'info',
        })
    }, [id]);

    useEffect(() => {
        if (orderProducts.length > 0) {
            if (orderProducts.some((op) => op.status === IOrderProductStatus.deleted && op.product.order_type === ProductOrderType.ready_to_use))
                deleteReminder.onTrue();
            if (orderProducts.some((op) => op.status === IOrderProductStatus.more_time && op.product.order_type === ProductOrderType.ready_to_use))
                timeReminder.onTrue();
        }
    }, [orderProducts])

    return (!orderLoading) && (
        <Box>
            <ReminderDialog
                open={deleteReminder.value}
                onClose={deleteReminder.onFalse}
                title="یادآوری"
                content="مشتری مورد نظر برای  کالاهای آماده ناموجود سفارش خود، گزینه «حذف کالاهای ناموجود از سبد خرید» را انتخاب کرد؛ از این رو  مدت زمان  تحویل کالاهای موجود را مشخص کنید."
                action={
                    <Button variant="outlined" color="info" onClick={deleteReminder.onFalse} sx={{
                        color: '#0B7BA7',
                        borderColor: '#0B7BA7',
                        borderRadius: '50px',
                    }}>
                        متوجه شدم
                    </Button>
                }
            />
            <ReminderDialog
                open={timeReminder.value}
                onClose={timeReminder.onFalse}
                title="یادآوری"
                content="مشتری مورد نظر برای  کالاهای آماده ناموجود سفارش خود، گزینه «تحویل همه محصولات با زمان بیشتر» را انتخاب کرد؛ از این رو  مدت زمان  تحویل کالاهای موجود را مشخص کنید."
                action={
                    <Button variant="outlined" color="info" onClick={timeReminder.onFalse} sx={{
                        color: '#0B7BA7',
                        borderColor: '#0B7BA7',
                        borderRadius: '50px',
                    }}>
                        متوجه شدم
                    </Button>
                }
            />
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