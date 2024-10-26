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

interface Props {
    handleAfterAddingAddress: () => void
    exit: () => void
}

export function DeliveryAdressesNewEditForm({ handleAfterAddingAddress, exit }: Props) {
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
        watch,
        formState: { isValid }
    } = methods;

    const values = watch();

    const { provinces } = useGetProvinces();
    const { cities } = useGetProvinceCities(values.province);


    const onSubmit = handleSubmit(async (data) => {
        try {
            console.info('DATA', data);
            await server_axios.post(endpoints.addresses.create, data)
            handleAfterAddingAddress();
            enqueueSnackbar('آدرس جدید اضافه شد', {
                variant: 'info'
            })
        } catch (error) {
            console.error(error);
        }
    });

    const filteredProvinces = searchTerm
        ? provinces.filter(province =>
            province.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
        : provinces;

    useEffect(() => {
        if (values.province === 0) return
        methods.setValue('city', 0)
    }, [values.province])

    return (
        <FormProvider methods={methods} onSubmit={onSubmit}>
            <Box sx={{ border: '2px solid #D1D1D1', borderRadius: '16px', p: 4, mt: 3, bgcolor: '#F8F8F8' }}>
                <Typography variant="h4" sx={{ width: 1, pb: 2, fontFamily: 'peyda-bold', borderBottom: '1px solid #D1D1D1' }}>
                    اطلاعات آدرس جدید
                </Typography>
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
                            <TextField
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
                            />
                            {/* </MenuItem> */}

                            <MenuItem
                                value={0}
                                sx={{ fontStyle: 'italic', color: 'text.secondary' }}
                            >
                                انتخاب محتوا
                            </MenuItem>
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
                                sx={{ fontStyle: 'italic', color: 'text.secondary' }}
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
                    <SecondaryButton variant='outlined' sx={{ px: 4 }} onClick={exit}>انصراف</SecondaryButton>
                    <LoadingButton
                        variant='contained'
                        sx={{ borderRadius: '24px', px: 4 }}
                        onClick={() => {
                            if (!isValid)
                                enqueueSnackbar('پرکردن فیلدهای اجباری «اطلاعات آدرس جدید»، الزامی‌ست.', {
                                    variant: 'myCustomVariant',
                                    color: 'error'
                                })

                            onSubmit();
                        }}
                    >
                        ثبت آدرس
                    </LoadingButton>
                </Stack>
            </Box>
        </FormProvider>
    )
}