'use client';

import * as Yup from 'yup';
import { useCallback, useEffect, useState } from 'react';
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
import { PrimaryButton } from 'src/components/styles/buttons/primary';

import { useSnackbar } from 'notistack';
import { inputFormError } from 'src/constants/messages/form/errors';

// ----------------------------------------------------------------------

export default function PhoneVerifyView() {
  const { verify } = useAuthContext();

  const router = useRouter();

  const { enqueueSnackbar } = useSnackbar();

  const [errorMsg, setErrorMsg] = useState('');

  const searchParams = useSearchParams();
  const login = searchParams.get('login');
  const phone = searchParams.get('phone');
  const returnTo = searchParams.get('returnTo');

  const LoginSchema = Yup.object().shape({
    code: Yup.string()
      .matches(numberRegex, codeErrorMessage)
      .transform((value) => toEnglishNumber(value))
      .required('کد را وارد کنید')
      .length(6, 'کد را کامل وارد کنید'),
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
    formState: { isSubmitting, isValid },
  } = methods;

  const values = watch();

  const onSubmit = handleSubmit(async (data: any) => {
    try {
      await verify?.(`${phone}`, data.code, returnTo);

      // const response = await server_axios.post(endpoints.auth.user.verify, { phone: `+${phone}`, code: data.code })
      //   .then((res) => {
      //     return res.data
      //   });

      // await new Promise((resolve) => setTimeout(resolve, 2000));
    } catch (error) {
      console.error(error);
      reset();
      setErrorMsg(typeof error === 'string' ? error : error.message);
    }
  });

  useEffect(() => {
    if (values.code)
      if (values.code.length === 6) {
        onSubmit();
      }
  }, [values.code])

  const handleBeforeSubmit = useCallback(() => {
    if (!isValid) return enqueueSnackbar(inputFormError, {
      variant: 'myCustomVariant',
      color: 'error'
    })
  }, [isValid])

  const renderForm = (
    <Stack spacing={2.5}>

      <Typography variant="body1" fontFamily={'peyda-bold'} mt={3} textAlign={'left'}>کد تایید به شماره {" " + phone + " "} ارسال شد.</Typography>

      <CustomLink variant="hyperlink3" onClick={() => {
        if (login)
          router.back()
        else
          router.push(paths.auth.phone.login)
      }} fontFamily={'peyda-bold'} color="#0B7BA7" underline="none" sx={{ alignSelf: 'flex-end', cursor: 'pointer' }}>
        {login ? 'ورود با رمز ورود' : 'تغییر شماره'}
      </CustomLink>

      <Box sx={{ mb: 2 }}>
        <Typography variant="body2" mb={1} fontFamily={'peyda-bold'} textAlign={'left'}>کد تایید</Typography>
        <RHFCode name="code" sx={{ direction: 'rtl' }} helperText={'دریافت مجدد کد پس از ۰۲:۵۹ '} />
        <CustomLink variant='hyperlink3' underline="none" sx={{ width: 'fit-content' }}>
          دریافت مجدد کد
        </CustomLink>
      </Box>

      <PrimaryButton
        sx={{ borderRadius: '24px', fontFamily: 'peyda-bold' }}
        fullWidth
        size="medium"
        type="submit"
        isLoading={isSubmitting}
        onClick={handleBeforeSubmit}
      >
        {isSubmitting ? '' : 'ادامه'}
      </PrimaryButton>
    </Stack>
  );

  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <RegisterLoginHead back />

      {renderForm}

    </FormProvider>
  );
}
