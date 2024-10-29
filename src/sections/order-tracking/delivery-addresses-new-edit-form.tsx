import { LoadingButton } from "@mui/lab";
import { Box, Checkbox, Divider, MenuItem, Radio, Stack, TextField, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import FormProvider, {
    RHFSelect,
    RHFTitleTextField,
} from 'src/components/hook-form';
import { useSnackbar } from 'src/components/snackbar';
import { SecondaryButton } from "src/components/styles/buttons/secondary";
import { useBooleanReturnType } from "src/hooks/use-boolean";
import { endpoints, server_axios } from "src/utils/axios";

import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useGetProvinceCities, useGetProvinces } from "src/api/province";
import { useEffect, useState } from "react";
import Iconify from "src/components/iconify";
import Scrollbar from "src/components/scrollbar";
import { PrimaryButton } from "src/components/styles/buttons/primary";
import { useGetAddress } from "src/api/address";

interface Props {
    id: number | undefined
    handleAfterAddingAddress?: () => void
    exit?: () => void
}

export function DeliveryAdressesNewEditForm({ id, handleAfterAddingAddress, exit }: Props) {
    const [searchTerm, setSearchTerm] = useState('');

    const { enqueueSnackbar } = useSnackbar();

    const NewAddressSchema = Yup.object().shape({
        address: Yup.string().required('پرکردن این فیلد اجباری‌ست.'),
        postal_code: Yup.string().required('پرکردن این فیلد اجباری‌ست.'),
        province: Yup.number().required('پرکردن این فیلد اجباری‌ست.').notOneOf([0], 'پرکردن این فیلد اجباری‌ست.'),
        city: Yup.number().required('پرکردن این فیلد اجباری‌ست.').notOneOf([0], 'پرکردن این فیلد اجباری‌ست.'),
    });

    const methods = useForm({
        resolver: yupResolver(NewAddressSchema),
        defaultValues: {
            address: '',
            postal_code: '',
            province: 0,
            city: 0
        },
    });

    const {
        handleSubmit,
        reset,
        watch,
        formState: { isValid }
    } = methods;

    const values = watch();

    const { provinces } = useGetProvinces();
    const { cities } = useGetProvinceCities(values.province);
    const { address, addressEmpty, refresh } = useGetAddress(id);

    useEffect(() => {
        if (addressEmpty) return

        reset({
            address: address?.address || '',
            postal_code: address?.postal_code || '',
            province: address?.province?.id || 0,
            city: address?.city?.id || 0
        })
    }, [addressEmpty])

    const onSubmit = handleSubmit(async (data) => {
        try {
            console.info('DATA', data);
            if (id) {
                await server_axios.patch(endpoints.addresses.one(id), data)
            } else {
                await server_axios.post(endpoints.addresses.create, data)
            }
            handleAfterAddingAddress?.();
        } catch (error) {
            console.error(error);
        }
    });

    const filteredProvinces = searchTerm
        ? provinces.filter(province =>
            province.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
        : provinces;

    useEffect(() => refresh(), [id])

    useEffect(() => {
        if (values.province === 0 || id) return
        methods.setValue('city', 0)
    }, [values.province])

    return (
        <FormProvider methods={methods} onSubmit={onSubmit}>
            <Box sx={{ mt: 3 }}>
                <Box sx={{ mt: 2 }}>
                    <RHFTitleTextField name='address' custom_label='آدرس پستی' placeholder='افزودن محتوا' sx={{ bgcolor: '#fff' }} />
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
                    <Box>
                        <Typography fontFamily={'peyda-bold'} sx={{ pb: 0.5, pl: 0.75 }} variant='body2'>استان</Typography>
                        <RHFSelect
                            name="province"
                            placeholder="انتخاب محتوا"
                            sx={{ bgcolor: '#fff' }}
                        >
                            {/* <MenuItem sx={{ '&:hover': { bgcolor: 'transparent', cursor: 'default' }, position: 'sticky' }}> */}
                            {/* <TextField
                                sx={{
                                    bgcolor: '#F8F8F8',
                                    width: 1,
                                    my: 1,
                                    py: 0.5,
                                    borderRadius: '8px',
                                    '& fieldset': {
                                        border: 'none'
                                    }
                                }}
                                InputProps={{
                                    startAdornment: (
                                        <Iconify icon={'eva:search-fill'} sx={{ mr: 1 }} />
                                    )
                                }}
                                size="small"
                                placeholder="جستجو"
                                onClick={(e) => e.stopPropagation()}
                                onKeyDown={(e) => e.stopPropagation()}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            /> */}
                            <MenuItem
                                value={0}
                                sx={{ fontStyle: 'italic', color: 'text.secondary', typography: 'caption1' }}
                                disabled
                            >
                                انتخاب محتوا
                            </MenuItem>
                            <Divider sx={{ borderStyle: 'dashed' }} />
                            {filteredProvinces.map((item, index) => (
                                <MenuItem value={item.id} key={index}>{item.name}</MenuItem>
                            ))}
                        </RHFSelect>
                    </Box>
                    <Box>
                        <Typography fontFamily={'peyda-bold'} sx={{ pb: 0.5, pl: 0.75 }} variant='body2'>شهر</Typography>
                        <RHFSelect
                            name="city"
                            placeholder="انتخاب محتوا"
                            sx={{ bgcolor: '#fff' }}
                        >
                            <MenuItem
                                value={0}
                                sx={{ fontStyle: 'italic', color: 'text.secondary', typography: 'caption1' }}
                                disabled
                            >
                                انتخاب محتوا
                            </MenuItem>
                            <Divider sx={{ borderStyle: 'dashed' }} />
                            {cities.map((item, index) => (
                                <MenuItem value={item.id} key={index}>{item.name}</MenuItem>
                            ))}
                        </RHFSelect>
                    </Box>
                    <RHFTitleTextField name='postal_code' custom_label='کد پستی' placeholder='افزودن محتوا' sx={{ bgcolor: '#fff' }} />
                </Stack>
                <Stack sx={{ mt: 6 }} spacing={1} direction={'row'} justifyContent={'end'}>
                    <SecondaryButton size='medium' sx={{ px: 4 }} onClick={exit}>انصراف</SecondaryButton>
                    <PrimaryButton
                        size="medium"
                        onClick={() => {
                            if (!isValid)
                                enqueueSnackbar('پرکردن فیلدهای اجباری «اطلاعات آدرس جدید»، الزامی‌ست.', {
                                    variant: 'myCustomVariant',
                                    color: 'error'
                                })

                            onSubmit();
                        }}
                    >
                        {id ? 'اعمال تغییرات' : 'ثبت آدرس'}
                    </PrimaryButton>
                </Stack>
            </Box>
        </FormProvider>
    )
}