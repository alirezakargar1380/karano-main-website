import { LoadingButton } from "@mui/lab";
import { Box, DialogActions, InputAdornment, MenuItem, Select, Stack, Typography } from "@mui/material";
import FormProvider, { RHFTextField, RHFTitleTextField } from "src/components/hook-form";
import { BlueNotification } from "src/components/notification";
import { StyledRoundedWhiteButton } from "src/components/styles/props/rounded-white-button";
import { useCheckoutContext } from "../checkout/context";
import { useForm } from "react-hook-form";
import { endpoints, server_axios } from "src/utils/axios";
import DeliveryAdresses from "./delivery-addresses";
import { useAuthContext } from "src/auth/hooks";
import { useEffect, useState } from "react";
import { IOrderDeliveryType } from "src/types/order";
import { countries } from "src/assets/data";
import Iconify from "src/components/iconify";
import Scrollbar from "src/components/scrollbar";

interface Props {
    orderId: number,
    delivery_type: IOrderDeliveryType
}

enum InvoiceOwner {
    me = "me",
    another = "another"
}

export function DeliveryRecipientInformation({ orderId, delivery_type }: Props) {
    const [invoiceOwner, setInvoiceOwner] = useState<InvoiceOwner>(InvoiceOwner.me)

    const checkout = useCheckoutContext();
    const { user } = useAuthContext();


    const defaultValues = {
        reciver_name: '',
        reciver_phone: '+98',
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
            checkout.onNextStep()
        } catch (error) {
            console.error(error);
        }
    });

    const values = watch();

    useEffect(() => {
        if (invoiceOwner === InvoiceOwner.me && user) {
            reset({
                ...values,
                invoice_owner: {
                    first_name: user.first_name,
                    last_name: user.last_name,
                    id_code: user.id_code,
                }
            });
        } else {
            reset({
                ...defaultValues,
                reciver_name: values.reciver_name,
                reciver_phone: values.reciver_phone,
            });
        }
    }, [invoiceOwner]);

    return (
        <Box>

            {/* <Scrollbar> */}
            <Stack spacing={3}>
                <FormProvider methods={methods} onSubmit={onSubmit}>
                    <Box sx={{ border: '2px solid #A9A9A9', borderRadius: '16px', p: 4 }}>
                        <Typography variant="h6" sx={{ width: 1, pb: 2, fontFamily: 'peyda-bold', borderBottom: '1px solid #D1D1D1' }}>
                            اطلاعات تحویل گیرنده
                        </Typography>
                        <Stack direction={{ xs: 'column', sm: 'row' }} sx={{ mt: 2 }} spacing={2}>
                            <RHFTitleTextField name='reciver_name' custom_label='نام و نام خانوادگی' placeholder='نام و نام خانوادگی' />
                            {/* <RHFTitleTextField name='reciver_phone' custom_label='شماره تماس' placeholder='+98' /> */}
                            <RHFTitleTextField
                                name="reciver_phone"
                                custom_label='شماره تماس'
                                sx={{
                                    '.MuiInputBase-input': {
                                        textAlign: 'right!important',
                                        direction: 'rtl!important'
                                    }
                                }}
                                type={'text'}
                                placeholder='09123456789'
                                onChange={(e) => {
                                    if (!e.target.value.startsWith('+98')) {
                                        setValue('reciver_phone', '+98')
                                    } else {
                                        setValue('reciver_phone', e.target.value)
                                    }
                                }}
                            />
                        </Stack>
                    </Box>
                </FormProvider>

                {delivery_type === IOrderDeliveryType.tehran && (<DeliveryAdresses orderId={orderId} />)}

                <FormProvider methods={methods} onSubmit={onSubmit}>
                    <Box sx={{ border: '2px solid #A9A9A9', borderRadius: '16px', p: 4 }}>
                        <Typography variant="h6" sx={{ width: 1, pb: 2, fontFamily: 'peyda-bold', borderBottom: '1px solid #D1D1D1' }}>
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
                            sx={{ mt: 3 }}
                            spacing={2}
                        >
                            <RHFTitleTextField name='invoice_owner.first_name' custom_label='نام' placeholder='نام' />
                            <RHFTitleTextField name='invoice_owner.last_name' custom_label='نام خانوادگی' placeholder='بدر' />
                            <RHFTitleTextField name='invoice_owner.id_code' custom_label='کد ملی' placeholder='بدر' />
                        </Stack>
                    </Box>



                </FormProvider>
            </Stack>
        </Box>
    )
}