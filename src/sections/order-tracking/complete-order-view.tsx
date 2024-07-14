import { Box, Container, Stack, Typography } from "@mui/material";
import { borderRadius } from "@mui/system";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { PRODUCT_CHECKOUT_STEPS, _invoices } from "src/_mock";
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

interface Props {
    orderId: number
    finalOrderDialog: useBooleanReturnType
    hasCustomMade: boolean
}

export default function CompleteOrderView({ orderId, finalOrderDialog, hasCustomMade }: Props) {
    const checkout = useCheckoutContext();

    const { orderProducts } = useGetOrderProducts(orderId);

    useEffect(() => {
        checkout.onGotoStep(0)
        // console.log(checkout.activeStep)
    }, [])

    return (
        <Scrollbar>
            <Box sx={{ p: 4, bgcolor: 'white', borderRadius: '16px' }}>
                <Typography variant="h4" sx={{ width: 1, pb: 2, fontFamily: 'peyda-bold', borderBottom: '1px solid #D1D1D1' }}>
                    نهایی کردن سفارش
                </Typography>

                <Container>
                    <Box sx={{ my: 3 }}>
                        <CheckoutSteps
                            activeStep={checkout.activeStep}
                            steps={PRODUCT_CHECKOUT_STEPS}
                        />
                    </Box>

                    {checkout.activeStep === 0 && (
                        <DeliveryRecipientInformation orderId={orderId} />
                    )}

                    {checkout.activeStep === 1 && (
                        <InvoiceView
                            orderProducts={orderProducts}
                            submitHandler={checkout.onNextStep}
                        />
                    )}

                    {checkout.activeStep === 2 && (
                        <Payment
                            finalOrderDialog={finalOrderDialog}
                            orderId={orderId}
                            hasCustomMade={hasCustomMade}
                        />
                    )}


                </Container>
            </Box>
        </Scrollbar>
    )
}