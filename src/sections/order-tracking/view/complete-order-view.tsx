import { Box, Stack, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { PRODUCT_CHECKOUT_STEPS } from "src/_mock";
import FormProvider, { RHFTitleTextField } from "src/components/hook-form";
import CheckoutSteps from "src/sections/checkout/checkout-steps";
import { useCheckoutContext } from "src/sections/checkout/context";


export default function CompleteOrderView() {
    const checkout = useCheckoutContext();

    const methods = useForm({
        // resolver: yupResolver(NewAddressSchema),
        defaultValues: {},
    });

    return (
        <FormProvider methods={methods}>
            <Box sx={{ p: 4, bgcolor: 'white', borderRadius: '16px' }}>
                <Typography variant="h4" sx={{ width: 1, pb: 2, fontFamily: 'peyda-bold', borderBottom: '1px solid #D1D1D1' }}>
                    نهایی کردن سفارش
                </Typography>

                <Box sx={{ my: 3 }}>
                    <CheckoutSteps activeStep={checkout.activeStep} steps={PRODUCT_CHECKOUT_STEPS} />
                </Box>

                <Box sx={{ border: '2px solid #A9A9A9', borderRadius: '16px', p: 4 }}>
                    <Typography variant="h4" sx={{ width: 1, pb: 2, fontFamily: 'peyda-bold', borderBottom: '1px solid #D1D1D1' }}>
                        اطلاعات تحویل گیرنده
                    </Typography>
                    <Stack direction={{ xs: 'column', sm: 'row' }} sx={{ mt: 2 }} spacing={2}>
                        <RHFTitleTextField name='first_name' custom_label='نام' placeholder='نام' />
                        <RHFTitleTextField name='first_name' custom_label='نام' placeholder='نام' />
                    </Stack>
                </Box>
            </Box>
        </FormProvider >

    )
}