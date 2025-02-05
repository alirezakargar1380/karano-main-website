'use client';

import * as Yup from 'yup';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import Link from '@mui/material/Link';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';

import { paths } from 'src/routes/paths';
import { useRouter, useSearchParams } from 'src/routes/hooks';

import { useBoolean } from 'src/hooks/use-boolean';

import { useAuthContext } from 'src/auth/hooks';

import FormProvider, { RHFCode, } from 'src/components/hook-form';
import { Box } from '@mui/material';
import RegisterLoginHead from '../register-login-head';
import { numberRegex } from 'src/constants/regex/number';
import { toEnglishNumber } from 'src/utils/change-case';
import { codeErrorMessage } from 'src/constants/messages/phone-verify';
import { CustomLink } from 'src/components/styles/link/custom-link';
import { endpoints, server_axios } from 'src/utils/axios';
import { useSnackbar } from 'notistack';

// ----------------------------------------------------------------------

export default function PhoneVerifyView() {
    const { verify } = useAuthContext();

    const router = useRouter();

    const { enqueueSnackbar } = useSnackbar();

    const [errorMsg, setErrorMsg] = useState('');

    const searchParams = useSearchParams();
    const phone = searchParams.get('phone');
    const returnTo = searchParams.get('returnTo');

    const LoginSchema = Yup.object().shape({
        code: Yup.string()
            .matches(numberRegex, codeErrorMessage)
            .transform((value) => toEnglishNumber(value))
            .required('کد را وارد کنید')
            .length(6, 'کد باید حداقل 6 کرکتر باشد'),
    });

    const defaultValues = {
        code: ''
    };

    const methods = useForm({
        resolver: yupResolver(LoginSchema),
        defaultValues,
    });

    const {
        reset,
        handleSubmit,
        watch,
        formState: { isSubmitting },
    } = methods;

    const values = watch();

    const onSubmit = handleSubmit(async (data: any) => {
        try {
            await server_axios.post(endpoints.auth.user.resetPasswordVerify, {
                phone: `${phone}`,
                code: data.code
            }).then(({ data }) => {
                router.push(paths.auth.phone.resetPassword.setPassword + '?token=' + data.token);
            })
            
        } catch (error) {
            if (error?.message)
                enqueueSnackbar(error.message, {
                    variant: 'myCustomVariant',
                    color: 'error'
                });
            reset();
        }
    });

    useEffect(() => {
        if (values.code)
            if (values.code.length === 6) {
                onSubmit();
            }
    }, [values.code])

    const renderForm = (
        <Stack spacing={2.5}>

            <Typography variant="body1" fontFamily={'peyda-bold'} mt={3} textAlign={'left'}>کد تایید به شماره {" " + phone + " "} ارسال شد.</Typography>

            <Box sx={{ mb: 2 }}>
                <Typography variant="body2" mb={1} fontFamily={'peyda-bold'} textAlign={'left'}>کد تایید</Typography>
                <RHFCode name="code" sx={{ direction: 'rtl' }} helperText={'دریافت مجدد کد پس از ۰۲:۵۹ '} />
                <CustomLink variant='hyperlink3' underline="none" sx={{ width: 'fit-content' }}>
                    دریافت مجدد کد
                </CustomLink>
            </Box>

            <LoadingButton
                sx={{ borderRadius: '24px', fontFamily: 'peyda-bold' }}
                disabled={values.code?.length !== 6}
                fullWidth
                color="inherit"
                size="large"
                type="submit"
                variant="contained"
                loading={isSubmitting}
            >
                {isSubmitting ? '' : 'ادامه'}
            </LoadingButton>
        </Stack>
    );

    return (
        <FormProvider methods={methods} onSubmit={onSubmit}>
            <RegisterLoginHead back title='بازیابی  رمز ورود' />

            {renderForm}

        </FormProvider>
    );
}
