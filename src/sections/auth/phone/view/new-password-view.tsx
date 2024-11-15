'use client';

import * as Yup from 'yup';
import { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import Link from '@mui/material/Link';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';

import { useRouter, useSearchParams } from 'src/routes/hooks';

import { useBoolean } from 'src/hooks/use-boolean';

import Iconify from 'src/components/iconify';
import FormProvider, { RHFTextField } from 'src/components/hook-form';
import { Box, IconButton, InputAdornment } from '@mui/material';
import { endpoints, server_axios } from 'src/utils/axios';
import { useSnackbar } from 'notistack';
import { paths } from 'src/routes/paths';
import RegisterLoginHead from '../register-login-head';
import SvgColor from 'src/components/svg-color';
import { PrimaryButton } from 'src/components/styles/buttons/primary';

import querystring from "querystring";
import { inputFormError } from 'src/constants/messages/form/errors';

// ----------------------------------------------------------------------

interface Props {
  type?: 'default' | 'reset';
}

export default function NewPasswordView({ type = 'default' }: Props) {

  const router = useRouter();

  const [errorMsg, setErrorMsg] = useState('');

  const searchParams = useSearchParams();
  const returnTo = searchParams.get('returnTo');
  const token = searchParams.get('token');
  const user_id = searchParams.get('user_id');

  const password = useBoolean(true);

  const { enqueueSnackbar } = useSnackbar();

  const LoginSchema = Yup.object().shape({
    password: Yup.string().min(8, "رمز ورود حداقل باید 8 کرکتر باشد").required('Password is required'),
    re_password: Yup.string().min(8, "رمز ورود حداقل باید 8 کرکتر باشد").required('Password is required'),
  });

  const defaultValues = {
    password: '',
    re_password: '',
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

  const onSubmit = handleSubmit(async (data) => {
    try {
      if (data.password !== data.re_password) {
        enqueueSnackbar('رمز ورود واردشده مطابقت ندارد.', {
          variant: 'myCustomVariant',
          color: 'error'
        })
        return;
      }



      if (type === 'default') {
        const query = querystring.stringify({
          user_id,
          ...(returnTo && {
            returnTo
          })
        })

        const response = await server_axios.post(endpoints.auth.user.add_password(user_id), data).then(({ data }) => data)

        if (!response.complete_information) {
          router.push(paths.auth.phone.register + '?' + query);
        }
      } else {
        await server_axios.post(endpoints.auth.user.resetPasswordSetPassword + '?token=' + token, data).then(({ data }) => data)
      }

    } catch (error) {
      if (error?.message)
        enqueueSnackbar(error.message, {
            variant: 'myCustomVariant',
            color: 'error'
        });
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
    <Stack spacing={2.5}>
      {!!errorMsg && <Alert severity="error">{errorMsg}</Alert>}

      <Typography variant="body1" textAlign={'left'} fontFamily={'peyda-bold'} my={2}>
        یک رمز ورود مناسب برای خود انتخاب کنید.
      </Typography>

      <Box>
        <Typography variant="body3" textAlign={'left'}>رمز ورود</Typography>
        <RHFTextField
          name="password"
          type={password.value ? 'password' : 'text'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end" sx={{ cursor: 'pointer', paddingRight: '16px' }}>

                <IconButton onClick={password.onToggle} edge="end">

                  <SvgColor src={password.value ? '/assets/icons/eye/eye.svg' : '/assets/icons/eye/eye-off.svg'} />

                </IconButton>

              </InputAdornment>
            ),
          }}
        />
      </Box>

      <Box>
        <Typography variant="body3" textAlign={'left'}>تکرار رمز ورود</Typography>
        <RHFTextField
          name="re_password"
          type={password.value ? 'password' : 'text'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end" sx={{ cursor: 'pointer', paddingRight: '16px' }}>

                <IconButton onClick={password.onToggle} edge="end">

                  <SvgColor src={password.value ? '/assets/icons/eye/eye.svg' : '/assets/icons/eye/eye-off.svg'} />

                </IconButton>

              </InputAdornment>
            ),
          }}
        />
      </Box>

      <PrimaryButton
        fullWidth
        size="medium"
        type="submit"
        sx={{ mt: 2 }}
        isLoading={isSubmitting}
        onClick={handleBeforeSubmit}
      >
        {(type === 'default') ? 'ثبت نام' : 'ثبت'}
      </PrimaryButton>
    </Stack>
  );

  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <RegisterLoginHead back title={(type === 'default') ? 'ثبت نام | ورود' : 'بازیابی  رمز ورود'} />

      {renderForm}
    </FormProvider>
  );
}
