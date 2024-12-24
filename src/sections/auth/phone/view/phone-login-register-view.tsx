'use client';

import * as Yup from 'yup';
import { useCallback, useEffect, useState } from 'react';
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

import querystring from "querystring";
import { useSnackbar } from 'notistack';
import { inputFormError } from 'src/constants/messages/form/errors';
import { BlueNotification } from 'src/components/notification';

// ----------------------------------------------------------------------

export default function PhoneLoginView() {
  const router = useRouter();

  const searchParams = useSearchParams();
  const returnTo = searchParams.get('returnTo');

  const { enqueueSnackbar } = useSnackbar();

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
      const res = await server_axios.post(endpoints.auth.user.loginSignUp, data).then(({ data }) => data)

      let phoneQuery = querystring.stringify({
        phone: data.phone,
        ...(returnTo && {
          returnTo
        })
      })

      let userIdQuery = querystring.stringify({
        user_id: res.user_id,
        ...(returnTo && {
          returnTo
        })
      })

      if (!res.phone_verified) {
        router.push(paths.auth.phone.verify + `?${phoneQuery}`);
        return
      }

      if (!res.set_password) {
        router.push(paths.auth.phone.newPassword + `?${userIdQuery}`);
        return
      }

      if (!res.complete_information) {
        router.push(paths.auth.phone.register + `?${userIdQuery}`);
        return
      }

      // if (res.authenticated) {
      //   router.push(paths.auth.phone.password + '?phone=' + data.phone);
      // } else {
      //   router.push(paths.auth.phone.verify + '?phone=' + data.phone);
      // }
      router.push(paths.auth.phone.password + `?${phoneQuery}`);

    } catch (error) {
      console.error(error);
      reset();
    }
  });

  const handleBeforeSubmit = useCallback(() => {
    if (!isValid) return enqueueSnackbar(inputFormError, {
      variant: 'myCustomVariant',
      color: 'error'
    })
  }, [isValid])

  const renderForm = (
    <Stack spacing={4} width={1} mt={7}>

      <Box>
        <RHFPhoneInput name="phone" custom_label='شماره تلفن همراه' />
      </Box>

      <PrimaryButton
        sx={{ width: 1 }}
        type="submit"
        isLoading={isSubmitting}
        onClick={handleBeforeSubmit}
      >
        <Typography variant="button1">ادامه</Typography>
      </PrimaryButton>
    </Stack>
  );

  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>

      {returnTo && (
        <BlueNotification title='به کارانو خوش آمدید؛' sx={{ mb: '40px' }}>
          برای ثبت شفارش، می‌بایست ابتدا در سایت کارانو ثبت‌نام | ورود کنید.
        </BlueNotification>
      )}


      <RegisterLoginHead />

      {renderForm}

    </FormProvider>
  );
}
