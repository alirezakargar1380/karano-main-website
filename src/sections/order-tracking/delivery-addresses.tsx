import { LoadingButton } from '@mui/lab';
import { Box, Stack, Typography } from '@mui/material';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import FormProvider, {
    RHFSelect,
    RHFEditor,
    RHFUpload,
    RHFSwitch,
    RHFTextField,
    RHFMultiSelect,
    RHFAutocomplete,
    RHFMultiCheckbox,
    RHFRadioGroup,
    RHFTitleTextField,
} from 'src/components/hook-form';
import { StyledRoundedWhiteButton } from 'src/components/styles/props/rounded-white-button';
import { endpoints, server_axios } from 'src/utils/axios';

import { useSnackbar } from 'src/components/snackbar';
import { useGetAddresses } from 'src/api/address';

export default function DeliveryAdresses() {
    const [newAddress, setNewAddress] = useState<boolean>(false);

    const { enqueueSnackbar } = useSnackbar();

    const { addresses, addressesEmpty } = useGetAddresses()

    const methods = useForm({
        // resolver: yupResolver(NewProductSchema),
        defaultValues: {
            address: '',
            postal_code: '',
            provice: '',
            city: ''
        },
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
            setNewAddress(false)
            await server_axios.post(endpoints.addresses.create, data)
            enqueueSnackbar('آدرس جدید اضافه شد', {
                variant: 'info'
            })
        } catch (error) {
            console.error(error);
        }
    });

    return (
        <FormProvider methods={methods} onSubmit={onSubmit}>
            <Box sx={{ border: '2px solid #A9A9A9', borderRadius: '16px', p: 4 }}>
                <Typography variant="h4" sx={{ width: 1, pb: 2, fontFamily: 'peyda-bold', borderBottom: '1px solid #D1D1D1' }}>
                    آدرس تحویل گیرنده
                </Typography>
                <Box py={2}>
                    <Box textAlign={'center'}>
                        <Typography variant='body2' textAlign={'center'} py={2}>
                            در حال حاضر آدرس ثبت‌شده‌ای ندارید. برای ثبت آدرس جدید بر روی دکمه «افزودن آدرس» کلیک کنید.
                        </Typography>
                        <StyledRoundedWhiteButton variant='outlined' sx={{ px: 4, mt: 4 }} onClick={() => setNewAddress(true)}>
                            افزودن آدرس
                        </StyledRoundedWhiteButton>
                    </Box>
                    {(!addressesEmpty) && (
                        <RHFRadioGroup
                            name='af'
                            sx={{
                                mt: 3
                            }}
                            options={addresses.map((add) => {
                                return {
                                    label: add.provice + ", " + add.provice + ", " + add.address,
                                    value: add.id
                                }
                            })}
                        />
                    )}

                </Box>

                {(newAddress === true) && (
                    <Box sx={{ border: '2px solid #D1D1D1', borderRadius: '16px', p: 4, mt: 3, bgcolor: '#F8F8F8' }}>
                        <Typography variant="h4" sx={{ width: 1, pb: 2, fontFamily: 'peyda-bold', borderBottom: '1px solid #D1D1D1' }}>
                            اطلاعات آدرس جدید
                        </Typography>
                        <Box sx={{ mt: 2 }}>
                            <RHFTitleTextField name='address' custom_label='آدرس پستی' placeholder='نام' sx={{ bgcolor: '#fff' }} />
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
                            <RHFTitleTextField name='provice' custom_label='استان' placeholder='نام' sx={{ bgcolor: '#fff' }} />
                            <RHFTitleTextField name='city' custom_label='شهر' placeholder='+98' sx={{ bgcolor: '#fff' }} />
                            <RHFTitleTextField name='postal_code' custom_label='کد پستی' placeholder='75416-11111' sx={{ bgcolor: '#fff' }} />
                        </Stack>
                        <Stack sx={{ mt: 6 }} spacing={1} direction={'row'} justifyContent={'end'}>
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
                    </Box>
                )}

            </Box>
        </FormProvider>
    )
}