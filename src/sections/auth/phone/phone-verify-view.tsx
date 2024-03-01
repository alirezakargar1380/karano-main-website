'use client';

import * as Yup from 'yup';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import Link from '@mui/material/Link';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import InputAdornment from '@mui/material/InputAdornment';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';
import { useRouter, useSearchParams } from 'src/routes/hooks';

import { useBoolean } from 'src/hooks/use-boolean';

import { useAuthContext } from 'src/auth/hooks';
import { PATH_AFTER_LOGIN } from 'src/config-global';

import Iconify from 'src/components/iconify';
import FormProvider, { RHFAutocomplete, RHFTextField } from 'src/components/hook-form';
import { Box, MenuItem, Select } from '@mui/material';
import { countries } from 'src/assets/data';

// ----------------------------------------------------------------------

export default function PhoneVerifyView() {
  const { login } = useAuthContext();

  const router = useRouter();

  const [errorMsg, setErrorMsg] = useState('');

  const searchParams = useSearchParams();

  const phone = searchParams.get('phone');

  console.log(phone)

  const password = useBoolean();

  const LoginSchema = Yup.object().shape({
    email: Yup.string().required('Email is required').email('Email must be a valid email address'),
    password: Yup.string().required('Password is required'),
  });

  const defaultValues = {
    email: 'demo@minimals.cc',
    password: 'demo1234',
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
      // await login?.(data.email, data.password);

      await new Promise((resolve) => setTimeout(resolve, 2000));

      // router.push(paths.auth.phone.verify + '?phone=');
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

      <Typography variant="body1" textAlign={'left'}>کد تایید به شماره {phone} ارسال شد</Typography>

      <Link variant="body2" href={paths.auth.phone.login} fontFamily={'peyda-bold'} color="#0B7BA7" underline="none" sx={{ alignSelf: 'flex-end', cursor: 'pointer' }}>
        تغییر شماره
      </Link>

      <Box>
        <Typography variant="h6" textAlign={'left'}>کد تایید</Typography>
        <RHFTextField
          name=""
          // label="Password"
          type={'text'}
          value={'060058'}
          helperText={'بعد از 2:59 میتوانید مجدد درخواست دهید'}
        // InputProps={{
        //   endAdornment: (
        //     <InputAdornment position="end" sx={{ cursor: 'pointer', paddingRight: '16px' }}>

        //       <IconButton onClick={password.onToggle} edge="end">

        //         <Iconify icon={password.value ? 'solar:eye-bold' : 'solar:eye-closed-bold'} />

        //       </IconButton>

        //     </InputAdornment>
        //   ),
        // }}
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
        type="submit"
        variant="contained"
        loading={isSubmitting}
      // loading={true}
      >
        {isSubmitting ? '' : 'ادامه'}
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
