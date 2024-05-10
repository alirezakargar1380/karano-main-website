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
import { endpoints, server_axios } from 'src/utils/axios';
import { useSnackbar } from 'notistack';
import { paths } from 'src/routes/paths';

// ----------------------------------------------------------------------

export default function NewPasswordView() {
  const { login } = useAuthContext();

  const router = useRouter();

  const [errorMsg, setErrorMsg] = useState('');

  const searchParams = useSearchParams();

  const user_id = searchParams.get('user_id');

  const password = useBoolean(true);

  const { enqueueSnackbar } = useSnackbar();

  const LoginSchema = Yup.object().shape({
    password: Yup.string().required('Password is required'),
    re_password: Yup.string().required('Password is required'),
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
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      if (data.password !== data.re_password) {
        setErrorMsg('Passwords do not match');
        return;
      }
      // await login?.(data.email, data.password);

      const response = await server_axios.post(endpoints.auth.user.add_password(user_id), data).then(({ data }) => data)

      enqueueSnackbar('عملیات انجام شد!', { variant: 'success' });

      if (!response.complete_information) {
        router.push(paths.auth.phone.register + '?user_id=' + user_id);
      }
      // router.push(returnTo || PATH_AFTER_LOGIN);
    } catch (error) {
      console.error(error);
      reset();
      setErrorMsg(typeof error === 'string' ? error : error.message);
    }
  });

  const renderHead = (
    <Stack spacing={2} sx={{ mb: 8 }}>
      <Box sx={{ borderBottom: '1px solid #D1D1D1' }}>
        <Typography variant="h4" textAlign={'center'} fontFamily={'peyda-bold'} sx={{ pb: 3 }}>ثبت نام | ورود</Typography>
      </Box>

      {/* <Stack direction="row" spacing={0.5}>
        <Typography variant="body2">New user?</Typography>

        <Link component={RouterLink} href={paths.auth.jwt.register} variant="subtitle2">
          Create an account
        </Link>
      </Stack> */}
    </Stack>
  );

  const renderForm = (
    <Stack spacing={2.5}>
      {!!errorMsg && <Alert severity="error">{errorMsg}</Alert>}

      <Typography variant="body1" textAlign={'left'} fontFamily={'peyda-bold'}>
        یک رمز عبور مناسب برای خود انتخاب کنید.
      </Typography>

      <Box>
        <Typography variant="h6" textAlign={'left'}>رمز ورود</Typography>
        <RHFTextField
          name="password"
          type={password.value ? 'password' : 'text'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end" sx={{ cursor: 'pointer', paddingRight: '16px' }}>

                <IconButton onClick={password.onToggle} edge="end">

                  <Iconify icon={password.value ? 'solar:eye-bold' : 'solar:eye-closed-bold'} />

                </IconButton>

              </InputAdornment>
            ),
          }}
        />
      </Box>

      <Box>
        <Typography variant="h6" textAlign={'left'}>تکرار رمز ورود</Typography>
        <RHFTextField
          name="re_password"
          type={password.value ? 'password' : 'text'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end" sx={{ cursor: 'pointer', paddingRight: '16px' }}>

                <IconButton onClick={password.onToggle} edge="end">

                  <Iconify icon={password.value ? 'solar:eye-bold' : 'solar:eye-closed-bold'} />

                </IconButton>

              </InputAdornment>
            ),
          }}
        />
      </Box>


      {/* <Link variant="body2" color="inherit" underline="always" sx={{ alignSelf: 'flex-end' }}>
        Forgot password?
      </Link> */}

      <LoadingButton
        sx={{ borderRadius: '24px', fontFamily: 'peyda-bold' }}
        fullWidth
        color="inherit"
        size="large"
        // disabled={true}
        type="submit"
        variant="contained"
        loading={isSubmitting}
      >
        ادامه
      </LoadingButton>
    </Stack>
  );

  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      {renderHead}

      {renderForm}
    </FormProvider>
  );
}
