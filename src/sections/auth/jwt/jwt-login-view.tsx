'use client';

import * as Yup from 'yup';
import { useCallback, useState } from 'react';
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
import FormProvider, { RHFTextField } from 'src/components/hook-form';
import { Box, IconButton, MenuItem, MenuItemProps, Select, styled } from '@mui/material';
import { countries } from 'src/assets/data';
import { paths } from 'src/routes/paths';
import axiosInstance, { endpoints, server_axios } from 'src/utils/axios';
import { enqueueSnackbar } from 'notistack';

// ----------------------------------------------------------------------

export default function PhoneLoginView() {
  const [showPassword, setShowPassword] = useState(false);

  const { adminLogin } = useAuthContext();

  const router = useRouter();

  const [errorMsg, setErrorMsg] = useState('');

  const searchParams = useSearchParams();

  const returnTo = searchParams.get('returnTo');

  const password = useBoolean();

  // const LoginSchema = Yup.object().shape({
  //   phone: Yup.string().required('شماره تماس مورد نیاز است'),
  // });

  const defaultValues = {
    username: '',
    password: ''
  };

  const methods = useForm({
    // resolver: yupResolver(LoginSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    setValue,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      await adminLogin(data.username, data.password)

      // router.push(returnTo || paths.admin_dashboard.root);
    } catch (error) {
      enqueueSnackbar('نام کاربری یا رمز عبور اشتباه است', { variant: 'myCustomVariant', color: 'error' });
      // console.error(error.message);
      reset();
      setErrorMsg(typeof error === 'string' ? error : error.message);
    }
  });

  const handleShowPassword = useCallback(() => {
    setShowPassword(!showPassword);
  }, [showPassword]);

  const handleMouseDownPassword = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  }, []);

  const renderHead = (
    <Stack spacing={2} sx={{ mb: 4 }}>
      <Box sx={{ borderBottom: '1px solid #D1D1D1' }}>
        <Typography variant="h4" textAlign={'center'} fontFamily={'peyda-bold'} sx={{ pb: 3 }}>
          ورود - پنل ادمین
        </Typography>
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
    <Stack spacing={4} width={1}>

      <Box>
        <Typography variant="body1" textAlign={'left'} pb={0.5}>
          نام کاربری
        </Typography>
        <RHFTextField
          name="username"
          placeholder='افزودن محتوا'
        />
      </Box>

      <Box mb={3}>
        <Typography variant="body1" textAlign={'left'} pb={0.5}>
          رمز ورود
        </Typography>
        <RHFTextField
          name="password"
          placeholder='افزودن محتوا'
          type={showPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end" sx={{ mr: 2 }}>
                <IconButton
                  onClick={handleShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? (
                    <Iconify icon="solar:eye-bold" width={24} />
                  ) : (
                    <Iconify icon="solar:eye-closed-bold" width={24} />
                  )}
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
        ورود
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
