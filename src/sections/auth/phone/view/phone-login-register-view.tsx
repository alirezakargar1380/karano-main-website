'use client';

import * as Yup from 'yup';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import InputAdornment from '@mui/material/InputAdornment';
import { useRouter, useSearchParams } from 'src/routes/hooks';

import { useBoolean } from 'src/hooks/use-boolean';

import { useAuthContext } from 'src/auth/hooks';
import { PATH_AFTER_LOGIN } from 'src/config-global';

import Iconify from 'src/components/iconify';
import FormProvider, { RHFPhoneInput, RHFTextField } from 'src/components/hook-form';
import { Box, MenuItem, MenuItemProps, Select, styled } from '@mui/material';
import { countries } from 'src/assets/data';
import { paths } from 'src/routes/paths';
import axiosInstance, { endpoints, server_axios } from 'src/utils/axios';
import RegisterLoginHead from '../register-login-head';
import { PrimaryButton } from 'src/components/styles/buttons/primary';
import { toEnglishNumber } from 'src/utils/change-case';
import { numberRegex } from 'src/constants/regex/number';
import { phoneFormatErrorMessage, phoneLengthErrorMessage } from 'src/constants/messages/phone-error-messages';

// ----------------------------------------------------------------------

export default function PhoneLoginView() {

  const router = useRouter();

  const [errorMsg, setErrorMsg] = useState('');

  const searchParams = useSearchParams();

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

      if (!res.phone_verified) {
        router.push(paths.auth.phone.verify + '?phone=' + data.phone);
        return
      }

      if (!res.set_password) {
        router.push(paths.auth.phone.newPassword + '?user_id=' + res.user_id);
        return
      }

      if (!res.complete_information) {
        router.push(paths.auth.phone.register + '?user_id=' + res.user_id);
        return
      }

      if (res.authenticated) {
        router.push(paths.auth.phone.password + '?phone=' + data.phone);
      } else {
        router.push(paths.auth.phone.verify + '?phone=' + data.phone);
      }
    } catch (error) {
      console.error(error);
      reset();
      setErrorMsg(typeof error === 'string' ? error : error.message);
    }
  });

  const renderForm = (
    <Stack spacing={4} width={1} mt={7}>

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
