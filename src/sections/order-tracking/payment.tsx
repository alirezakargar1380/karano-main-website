import { Box, Button, Typography } from "@mui/material";
import { useCheckoutContext } from "../checkout/context";
import { Stack } from "@mui/system";
import { StyledRoundedWhiteButton } from "src/components/styles/props/rounded-white-button";
import { LoadingButton } from "@mui/lab";
import { IInvoice } from "src/types/invoice";
import { useBooleanReturnType } from "src/hooks/use-boolean";
import { endpoints, server_axios } from "src/utils/axios";
import { OrderStatus } from "src/types/order";
import { useEffect } from "react";
import FormProvider, { RHFTitleTextField } from "src/components/hook-form";
import { useForm } from "react-hook-form";

interface Props {
    orderId: number
    finalOrderDialog: useBooleanReturnType
    hasCustomMade: boolean
    need_prepayment: boolean
    production_days: number
    // submitHandler: (need_prepayment: boolean) => void
}

export default function Payment({
    finalOrderDialog,
    hasCustomMade,
    orderId,
    need_prepayment,
    production_days,
    // submitHandler
}: Props) {
    const checkout = useCheckoutContext();

    // useEffect(() => {
    //     if (need_prepayment) {
    //         // submitHandler(need_prepayment);
    //         handle();
    //     }
    // }, [need_prepayment])

    const handle = async () => {
        // await server_axios.patch(endpoints.orders.update(orderId), {
        //     status: (hasCustomMade) ? OrderStatus.production : (production_days <= 1) ? OrderStatus.ready_to_send : OrderStatus.preparing
        // })
        // finalOrderDialog.onFalse();
        // submitHandler(need_prepayment)
    }

    const methods = useForm({
        // resolver: yupResolver(NewProductSchema),
        defaultValues: {}
    });

    const {
        reset,
        watch,
        setValue,
        handleSubmit,
        formState: { isSubmitting },
    } = methods;

    return (
        <FormProvider methods={methods}>
            <Box>
                <Typography variant="h4" sx={{ width: 1, pb: 2, fontFamily: 'peyda-bold', borderBottom: '1px solid #D1D1D1' }}>
                    پیش پرداخت
                </Typography>
                <Box sx={{ border: '2px solid #A9A9A9', borderRadius: '16px', p: 4, my: 4 }}>
                    <Typography variant="h4" sx={{ width: 1, pb: 2, fontFamily: 'peyda-bold', borderBottom: '1px solid #D1D1D1' }}>
                        مشخصات صاحب فاکتور
                    </Typography>
                    <Typography variant="body2" sx={{ width: 1, py: 2, fontFamily: 'peyda-regular' }}>
                        در صورت داشتن کد تخفیف، آن را وارد کنید.
                    </Typography>
                    <Box sx={{ width: 'fit-content' }}>
                        <RHFTitleTextField
                            custom_label="کد تخفیف"
                            name="code"
                            placeholder="کد تخفیف را وارد کنید"
                            InputProps={{
                                endAdornment: (
                                    <Button variant="outlined" sx={{ mr: 1 }}>ثبت</Button>
                                )
                            }}
                        />
                    </Box>
                    <Stack
                        direction={{ xs: 'column', sm: 'row' }}
                        display="grid"
                        gridTemplateColumns={{
                            xs: 'repeat(1, 1fr)',
                            md: 'repeat(2, 1fr)',
                        }}
                        sx={{ mt: 2 }}
                        spacing={2}
                    >
                    </Stack>
                </Box>

                {/* <Stack sx={{ mt: 2 }} direction={'row'} spacing={1} justifyContent={'end'}>
                    <StyledRoundedWhiteButton variant='outlined' sx={{ px: 4 }} onClick={() => checkout.onBackStep()}>مرحله قبل</StyledRoundedWhiteButton>
                    <LoadingButton variant='contained' sx={{ borderRadius: '24px', px: 4 }} onClick={() => handle()}>ثبت و ادامه</LoadingButton>
                </Stack> */}
            </Box>
        </FormProvider>
    )
}