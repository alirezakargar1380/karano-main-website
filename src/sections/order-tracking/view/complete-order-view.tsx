import { Box, Container, Stack, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { PRODUCT_CHECKOUT_STEPS } from "src/_mock";
import FormProvider, { RHFTitleTextField } from "src/components/hook-form";
import { BlueNotification } from "src/components/notification";
import Scrollbar from "src/components/scrollbar";
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
            <Scrollbar >
                <Box sx={{ p: 4, bgcolor: 'white', borderRadius: '16px' }}>
                    <Typography variant="h4" sx={{ width: 1, pb: 2, fontFamily: 'peyda-bold', borderBottom: '1px solid #D1D1D1' }}>
                        نهایی کردن سفارش
                    </Typography>


                    <Container>
                        <Box sx={{ my: 3 }}>
                            <CheckoutSteps activeStep={checkout.activeStep} steps={PRODUCT_CHECKOUT_STEPS} />
                        </Box>

                        <Stack spacing={3}>
                            <Box sx={{ border: '2px solid #A9A9A9', borderRadius: '16px', p: 4 }}>
                                <Typography variant="h4" sx={{ width: 1, pb: 2, fontFamily: 'peyda-bold', borderBottom: '1px solid #D1D1D1' }}>
                                    اطلاعات تحویل گیرنده
                                </Typography>
                                <Stack direction={{ xs: 'column', sm: 'row' }} sx={{ mt: 2 }} spacing={2}>
                                    <RHFTitleTextField name='first_name' custom_label='نام' placeholder='نام' />
                                    <RHFTitleTextField name='first_name' custom_label='شماره تماس' placeholder='+98' />
                                </Stack>
                            </Box>

                            <Box sx={{ border: '2px solid #A9A9A9', borderRadius: '16px', p: 4 }}>
                                <Typography variant="h4" sx={{ width: 1, pb: 2, fontFamily: 'peyda-bold', borderBottom: '1px solid #D1D1D1' }}>
                                    آدرس تحویل گیرنده
                                </Typography>
                                <Stack direction={{ xs: 'column', sm: 'row' }} sx={{ mt: 2 }} spacing={2}>
                                    <RHFTitleTextField name='first_name' custom_label='نام' placeholder='نام' />
                                    <RHFTitleTextField name='first_name' custom_label='شماره تماس' placeholder='+98' />
                                </Stack>
                            </Box>

                            <Box sx={{ border: '2px solid #A9A9A9', borderRadius: '16px', p: 4 }}>
                                <Typography variant="h4" sx={{ width: 1, pb: 2, fontFamily: 'peyda-bold', borderBottom: '1px solid #D1D1D1' }}>
                                    مشخصات صاحب فاکتور
                                </Typography>
                                <BlueNotification>
                                    می‌توانید فاکتور را به نام خود و یا فرد دیگری انتخاب کنید.
                                </BlueNotification>
                                <Stack direction={{ xs: 'column', sm: 'row' }} sx={{ mt: 2 }} spacing={2}>
                                    <RHFTitleTextField name='first_name' custom_label='نام' placeholder='نام' />
                                    <RHFTitleTextField name='first_name' custom_label='شماره تماس' placeholder='+98' />
                                </Stack>
                            </Box>
                        </Stack>



                    </Container>



                </Box></Scrollbar>
        </FormProvider >

    )
}