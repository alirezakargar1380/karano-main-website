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
import { DeliveryRecipientInformation } from "../delivery-recipient-information";
import InvoiceView from "../invoice-view";
import Payment from "../payment";


export default function CompleteOrderView() {
    const checkout = useCheckoutContext();

    const currentInvoice = _invoices.filter((invoice) => invoice.id === "e99f09a7-dd88-49d5-b1c8-1daf80c2d7b2")[0];

    useEffect(() => {
        // checkout.onNextStep()
        // checkout.onBackStep()
        // checkout.onGotoStep(0)
        console.log(checkout.activeStep)
    }, [])


    const methods = useForm({
        // resolver: yupResolver(NewAddressSchema),
        defaultValues: {},
    });

    return (
        <FormProvider methods={methods}>
            <Scrollbar >
                <Box sx={{ p: 4, bgcolor: 'white', borderRadius: '16px' }}>
                    <Typography variant="h4" sx={{ width: 1, pb: 2, fontFamily: 'peyda-bold', borderBottom: '1px solid #D1D1D1' }}>
                        نهایی کردن سفارش
                    </Typography>


                    <Container>
                        <Box sx={{ my: 3 }}>
                            <CheckoutSteps activeStep={checkout.activeStep} steps={PRODUCT_CHECKOUT_STEPS} />
                        </Box>


                        {checkout.activeStep === 0 && <DeliveryRecipientInformation />}
                        {checkout.activeStep === 1 && <InvoiceView invoice={currentInvoice} />}
                        {checkout.activeStep === 2 && <Payment />}


                    </Container>



                </Box></Scrollbar>
        </FormProvider >

    )
}