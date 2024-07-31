import { Box, Container, Stack, Typography } from "@mui/material";
import { borderRadius } from "@mui/system";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { _invoices } from "src/_mock";
import FormProvider, { RHFTitleTextField } from "src/components/hook-form";
import { BlueNotification } from "src/components/notification";
import Scrollbar from "src/components/scrollbar";
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
        checkout.onGotoStep(0) // console.log(checkout.activeStep)
    }, []);

    return (
        <Scrollbar>
            <Box sx={{ px: 2, pb: 3, pt: 2, bgcolor: 'white', borderRadius: '16px' }}>
                <Stack direction={'row'} spacing={2} borderBottom={'1px solid #D1D1D1'}>
                    <Typography variant="h4" sx={{ pb: 2, fontFamily: 'peyda-bold', }}>
                        نهایی کردن سفارش
                    </Typography>
                    <Label color="info" fontFamily={'peyda-bold'} px={4} mt={0.75}>
                        تاریخ تحویل:
                        <Box pl={0.5}>{fToJamali(order.production_date)}</Box>
                    </Label>
                </Stack>

                <Container>
                    <Box sx={{ my: 3, width: 0.7, mx: 'auto' }}>
                        <CheckoutSteps
                            activeStep={checkout.activeStep}
                            steps={hasCustomMade ?
                                (order.need_prepayment) ? PRODUCT_CHECKOUT_STEPS_CUSTOM : PRODUCT_CHECKOUT_STEPS_CUSTOM_PRE
                                :
                                (order.need_prepayment) ? PRODUCT_CHECKOUT_STEPS_READY : PRODUCT_CHECKOUT_STEPS_READY_PRE}
                        />
                    </Box>

                    {checkout.activeStep === 0 && (
                        <DeliveryRecipientInformation orderId={orderId} delivery_type={order.delivery_type} />
                    )}

                    {checkout.activeStep === 1 && (
                        <InvoiceView
                            title={hasCustomMade ? 'مشاهده پیش فاکتور' : 'مشاهده فاکتور'}
                            orderProducts={orderProducts}
                            submitHandler={checkout.onNextStep}
                            onPrev={checkout.onBackStep}
                        />
                    )}

                    {checkout.activeStep === 2 && (
                        <Payment
                            finalOrderDialog={finalOrderDialog}
                            orderId={orderId}
                            hasCustomMade={hasCustomMade}
                            need_prepayment={order.need_prepayment}
                            production_days={order.production_days}
                            submitHandler={(n) => handleAfterLastSection(n)}
                        />
                    )}


                </Container>
            </Box>
        </Scrollbar>
    )
}