import { Box, Stack, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { LoadingButton } from "@mui/lab";

import FormProvider, {
    RHFSelect,
    RHFEditor,
    RHFUpload,
    RHFTitleTextField,
    RHFSwitch,
    RHFTextField,
    RHFMultiSelect,
    RHFAutocomplete,
    RHFMultiCheckbox,
    RHFCheckbox,
} from 'src/components/hook-form';

import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { StyledRoundedWhiteButton } from "src/components/styles/props/rounded-white-button";
import { endpoints, server_axios } from "src/utils/axios";
import { IAddressItem } from "src/types/address";
import { useBooleanReturnType } from "src/hooks/use-boolean";

export default function NewUserForm({ currentAddress, dialog }: { currentAddress?: IAddressItem, dialog: useBooleanReturnType }) {

    const schema = Yup.object().shape({
        address: Yup.string().required('پر کردن این فیلد اجباری‌ست.').typeError('پر کردن این فیلد اجباری‌ست.'),
        provice: Yup.string().required('پر کردن این فیلد اجباری‌ست.').typeError('پر کردن این فیلد اجباری‌ست.'),
        city: Yup.string().required('پر کردن این فیلد اجباری‌ست.').typeError('پر کردن این فیلد اجباری‌ست.'),
        postal_code: Yup.string().required('پر کردن این فیلد اجباری‌ست.').typeError('پر کردن این فیلد اجباری‌ست.'),
    });

    const defaultValues = {
        address: currentAddress?.address || '',
        provice: currentAddress?.provice || '',
        city: currentAddress?.city || '',
        postal_code: currentAddress?.postal_code || '',
    }

    const methods = useForm({
        resolver: yupResolver<any>(schema),
        defaultValues,
    });

    const {
        reset,
        watch,
        setValue,
        handleSubmit,
        formState: { isSubmitting },
    } = methods;

    const values = watch();

    const onSubmit = handleSubmit(async (data) => {
        try {
            if (currentAddress) {
                await server_axios.patch(endpoints.addresses.update(currentAddress.id), data)
            } else {
                await server_axios.post(endpoints.addresses.create, data)
            }
            dialog.onFalse()
        } catch (error) {
            console.error(error);
        }
    });

    return (
        <Box p={2}>
            <Typography variant="subtitle1" sx={{ fontFamily: 'peyda-bold', fontSize: 22, pt: 1, pb: 2, mb: 8, borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}>
                افزودن آدرس جدید
            </Typography>
            <FormProvider methods={methods} onSubmit={onSubmit}>
                <Box px={3}>
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
                        sx={{ mt: 3 }}
                        spacing={3}
                    >
                        <RHFTitleTextField name='provice' custom_label='استان' placeholder='افزودن محتوا' sx={{ bgcolor: '#fff' }} />
                        <RHFTitleTextField name='city' custom_label='شهر' placeholder='افزودن محتوا' sx={{ bgcolor: '#fff' }} />
                        <RHFTitleTextField name='postal_code' custom_label='کد پستی' placeholder='افزودن محتوا' sx={{ bgcolor: '#fff' }} />
                    </Stack>
                </Box>
                <Stack sx={{ mt: 6 }} spacing={1} direction={'row'} justifyContent={'end'}>
                    <StyledRoundedWhiteButton variant='outlined' onClick={dialog.onFalse} sx={{ px: 2 }}>انصراف</StyledRoundedWhiteButton>
                    <LoadingButton
                        variant='contained'
                        sx={{ borderRadius: '24px', px: 3 }}
                        //  onClick={() => checkout.onNextStep()}
                        type="submit"
                    >
                        افزودن
                    </LoadingButton>
                </Stack>
            </FormProvider>
        </Box>
    )

}