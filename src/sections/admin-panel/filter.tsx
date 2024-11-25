'use client';

import { Stack, Typography } from "@mui/material";
import FormProvider, { RHFMultiSelect } from "src/components/hook-form";
import { useForm } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from 'yup';
import { OrderStatus } from "src/types/order";

export default function Filter() {

    const schema = Yup.object().shape({
    });

    const methods = useForm({
        resolver: yupResolver<any>(schema),
        defaultValues: {},
    });

    const {
        reset,
        handleSubmit,
        watch,
        formState: { isSubmitting },
    } = methods;

    const values = watch();

    const onSubmit = handleSubmit(async () => {
        try {
        } catch (error) {
            console.error(error);
            reset();
        }
    });

    return (
        <FormProvider methods={methods} onSubmit={onSubmit}>
            <Stack sx={{ width: 1 }} direction={'row'} spacing={2} alignItems={'center'}>
                <Typography variant="h5" fontFamily={'peyda-bold'}>لیست سفارش ها</Typography>
                <RHFMultiSelect
                    name="dsdf"
                    label="وضعیت سفارش"
                    value="1"
                    options={[
                        {
                            label: 'در حال آماده‌سازی',
                            value: '1'
                        },
                        {
                            label: 'منقضی‌شده',
                            value: '2'
                        },
                        {
                            label: 'آماده‌شده',
                            value: '4'
                        },
                        {
                            label: 'تایید‌شده',
                            value: '5'
                        },
                        {
                            label: 'رد‌شده',
                            value: OrderStatus.failed
                        },
                        {
                            label: 'در حال تولید',
                            value: OrderStatus.production
                        },
                        {
                            label: 'تولیدشده',
                            value: '5'
                        },
                        {
                            label: 'در انتظار پرداخت نهایی',
                            value: '5'
                        },
                        {
                            label: 'آماده ارسال',
                            value: '5'
                        },
                        {
                            label: 'ارسال‌شده',
                            value: '5'
                        },
                        {
                            label: 'اصلاح‌شده',
                            value: '5'
                        },
                        {
                            label: 'عدم موجودی',
                            value: '5'
                        },
                    ]}
                    checkbox
                    icon="/assets/icons/admin-panel/flag-01.svg"
                    inputProps={{
                        sx: {
                            py: '4px!important',
                        }
                    }}
                    sx={{
                        bgcolor: 'white',
                        borderRadius: '24px!important',
                        '& fieldset': {
                            borderRadius: '24px!important',
                        },
                    }}
                />
                <RHFMultiSelect
                    name="dsdf"
                    label="تاریخ"
                    value="1"
                    options={[
                        {
                            label: 'فردا',
                            value: '1'
                        },
                        {
                            label: 'دو روز آینده',
                            value: '2'
                        },
                        {
                            label: 'یک هفته آینده',
                            value: '4'
                        }
                    ]}
                    icon="/assets/icons/admin-panel/calandar.svg"
                    inputProps={{
                        sx: {
                            py: '4px!important',
                        }
                    }}
                    sx={{
                        bgcolor: 'white',
                        borderRadius: '24px!important',
                        '& fieldset': {
                            borderRadius: '24px!important',
                        },
                    }}
                />
            </Stack>
        </FormProvider>
    )
}