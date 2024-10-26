import { Box, Button, DialogTitle, Stack, Tooltip, Typography } from "@mui/material";
import { useEffect } from "react";
import CheckoutSteps from "src/sections/checkout/checkout-steps";
import { useCheckoutContext } from "src/sections/checkout/context";
import { DeliveryRecipientInformation } from "./delivery-recipient-information";
import InvoiceView from "./invoice-view";
import Payment from "./payment";
import { useGetOrderProducts } from "src/api/order-products";
import { useBooleanReturnType } from "src/hooks/use-boolean";
import { useGetOrder } from "src/api/orders";
import Label from "src/components/label";
import { fToJamali } from "src/utils/format-time";
import { endpoints, server_axios } from "src/utils/axios";
import { OrderStatus } from "src/types/order";
import { DialogWithButton } from "src/components/custom-dialog";
import CompleteInvoiceView from "./complete-invoice-view";
import SvgColor from "src/components/svg-color";
import CompleteOrderLayout from "./layout/complete-order-layout";

interface Props {
    orderId: number
    finalOrderDialog: useBooleanReturnType
    hasCustomMade: boolean
    handleAfterLastSection: (need_prepayment: boolean) => void
}

export let PRODUCT_CHECKOUT_STEPS_CUSTOM_PRE = ['اطلاعات تحویل‌گیرنده', 'مشاهده پیش‌فاکتور', 'پیش‌پرداخت'];
export let PRODUCT_CHECKOUT_STEPS_CUSTOM = ['اطلاعات تحویل‌گیرنده', 'مشاهده پیش‌فاکتور', 'ثبت'];
export let PRODUCT_CHECKOUT_STEPS_READY_PRE = ['اطلاعات تحویل‌گیرنده', 'مشاهده فاکتور', 'پرداخت'];
export let PRODUCT_CHECKOUT_STEPS_READY = ['اطلاعات تحویل‌گیرنده', 'مشاهده فاکتور', 'ثبت'];

export default function CompleteOrderView({
    orderId,
    finalOrderDialog,
    hasCustomMade,
    handleAfterLastSection
}: Props) {
    const checkout = useCheckoutContext();

    const { orderProducts } = useGetOrderProducts(orderId);
    const { order } = useGetOrder(`${orderId}`);

    useEffect(() => {
        checkout.onGotoStep(0)
    }, [finalOrderDialog.value]);

    useEffect(() => {
        if (checkout.activeStep === -1) finalOrderDialog.onFalse()
        if (checkout.activeStep === 2 && order.need_prepayment) handle();
        if (checkout.activeStep === 3) handle();
    }, [checkout.activeStep]);

    const handle = async () => {
        await server_axios.patch(endpoints.orders.update(orderId), {
            status: (hasCustomMade) ? OrderStatus.production : OrderStatus.preparing
        })
        finalOrderDialog.onFalse();
        handleAfterLastSection(order.need_prepayment);
    }

    return (
        <DialogWithButton dialog={finalOrderDialog} fullWith={true}>
            <DialogTitle sx={{ p: 0, pt: '40px', height: 'fit-content' }}>
                <CompleteOrderLayout>
                    <Stack direction={'row'} justifyContent={'space-between'} spacing={2} sx={{ px: 0 }} borderBottom={'1px solid #D1D1D1'}>
                        <Stack direction={'row'} spacing={2}>
                            <Typography variant="title1" sx={{ pb: 2, fontFamily: 'peyda-bold', }}>
                                نهایی کردن سفارش
                            </Typography>
                            <Label color="blue" variant="filled" px={4}>
                                <Typography variant="body3" fontFamily={'peyda-bold'} display={'inline-flex'}>
                                    تاریخ تحویل: <Box pl={0.5}>{fToJamali(order.production_date)}</Box>
                                </Typography>
                            </Label>
                        </Stack>
                        {checkout.activeStep >= 1 && (
                            <Tooltip title={hasCustomMade ? "دانلود پیش فاکتور" : "دانلود ‌فاکتور"} arrow>
                                <Button sx={{
                                    '&:hover': {
                                        bgcolor: '#F2F2F2'
                                    },
                                    minWidth: 'fit-content'
                                }} size="small">
                                    <SvgColor src="/assets/icons/orders/download-01.svg" />
                                </Button>
                            </Tooltip>
                        )}
                    </Stack>
                    <Box sx={{ mt: "32px", mb: '40px', width: 0.7, mx: 'auto' }}>
                        <CheckoutSteps
                            activeStep={checkout.activeStep}
                            steps={hasCustomMade ?
                                (order.need_prepayment) ? PRODUCT_CHECKOUT_STEPS_CUSTOM : PRODUCT_CHECKOUT_STEPS_CUSTOM_PRE
                                :
                                (order.need_prepayment) ? PRODUCT_CHECKOUT_STEPS_READY : PRODUCT_CHECKOUT_STEPS_READY_PRE
                            }
                        />
                    </Box>
                </CompleteOrderLayout>
            </DialogTitle>

            {checkout.activeStep === 0 && (
                <DeliveryRecipientInformation
                    orderId={orderId}
                    order={order}
                    delivery_type={order.delivery_type}
                    dialog={finalOrderDialog}
                />
            )}

            {checkout.activeStep === 1 && (
                <CompleteInvoiceView dialog={finalOrderDialog}>
                    <InvoiceView
                        title={hasCustomMade ? 'پیش‌فاکتور فروش کالا‌و‌خدمات' : 'فاکتور فروش کالا‌و‌خدمات'}
                        orderProducts={orderProducts}
                    />
                </CompleteInvoiceView>
            )}

            {checkout.activeStep === 2 && (
                <Payment
                    finalOrderDialog={finalOrderDialog}
                    orderId={orderId}
                    hasCustomMade={hasCustomMade}
                    need_prepayment={order.need_prepayment}
                    production_days={order.production_days}
                />
            )}
        </DialogWithButton>
    )
}
