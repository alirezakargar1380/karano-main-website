'use client';

import * as Yup from 'yup';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import Link from '@mui/material/Link';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';

import { useRouter, useSearchParams } from 'src/routes/hooks';

import { useBoolean } from 'src/hooks/use-boolean';

import { useAuthContext } from 'src/auth/hooks';
import { PATH_AFTER_LOGIN } from 'src/config-global';

import Iconify from 'src/components/iconify';
import FormProvider, { RHFAutocomplete, RHFTextField } from 'src/components/hook-form';
import { Box, IconButton, InputAdornment } from '@mui/material';
import RegisterLoginHead from '../register-login-head';
import SvgColor from 'src/components/svg-color';
import { paths } from 'src/routes/paths';
import { PrimaryButton } from 'src/components/styles/buttons/primary';
import { useSnackbar } from 'notistack';

import querystring from "querystring";

// ----------------------------------------------------------------------

export default function PhonePasswordView() {
  const { userLogin } = useAuthContext();

  const router = useRouter();

  const [errorMsg, setErrorMsg] = useState('');

  const searchParams = useSearchParams();

  const phone = searchParams.get('phone');
  const returnTo = searchParams.get('returnTo');

  const query = querystring.stringify({
    phone,
    ...(returnTo &&{
      returnTo
    })
  })

  const { enqueueSnackbar } = useSnackbar();

  const password = useBoolean();

  const LoginSchema = Yup.object().shape({
    password: Yup.string().min(8, 'پسورد باید بیشتر از 8 کرکتر باشد').required('Password is required'),
  });

  const defaultValues = {
    password: '',
  };

  const methods = useForm({
    resolver: yupResolver<any>(LoginSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    watch,
    formState: { isSubmitting },
  } = methods;

  const values = watch();

  const onSubmit = handleSubmit(async (data) => {
    try {
      await userLogin?.(`${phone}`, data.password);

      // router.push(returnTo || PATH_AFTER_LOGIN);
    } catch (error) {
      console.error(error);
      reset();
      enqueueSnackbar(error.message, {
        variant: 'myCustomVariant',
        color: 'error'
      })
    }
  });

  const renderForm = (
    <Stack spacing={3}>
      {!!errorMsg && <Alert severity="error">{errorMsg}</Alert>}

      <Typography variant="body1" textAlign={'left'} fontFamily={'peyda-bold'}>رمز ورود خود را وارد کنید.</Typography>

      <Box mt={1}>
        <Typography variant="body2" fontFamily={'peyda-bold'} mb={1} textAlign={'left'}>رمز عبور</Typography>
        <RHFTextField
          name="password"
          type={!password.value ? 'password' : 'text'}
          placeholder='رمز ورود'
          InputProps={{
            endAdornment: (
              <InputAdornment position="end" sx={{ cursor: 'pointer', paddingRight: '16px' }}>

                <IconButton onClick={password.onToggle} edge="end">

                  <SvgColor src={!password.value ? '/assets/icons/eye/eye.svg' : '/assets/icons/eye/eye-off.svg'} />

                </IconButton>

              </InputAdornment>
            ),
          }}
        />
        <Stack spacing={2} textAlign={'left'} mt={2} width={1}>
          <Link variant='hyperlink3' href={paths.auth.phone.verify + `?${query}`} underline="none" sx={{ width: 'fit-content' }}>
            ورود با رمز یکبار مصرف
          </Link>
          <Link variant='hyperlink3' underline="none" sx={{ width: 'fit-content' }}>
            بازیابی رمز ورود
          </Link>
        </Stack>
      </Box>


      {/* <Link variant="body2" color="inherit" underline="always" sx={{ alignSelf: 'flex-end' }}>
        Forgot password?
      </Link> */}

      <PrimaryButton
        sx={{ mt: 1 }}
        fullWidth
        size="medium"
        disabled={values.password?.length < 8}
        type="submit"
        isLoading={isSubmitting}
      >
        ورود
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
