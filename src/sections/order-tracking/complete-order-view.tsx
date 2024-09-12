import { Box, Button, Container, DialogActions, DialogContent, DialogTitle, Stack, Tooltip, Typography } from "@mui/material";
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
import { StyledRoundedWhiteButton } from "src/components/styles/props/rounded-white-button";
import { LoadingButton } from "@mui/lab";
import { endpoints, server_axios } from "src/utils/axios";
import { OrderStatus } from "src/types/order";
import { DialogWithButton } from "src/components/custom-dialog";
import CompleteInvoiceView from "./complete-invoice-view";
import SvgColor from "src/components/svg-color";

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
            <DialogTitle>
                <Stack direction={'row'} justifyContent={'space-between'} spacing={2} sx={{ px: 0, pt: 1 }} borderBottom={'1px solid #D1D1D1'}>
                    <Stack direction={'row'} spacing={2}>
                        <Typography variant="h4" sx={{ pb: 2, fontFamily: 'peyda-bold', }}>
                            نهایی کردن سفارش
                        </Typography>
                        <Label color="info" fontFamily={'peyda-bold'} px={4} mt={0.75}>
                            تاریخ تحویل:
                            <Box pl={0.5}>{fToJamali(order.production_date)}</Box>
                        </Label>
                    </Stack>
                    {checkout.activeStep === 1 && (
                        <Tooltip title="دانلود ‌فاکتور" arrow>
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
                <Box sx={{ mt: 6, width: 0.7, mx: 'auto' }}>
                    <CheckoutSteps
                        activeStep={checkout.activeStep}
                        steps={hasCustomMade ?
                            (order.need_prepayment) ? PRODUCT_CHECKOUT_STEPS_CUSTOM : PRODUCT_CHECKOUT_STEPS_CUSTOM_PRE
                            :
                            (order.need_prepayment) ? PRODUCT_CHECKOUT_STEPS_READY : PRODUCT_CHECKOUT_STEPS_READY_PRE
                        }
                    />
                </Box>
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

            {/* <DialogContent>
                <Scrollbar>
                    <Box sx={{ px: 2, pb: 3, pt: 2, bgcolor: 'white', borderRadius: '16px' }}>

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
                            />
                        )}

                        {checkout.activeStep === 2 && (
                            <Payment
                                finalOrderDialog={finalOrderDialog}
                                orderId={orderId}
                                hasCustomMade={hasCustomMade}
                                need_prepayment={order.need_prepayment}
                                production_days={order.production_days}
                            // submitHandler={(n) => handleAfterLastSection(n)}
                            />
                        )}
                    </Box>
                </Scrollbar>
            </DialogContent> */}
            {/* <DialogActions>
                <StyledRoundedWhiteButton variant='outlined' sx={{ px: 4 }} onClick={checkout.onBackStep}>
                    انصراف
                </StyledRoundedWhiteButton>
                <LoadingButton
                    variant='contained'
                    sx={{ borderRadius: '24px', px: 4 }}
                    type="submit"
                // onClick={checkout.onNextStep}
                >
                    ثبت و ادامه
                </LoadingButton>
            </DialogActions> */}
        </DialogWithButton>
    )
}