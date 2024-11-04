'use client';

import * as Yup from 'yup';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useRouter, useSearchParams } from 'src/routes/hooks';

import FormProvider, { RHFPhoneInput } from 'src/components/hook-form';
import { Box } from '@mui/material';

import { paths } from 'src/routes/paths';
import { endpoints, server_axios } from 'src/utils/axios';
import RegisterLoginHead from '../register-login-head';
import { PrimaryButton } from 'src/components/styles/buttons/primary';
import { toEnglishNumber } from 'src/utils/change-case';
import { numberRegex } from 'src/constants/regex/number';
import { phoneFormatErrorMessage, phoneLengthErrorMessage } from 'src/constants/messages/phone-error-messages';

import { useSnackbar } from 'notistack';

import * as querystring from 'querystring';

// ----------------------------------------------------------------------

export default function PhoneResetPasswordView() {

    const router = useRouter();

    const { enqueueSnackbar } = useSnackbar();

    const searchParams = useSearchParams();
    const returnTo = searchParams.get('returnTo');

    const LoginSchema = Yup.object().shape({
        phone: Yup.string()
            .matches(numberRegex, phoneFormatErrorMessage)
            .transform((value) => toEnglishNumber(value))
            .length(12, phoneLengthErrorMessage)
            .required(phoneLengthErrorMessage),
    });

    const defaultValues = {
        phone: '۹۸',
    };

    const methods = useForm({
        resolver: yupResolver(LoginSchema),
        defaultValues,
    });

    const {
        reset,
        handleSubmit,
        formState: { isSubmitting, isValid },
    } = methods;

    const onSubmit = handleSubmit(async (data: any) => {
        try {
            await server_axios.post(endpoints.auth.user.resetPassword, data).then(({ data }) => data)
            
            let phoneQuery = querystring.stringify({
                phone: data.phone,
                ...(returnTo && {
                    returnTo
                })
            })

            router.push(paths.auth.phone.resetPassword.verifyCode + "?" + phoneQuery);
        } catch (error) {
            console.error(error);
            if (error?.message)
                enqueueSnackbar(error.message, {
                    variant: 'myCustomVariant',
                    color: 'error'
                });
            reset();
        }
    });

    const renderForm = (
        <Stack spacing={4} width={1} mt={4}>

            <Typography variant='title3'>
                شماره موبایلی که در ابتدا برای ایجاد این حساب تعریف ‌کرده‌اید را وارد کنید.
            </Typography>

            <Box>
                <RHFPhoneInput name="phone" custom_label='شماره تلفن همراه' />
            </Box>


            {/* <Link variant="body2" color="inherit" underline="always" sx={{ alignSelf: 'flex-end' }}>
        Forgot password?
      </Link> */}


            <PrimaryButton
                sx={{ width: 1 }}
                type="submit"
                isLoading={isSubmitting}
                disabled={!isValid}
            >
                <Typography variant="button1">ادامه</Typography>
            </PrimaryButton>
        </Stack>
    );

    return (
        <FormProvider methods={methods} onSubmit={onSubmit}>
            <RegisterLoginHead />

            {renderForm}

        </FormProvider>
    );
}
