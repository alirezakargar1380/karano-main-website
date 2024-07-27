import { LoadingButton } from '@mui/lab';
import { Box, Stack, Typography } from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
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
import { DeliveryAdressesNewEditForm } from './delivery-addresses-new-edit-form';
import Iconify from 'src/components/iconify';

export default function DeliveryAdresses({ orderId }: { orderId: number }) {
    const [newAddress, setNewAddress] = useState<boolean>(false);

    const { addresses, addressesEmpty, addressesLoading } = useGetAddresses();

    const { enqueueSnackbar } = useSnackbar();

    const methods = useForm({
        // resolver: yupResolver(NewProductSchema),
        defaultValues: {
            address: {
                id: 0
            }
        },
    });

    const {
        watch,
        handleSubmit,
        reset,
        formState: { isSubmitting },
    } = methods;

    const values = watch();

    const onSubmit = handleSubmit(async (data) => {
        try {
            console.info('DATA', data);
            console.info('addresses', addresses);
            await server_axios.patch(endpoints.orders.update(orderId), data)
            // await server_axios.post(endpoints.addresses.create, data)
            enqueueSnackbar(`آدرس: ${addresses.find((add) => add.id == data.address.id)?.address} انتخاب شد`, {
                variant: 'info'
            })
        } catch (error) {
            console.error(error);
        }
    });

    useEffect(() => {
        if (values?.address?.id === 0) return

        onSubmit()
    }, [values.address?.id])

    useEffect(() => {
        if (addresses.length === 0) return

        reset({
            address: {
                id: addresses[0].id
            }
        })
    }, [addresses])

    const handleAfterAddingAddress = useCallback(() => {
        setNewAddress(false);
    }, [setNewAddress]);

    return (

        <Box sx={{ border: '2px solid #A9A9A9', borderRadius: '16px', p: 4 }}>
            <Typography variant="h4" sx={{ width: 1, pb: 2, fontFamily: 'peyda-bold', borderBottom: '1px solid #D1D1D1' }}>
                آدرس تحویل گیرنده
            </Typography>
            <FormProvider methods={methods} onSubmit={onSubmit}>
                <Box py={2}>
                    {(addressesEmpty) && (
                        <Box textAlign={'center'}>
                            <Typography variant='body2' textAlign={'center'} py={2}>
                                در حال حاضر آدرس ثبت‌شده‌ای ندارید. برای ثبت آدرس جدید بر روی دکمه «افزودن آدرس» کلیک کنید.
                            </Typography>
                            <StyledRoundedWhiteButton variant='outlined' sx={{ px: 4, mt: 4 }} onClick={() => setNewAddress(true)}>
                                افزودن آدرس
                            </StyledRoundedWhiteButton>
                        </Box>
                    )}

                    {(!addressesEmpty) && (
                        <>
                            <RHFRadioGroup
                                name='address.id'
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
                            <br />
                            <StyledRoundedWhiteButton
                                variant='outlined'
                                sx={{
                                    px: 4,
                                    mt: 2,
                                    borderColor: '#0B7BA7!important',
                                    color: '#0B7BA7'
                                }}
                                onClick={() => setNewAddress(true)}
                            >
                                <Iconify icon={'ic:outline-plus'} mr={0.5} />
                                آدرس جدید
                            </StyledRoundedWhiteButton>
                        </>
                    )}
                </Box>
            </FormProvider>

            {(newAddress === true) && (
                <DeliveryAdressesNewEditForm
                    handleAfterAddingAddress={handleAfterAddingAddress}
                    exit={() => setNewAddress(false)}
                />
            )}

        </Box>
    )
}