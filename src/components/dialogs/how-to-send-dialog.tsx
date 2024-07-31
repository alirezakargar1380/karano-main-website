import { useRef, useEffect } from 'react';

import { useBooleanReturnType } from 'src/hooks/use-boolean';
import { Stack, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useForm } from 'react-hook-form';
import FormProvider, { RHFRadioGroupCard } from 'src/components/hook-form';
import { LoadingButton } from '@mui/lab';
import { StyledRoundedWhiteButton } from '../styles/props/rounded-white-button';
import DialogWithButton from '../custom-dialog/dialog-with-button';
import { useCheckoutContext } from 'src/sections/checkout/context';
import { endpoints, server_axios } from 'src/utils/axios';

// ----------------------------------------------------------------------
interface Props {
    dialog: useBooleanReturnType
    afterSubmit?: () => void
}


export default function HowToSendDialog({ dialog, afterSubmit }: Props) {
    const checkout = useCheckoutContext();

    const defaultValues = {
        delivery_type: 'tehran',
        provice: '',
        city: ''
    };

    const methods = useForm({
        defaultValues,
    });

    const { handleSubmit } = methods;

    const descriptionElementRef = useRef<HTMLElement>(null);

    useEffect(() => {
        if (dialog.value) {
            const { current: descriptionElement } = descriptionElementRef;
            if (descriptionElement) {
                descriptionElement.focus();
            }
        }
    }, [dialog.value]);

    const onSubmit = handleSubmit(async (data) => {
        try {
            await server_axios.post(endpoints.orders.create, {
                ...data,
                items: checkout.items
            })
                .then(({ data }) => {
                    dialog.onFalse();
                    if (afterSubmit) afterSubmit();
                })

        } catch (error) {
            console.error(error);
        }
    });

    return (
        <DialogWithButton dialog={dialog} fullWith={false} width={640} sx={{
            minWidth: {
                md: 640,
                sm: 540,
            }
        }}>
            <FormProvider methods={methods} onSubmit={onSubmit}>
                <Box sx={{ p: 4, bgcolor: 'white', borderRadius: '16px' }}>
                    <Typography variant="h4" sx={{ width: 1, pb: 2, fontFamily: 'peyda-bold', borderBottom: '1px solid #D1D1D1' }}>
                        جزئیات نحوه ارسال
                    </Typography>
                    <Box sx={{ mt: 4 }}>
                        <RHFRadioGroupCard
                            name='delivery_type'
                            options={[
                                {
                                    label: 'تحویل در تهران',
                                    value: 'tehran',
                                    icon: '/assets/icons/orders/delivery/flag-01.svg'
                                },
                                {
                                    label: 'تحویل درب کارخانه',
                                    value: 'factory',
                                    icon: '/assets/icons/orders/delivery/building-07.svg'
                                },
                                {
                                    label: 'تحویل در شهرستان',
                                    value: 'city',
                                    icon: '/assets/icons/orders/delivery/marker-pin-01.svg',
                                    children: [
                                        {
                                            lable: "استان",
                                            name: "provice",
                                            options: [
                                                {
                                                    label: "بوشهر",
                                                    value: "بوشهر"
                                                }
                                            ]
                                        },
                                        {
                                            lable: "شهر",
                                            name: "city",
                                            options: [
                                                {
                                                    label: "برازجان",
                                                    value: "برازجان"
                                                }
                                            ]
                                        }
                                    ]
                                },
                            ]}
                            BSx={{
                                borderRadius: '8px',
                                '&:hover': {
                                    cursor: 'pointer',
                                    border: '1px solid #000'
                                },
                                py: 1
                            }}
                        />
                    </Box>
                    <Stack sx={{ mt: 2 }} direction={'row'} spacing={1} justifyContent={'end'}>
                        <StyledRoundedWhiteButton variant='outlined' sx={{ px: 4 }}>انصراف</StyledRoundedWhiteButton>
                        <LoadingButton variant='contained' sx={{ borderRadius: '24px', px: 4 }} type='submit'>تایید</LoadingButton>
                    </Stack>
                </Box>
            </FormProvider>
        </DialogWithButton>
    );
}
