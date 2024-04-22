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
import FormProvider, { RHFTextField } from 'src/components/hook-form';
import { Box, MenuItem, MenuItemProps, Select, styled } from '@mui/material';
import { countries } from 'src/assets/data';
import { paths } from 'src/routes/paths';
import axiosInstance, { endpoints } from 'src/utils/axios';

// ----------------------------------------------------------------------

export default function PhoneLoginView() {

  const { login } = useAuthContext();

  const router = useRouter();

  const [errorMsg, setErrorMsg] = useState('');

  const searchParams = useSearchParams();

  const returnTo = searchParams.get('returnTo');

  const password = useBoolean();

  const LoginSchema = Yup.object().shape({
    phone: Yup.string().required('شماره تماس مورد نیاز است'),
  });

  const defaultValues = {
    phone: '+98',
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
      console.log(data)
      await axiosInstance.post(endpoints.auth.login, data)
      // await login?.(data.email, data.password);

      router.push(paths.auth.phone.verify + '?phone=' + data.phone);
    } catch (error) {
      console.error(error);
      reset();
      setErrorMsg(typeof error === 'string' ? error : error.message);
    }
  });

  const renderHead = (
    <Stack spacing={2} sx={{ mb: 10 }}>
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

      <Box>
        <Typography variant="h6" textAlign={'left'}>شماره تلفن همراه</Typography>
        <RHFTextField
          name="phone"
          sx={{
            '.MuiOutlinedInput-notchedOutline': {
              border: '1px solid #D1D1D1'
            },
            '.MuiInputBase-input': {
              textAlign: 'right!important',
              direction: 'rtl!important'
            }
          }}
          // label="Password"
          type={'text'}
          placeholder='09123456789'
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <Select
                  value="IR"
                  variant='outlined'
                  sx={{
                    borderTopLeftRadius: '0px',
                    borderBottomLeftRadius: '0px',
                    '& .MuiSelect-select': {
                      padding: "8px 35px 8px 14px!important",
                    }
                  }}
                >
                  {countries.map((country) => (
                    <MenuItem key={country.code} value={country.code}>
                      {/* <Iconify icon={`${country.code.toLowerCase()}`} /> */}
                      <Iconify icon={`flagpack:${country.code.toLowerCase()}`} sx={{ mt: 1 }} />
                    </MenuItem>
                  ))}
                </Select>
              </InputAdornment>
            )
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

      <Alert severity="error" sx={{ mb: 3, position: 'absolute', top: 70 }}>
        Use email : <strong>demo@minimals.cc</strong> / password :<strong> demo1234</strong>
      </Alert>

      {renderForm}

    </FormProvider>
  );
}
