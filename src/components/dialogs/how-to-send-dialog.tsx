import { useRef, useEffect } from 'react';

import { useBooleanReturnType } from 'src/hooks/use-boolean';
import { Stack, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useForm } from 'react-hook-form';
import FormProvider, { RHFRadioGroupCard } from 'src/components/hook-form';
import { LoadingButton } from '@mui/lab';
import { SecondaryButton } from 'src/components/styles/buttons/secondary';
import DialogWithButton from '../custom-dialog/dialog-with-button';
import { useCheckoutContext } from 'src/sections/checkout/context';
import { endpoints, server_axios } from 'src/utils/axios';
import { PrimaryButton } from '../styles/buttons/primary';
import { useGetProvinceCities, useGetProvinces } from 'src/api/province';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

// ----------------------------------------------------------------------
interface Props {
    dialog: useBooleanReturnType
    afterSubmit?: () => void
}

export default function HowToSendDialog({ dialog, afterSubmit }: Props) {
    const checkout = useCheckoutContext();

    const Schema = Yup.object().shape({
        delivery_type: Yup.string().required('پرکردن این فیلد اجباری‌ست.'),
        province: Yup.object().when('delivery_type', {
            is: 'city',
            then: (schema) =>
                schema.shape({
                    id: Yup.number()
                        .required('پرکردن این فیلد اجباری‌ست.')
                        .notOneOf([0], 'پرکردن این فیلد اجباری‌ست.')
                }),
            otherwise: (schema) => schema.transform((value) => {
                if (value?.id === 0) return null
                return value
            }).nullable()
        }),
        city: Yup.object().when('delivery_type', {
            is: 'city',
            then: (schema) =>
                schema.shape({
                    id: Yup.number()
                        .required('پرکردن این فیلد اجباری‌ست.')
                        .notOneOf([0], 'پرکردن این فیلد اجباری‌ست.')
                }),
            otherwise: (schema) => schema.transform((value) => {
                if (value?.id === 0) return null
                return value
            }).nullable()
        }),
    });

    const defaultValues = {
        delivery_type: 'tehran',
        province: {
            id: 0
        },
        city: {
            id: 0
        }
    };

    const methods = useForm({
        resolver: yupResolver<any>(Schema),
        defaultValues,
    });

    const { watch, handleSubmit } = methods;

    const values = watch();

    console.log(values.province)

    const descriptionElementRef = useRef<HTMLElement>(null);

    useEffect(() => {
        if (dialog.value) {
            const { current: descriptionElement } = descriptionElementRef;
            if (descriptionElement) {
                descriptionElement.focus();
            }
        }
    }, [dialog.value]);

    const { provinces } = useGetProvinces();
    const { cities } = useGetProvinceCities(values.province?.id);

    const onSubmit = handleSubmit(async (data) => {
        try {
            await server_axios.post(endpoints.orders.create, data)
                .then(({ data }) => {
                    dialog.onFalse();
                    if (afterSubmit) afterSubmit();
                })

        } catch (error) {
            console.error(error);
        }
    });

    return (
        <DialogWithButton dialog={dialog} fullWith={false} width={640}>
            <FormProvider methods={methods} onSubmit={onSubmit}>
                <Box sx={{ bgcolor: 'white', borderRadius: '16px' }}>
                    <Typography variant="h4" sx={{ width: 1, pb: 2, fontFamily: 'peyda-bold', borderBottom: '1px solid #D1D1D1' }}>
                        جزئیات نحوه ارسال
                    </Typography>
                    <Box sx={{ mt: '24px' }}>
                        <RHFRadioGroupCard
                            name='delivery_type'
                            variant='body2'
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
                                            name: "province.id",
                                            options: [
                                                {
                                                    label: 'انتخاب محتوا',
                                                    value: 0
                                                },
                                                ...provinces.map((p) => {
                                                    return {
                                                        label: p.name,
                                                        value: p.id
                                                    }
                                                })
                                            ]
                                        },
                                        {
                                            lable: "شهر",
                                            name: "city.id",
                                            options: [
                                                {
                                                    label: 'انتخاب محتوا',
                                                    value: 0
                                                },
                                                ...cities?.map((p) => {
                                                    return {
                                                        label: p.name,
                                                        value: p.id
                                                    }
                                                })
                                            ]
                                        }
                                    ]
                                },
                            ]}
                            BSx={{
                                borderRadius: '16px',
                                '&:hover': {
                                    cursor: 'pointer',
                                    border: '1.5px solid #D1D1D1'
                                },
                                py: '20px',
                                ml: 0,
                                mb: '24px'
                            }}
                        />
                    </Box>
                    <Stack sx={{ mt: 0 }} direction={'row'} spacing={1} justifyContent={'end'}>
                        <SecondaryButton size='medium'>انصراف</SecondaryButton>
                        <PrimaryButton size='medium' type='submit'>تایید</PrimaryButton>
                    </Stack>
                </Box>
            </FormProvider>
        </DialogWithButton>
    );
}
