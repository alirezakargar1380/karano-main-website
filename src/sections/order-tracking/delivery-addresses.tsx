import { Box, Stack, Typography } from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import FormProvider, {
    RHFRadioAddress,
} from 'src/components/hook-form';
import { SecondaryButton } from 'src/components/styles/buttons/secondary';
import { endpoints, server_axios } from 'src/utils/axios';
import { useSnackbar } from 'src/components/snackbar';

import { useGetAddresses } from 'src/api/address';
import { DeliveryAdressesNewEditForm } from './delivery-addresses-new-edit-form';
import Iconify from 'src/components/iconify';
import AddressEditDialog from './address-edit-dialog';
import { useBoolean } from 'src/hooks/use-boolean';

export default function DeliveryAdresses({ orderId }: { orderId: number }) {
    const [newAddress, setNewAddress] = useState<boolean>(false);
    const [addressId, setAddId] = useState<number>();

    const dialog = useBoolean();

    const { addresses, addressesEmpty } = useGetAddresses();

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
            <Stack direction={'row'} justifyContent={'space-between'} borderBottom={'1px solid #D1D1D1'}>
                <Typography variant="h6" sx={{ pb: 2, fontFamily: 'peyda-bold' }}>
                    آدرس تحویل گیرنده
                </Typography>
                <SecondaryButton
                    variant='outlined'
                    size='small'
                    disabled={!!newAddress}
                    sx={{
                        pr: 1.5,
                        borderColor: '#0B7BA7',
                        color: '#0B7BA7',
                        width: 'fit-content'
                    }}
                    onClick={() => setNewAddress(true)}
                >
                    <Iconify icon={'ic:outline-plus'} mr={0.5} />
                    آدرس جدید
                </SecondaryButton>
            </Stack>
            <FormProvider methods={methods} onSubmit={onSubmit}>
                <Box py={2}>
                    {(addressesEmpty) && (
                        <Box textAlign={'center'}>
                            <Typography variant='body2' textAlign={'center'} py={2}>
                                در حال حاضر آدرس ثبت‌شده‌ای ندارید. برای ثبت آدرس جدید بر روی دکمه «افزودن آدرس» کلیک کنید.
                            </Typography>
                            <SecondaryButton variant='outlined' sx={{ px: 4, mt: 4 }} onClick={() => setNewAddress(true)}>
                                افزودن آدرس
                            </SecondaryButton>
                        </Box>
                    )}

                    {(!addressesEmpty) && (
                        <RHFRadioAddress
                            name='address.id'
                            sx={{
                                mt: 3
                            }}
                            FormControlSx={{
                                width: 1
                            }}
                            row
                            options={addresses.map((add) => {
                                return {
                                    label: add?.province?.name + ", " + add?.city?.name + ", " + add.address,
                                    value: add.id,
                                    icon: '/assets/icons/address/marker-pin-01.svg',
                                    onClick: () => {
                                        setAddId(add.id)
                                        dialog.onTrue();
                                    }
                                }
                            })}
                        />
                    )}
                </Box>
            </FormProvider>

            <AddressEditDialog dialog={dialog} id={addressId} />

            {(newAddress === true) && (
                <DeliveryAdressesNewEditForm
                    handleAfterAddingAddress={handleAfterAddingAddress}
                    exit={() => setNewAddress(false)}
                />
            )}

        </Box>
    )
}