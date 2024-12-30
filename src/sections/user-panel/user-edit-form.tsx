import { yupResolver } from "@hookform/resolvers/yup";
import { Stack, Typography } from "@mui/material";
import { useSnackbar } from "notistack";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { AuthUserType } from "src/auth/types";
import { DialogWithButton } from "src/components/custom-dialog";
import FormProvider, { RHFPhoneInput, RHFTitleTextField } from "src/components/hook-form";
import { PrimaryButton } from "src/components/styles/buttons/primary";
import { SecondaryButton } from "src/components/styles/buttons/secondary";
import { inputError } from "src/constants/messages/form/errors";
import { phoneFormatErrorMessage, phoneLengthErrorMessage } from "src/constants/messages/phone-error-messages";
import { numberRegex } from "src/constants/regex/number";
import { useBooleanReturnType } from "src/hooks/use-boolean"
import { IUser, IUserTypes } from "src/types/user";
import { endpoints, server_axios } from "src/utils/axios";
import { toEnglishNumber, toPhoneNumberInputFormat } from "src/utils/change-case";

import * as Yup from 'yup';

interface Props {
    dialog: useBooleanReturnType;
    data: IUser | any;
    isLegal: boolean;
}

export default function UserEditForm({ dialog, data, isLegal }: Props) {

    const { enqueueSnackbar } = useSnackbar();

    const NewProductSchema = Yup.object().shape({
        user_type: Yup.string(),
        first_name: Yup.string().when('user_type', {
            is: IUserTypes.genuine,
            then: (schema) => schema.required(inputError),
            otherwise: (schema) => schema,
        }),
        last_name: Yup.string().when('user_type', {
            is: IUserTypes.genuine,
            then: (schema) => schema.required(inputError),
            otherwise: (schema) => schema,
        }),
        phone: Yup.string().matches(numberRegex, phoneFormatErrorMessage)
            .transform((value) => toEnglishNumber(value))
            .length(12, phoneLengthErrorMessage)
            .required(phoneLengthErrorMessage),
    });

    const defaultValues = {
        user_type: isLegal ? IUserTypes.legal : IUserTypes.genuine,
        phone: toPhoneNumberInputFormat(data?.phone) || '۹۸',
        national_id: data?.national_id || '',
        id_code: data?.id_code || '',
        first_name: data?.first_name || '',
        last_name: data?.last_name || '',
        email: data?.email || '',
        company_name: data?.company_name || '',
        landline_number: data?.landline_number || '',
    }

    const methods = useForm({
        resolver: yupResolver<any>(NewProductSchema),
        defaultValues,
    });

    const {
        handleSubmit,
        formState: { isSubmitting },
        reset,
    } = methods;

    const onSubmit = handleSubmit(async (data) => {
        try {
            console.log('sddddd')
            await server_axios.patch(endpoints.user.user_update, data)
            enqueueSnackbar('آپدیت شد!', {
                variant: 'myCustomVariant',
                color: 'info',
            })
            // setValue(data[name])
            dialog.onFalse();
        } catch (error) {
            console.error(error);
        }
    });

    useEffect(() => {
        reset(defaultValues);
    }, [reset, data]);

    return (
        <DialogWithButton dialog={dialog} fullWith maxWidth="md">
            <FormProvider methods={methods} onSubmit={onSubmit}>
                <Typography variant="title1" sx={{ width: 1, pb: '16px', borderBottom: '1px solid #D1D1D1' }}>
                    مشخصات کاربر
                </Typography>
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
                    {(isLegal) ? (
                        <>
                            <RHFTitleTextField name='company_name' custom_label="نام شرکت" placeholder='افزودن محتوا' />
                            <RHFTitleTextField name="national_id" custom_label="کد اقتصادی" placeholder='افزودن محتوا' />
                        </>
                    ) : (
                        <>
                            <RHFTitleTextField name='first_name' custom_label='نام' placeholder='افزودن محتوا' />
                            <RHFTitleTextField name='last_name' custom_label='نام خانوادگی' placeholder='افزودن محتوا' />
                            <RHFTitleTextField name='id_code' custom_label='کد ملی' placeholder='افزودن محتوا' />
                        </>
                    )}
                    <RHFPhoneInput
                        name={'phone'}
                        custom_label={'شماره تماس'}
                    />
                    <RHFTitleTextField name='landline_number' custom_label="شماره تلفن ثابت" placeholder='افزودن محتوا' />
                    <RHFTitleTextField name='email' custom_label="ایمیل" placeholder='افزودن محتوا' />
                </Stack>
                <Stack sx={{ mt: 6 }} spacing={1} direction={'row'} justifyContent={'end'}>
                    <SecondaryButton
                        size='medium'
                        sx={{ px: 4 }}
                        onClick={dialog.onFalse}
                    >
                        انصراف
                    </SecondaryButton>
                    <PrimaryButton
                        size="medium"
                        type="submit"
                    >
                        اعمال تغییرات
                    </PrimaryButton>
                </Stack>
            </FormProvider>
        </DialogWithButton>
    )
}