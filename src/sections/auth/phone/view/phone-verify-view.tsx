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
import { toEnglishNumber, toFarsiNumber } from 'src/utils/change-case';
import { codeErrorMessage } from 'src/constants/messages/phone-verify';
import { CustomLink } from 'src/components/styles/link/custom-link';
import { PrimaryButton } from 'src/components/styles/buttons/primary';

import { useSnackbar } from 'notistack';
import { inputFormError } from 'src/constants/messages/form/errors';
import { endpoints, server_axios } from 'src/utils/axios';

// ----------------------------------------------------------------------

export default function PhoneVerifyView() {
  const [countdown, setCountdown] = useState('00:00');

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
      enqueueSnackbar(error.message, {
        variant: 'myCustomVariant',
        color: 'error'
      })
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

  useEffect(() => {
    if (login) getRemainingTime();
  }, [login])

  useEffect(() => {
    if (!countdown || countdown === '00:00') return;

    const [minutes, seconds] = countdown.split(':').map(Number);
    const totalSeconds = minutes * 60 + seconds;

    const timer = setInterval(() => {
      const newTotalSeconds = totalSeconds - 1;

      if (newTotalSeconds < 0) {
        clearInterval(timer);
        setCountdown('00:00');
      } else {
        const newMinutes = Math.floor(newTotalSeconds / 60);
        const newSeconds = newTotalSeconds % 60;

        const formattedTime = `${newMinutes.toString().padStart(2, '0')}:${newSeconds.toString().padStart(2, '0')}`;
        setCountdown(formattedTime);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [countdown]);

  const handleBeforeSubmit = useCallback(() => {
    if (!isValid) return enqueueSnackbar(inputFormError, {
      variant: 'myCustomVariant',
      color: 'error'
    })
  }, [isValid])

  const getRemainingTime = useCallback(() => {
    if (!phone) return

    server_axios.get(endpoints.auth_code.remaining_time(phone))
      .then(({ data }) => {
        if (data.remainingTime > 0)
          setCountdown(`00:${data.remainingTime}`)
      })
  }, [])

  const sendAuthCode = useCallback(() => {
    if (!phone) return

    server_axios.post(endpoints.auth_code.send_code(phone))
      .then(({ data }) => {
        setCountdown('00:10')
        enqueueSnackbar('کد احراز هویت بر روی شماره تلفن شما ارسال شد', {
          variant: 'myCustomVariant',
          color: 'info'
        })
      }).catch((err) => {
        getRemainingTime()
        enqueueSnackbar(err, {
          variant: 'myCustomVariant',
          color: 'error'
        })
      })
  }, [phone])

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
        <RHFCode name="code" sx={{ direction: 'rtl' }} helperText={(countdown !== '00:00') ? `دریافت مجدد کد پس از ${toFarsiNumber(countdown)}` : undefined} />
        {(countdown === '00:00') && (
          <CustomLink variant='hyperlink3' underline="none" sx={{ width: 'fit-content', mt: 1 }} onClick={sendAuthCode}>
            دریافت مجدد کد
          </CustomLink>
        )}

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
