import { useRef, useState, useEffect, useCallback } from 'react';

import { DialogProps } from '@mui/material/Dialog';

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

import { useSnackbar } from 'src/components/snackbar';

// ----------------------------------------------------------------------
interface Props {
    dialog: useBooleanReturnType
}


export default function HowToSendDialog({ dialog }: Props) {
    const checkout = useCheckoutContext();
    const { enqueueSnackbar } = useSnackbar();

    const defaultValues = {
        delivery_type: 'tehran',
        helo: 'hh'
    };

    const methods = useForm({
        defaultValues,
    });

    const { reset, watch, control, setValue, handleSubmit } = methods;

    const values = watch();

    const [scroll, setScroll] = useState<DialogProps['scroll']>('paper');

    const handleClickOpen = useCallback(
        (scrollType: DialogProps['scroll']) => () => {
            dialog.onTrue();
            //   setScroll(scrollType);
        },
        [dialog]
    );

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
            console.log(data);
            // await server_axios.post(endpoints.orders.create, {
            //     ...data,
            //     items: checkout.items
            // })
            //     .then(({ data }) => {
            //         console.log(data);
            //         enqueueSnackbar('سفارش شما ثبت شد', {
            //             variant: 'info'
            //         })
            //     })

            console.log(data)
        } catch (error) {
            console.error(error);
        }
    });

    return (
        <DialogWithButton dialog={dialog} fullWith={false} width={640} sx={{ minWidth: {
            md: 640,
            sm: 480,
        } }}>
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
                                    value: 'factory'
                                },
                                {
                                    label: 'تحویل در شهرستان',
                                    value: 'city'
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
