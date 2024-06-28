import { LoadingButton } from "@mui/lab";
import { Box, Stack, Typography } from "@mui/material";
import FormProvider, { RHFTitleTextField } from "src/components/hook-form";
import { BlueNotification } from "src/components/notification";
import { StyledRoundedWhiteButton } from "src/components/styles/props/rounded-white-button";
import { useCheckoutContext } from "../checkout/context";
import { useForm } from "react-hook-form";
import { endpoints, server_axios } from "src/utils/axios";
import DeliveryAdresses from "./delivery-addresses";
import { useAuthContext } from "src/auth/hooks";
import { useEffect, useState } from "react";

interface Props {
    orderId: number
}

enum InvoiceOwner {
    me = "me",
    another = "another"
}

export function DeliveryRecipientInformation({ orderId }: Props) {
    const [invoiceOwner, setInvoiceOwner] = useState<InvoiceOwner>(InvoiceOwner.me)

    const checkout = useCheckoutContext();
    const { user } = useAuthContext();


    const defaultValues = {
        reciver_name: '',
        reciver_phone: '',
        invoice_owner: {
            first_name: '',
            last_name: '',
            id_code: ''
        }
    }

    const methods = useForm({
        // resolver: yupResolver(NewProductSchema),
        defaultValues
    });

    const {
        reset,
        watch,
        setValue,
        handleSubmit,
        formState: { isSubmitting },
    } = methods;

    const onSubmit = handleSubmit(async (data) => {
        try {
            console.info('DATA', data);
            await server_axios.patch(endpoints.orders.update(orderId), data)
        } catch (error) {
            console.error(error);
        }
    });

    useEffect(() => {
        if (invoiceOwner === InvoiceOwner.me && user) {
            reset({
                ...defaultValues,
                invoice_owner: {
                    first_name: user.first_name,
                    last_name: user.last_name,
                    id_code: user.id_code,
                }
            });
        } else {
            reset(defaultValues);
        }
    }, [invoiceOwner])

    return (
        <Stack spacing={3}>
            <FormProvider methods={methods} onSubmit={onSubmit}>
                <Box sx={{ border: '2px solid #A9A9A9', borderRadius: '16px', p: 4 }}>
                    <Typography variant="h4" sx={{ width: 1, pb: 2, fontFamily: 'peyda-bold', borderBottom: '1px solid #D1D1D1' }}>
                        اطلاعات تحویل گیرنده
                    </Typography>
                    <Stack direction={{ xs: 'column', sm: 'row' }} sx={{ mt: 2 }} spacing={2}>
                        <RHFTitleTextField name='reciver_name' custom_label='نام' placeholder='نام' />
                        <RHFTitleTextField name='reciver_phone' custom_label='شماره تماس' placeholder='+98' />
                    </Stack>
                </Box>
            </FormProvider>

            <DeliveryAdresses orderId={orderId} />

            <FormProvider methods={methods} onSubmit={onSubmit}>
                <Box sx={{ border: '2px solid #A9A9A9', borderRadius: '16px', p: 4 }}>
                    <Typography variant="h4" sx={{ width: 1, pb: 2, fontFamily: 'peyda-bold', borderBottom: '1px solid #D1D1D1' }}>
                        مشخصات صاحب فاکتور
                    </Typography>
                    <BlueNotification sx={{ mt: 2 }}>
                        می‌توانید فاکتور را به نام خود و یا فرد دیگری انتخاب کنید.
                    </BlueNotification>
                    <Stack direction={"row"} sx={{ p: 1.25, borderRadius: '12px', bgcolor: '#F2F2F2', textAlign: 'center', fontFamily: 'peyda-bold', my: 2 }}>
                        <Box
                            onClick={() => setInvoiceOwner(InvoiceOwner.me)}
                            sx={{
                                width: '50%', py: 1, borderRadius: '8px', cursor: 'pointer',
                                gcolor: '#F2F2F2',
                                ...(invoiceOwner === InvoiceOwner.me && {
                                    bgcolor: '#FFF'
                                })
                            }}
                        >
                            خودم
                        </Box>
                        <Box
                            onClick={() => setInvoiceOwner(InvoiceOwner.another)}
                            sx={{
                                width: '50%', py: 1, borderRadius: '8px', cursor: 'pointer',
                                bgcolor: '#F2F2F2',
                                ...(invoiceOwner === InvoiceOwner.another && {
                                    bgcolor: '#FFF'
                                })
                            }}
                        >
                            فرد دیگر
                        </Box>
                    </Stack>
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
                        <RHFTitleTextField name='invoice_owner.first_name' custom_label='نام' placeholder='نام' />
                        <RHFTitleTextField name='invoice_owner.last_name' custom_label='نام خانوادگی' placeholder='بدر' />
                        <RHFTitleTextField name='invoice_owner.id_code' custom_label='کد ملی' placeholder='بدر' />
                    </Stack>
                </Box>


                <Stack sx={{ mt: 2 }} direction={'row'} spacing={1} justifyContent={'end'}>
                    <StyledRoundedWhiteButton variant='outlined' sx={{ px: 4 }}>انصراف</StyledRoundedWhiteButton>
                    <LoadingButton
                        variant='contained'
                        sx={{ borderRadius: '24px', px: 4 }}
                        //  onClick={() => checkout.onNextStep()}
                        type="submit"
                    >
                        ثبت و ادامه
                    </LoadingButton>
                </Stack>
            </FormProvider>
        </Stack>
    )
}