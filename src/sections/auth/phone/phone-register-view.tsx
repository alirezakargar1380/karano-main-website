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

import FormProvider from 'src/components/hook-form';
import { Box, Checkbox, FormControl, FormControlLabel, Radio, RadioGroup } from '@mui/material';
import RHFTitleTextField from 'src/components/hook-form/rhf-title-text-field';

// ----------------------------------------------------------------------

export default function PhoneRegisterView() {
  const { register } = useAuthContext();

  const router = useRouter();

  const [errorMsg, setErrorMsg] = useState('');

  const searchParams = useSearchParams();

  const returnTo = searchParams.get('returnTo');

  const password = useBoolean();

  const RegisterSchema = Yup.object().shape({
    firstName: Yup.string().required('First name required'),
    lastName: Yup.string().required('Last name required'),
    email: Yup.string().required('Email is required').email('Email must be a valid email address'),
    password: Yup.string().required('Password is required'),
  });

  const defaultValues = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  };

  const methods = useForm({
    resolver: yupResolver(RegisterSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      await register?.(data.email, data.password, data.firstName, data.lastName);

      router.push(returnTo || PATH_AFTER_LOGIN);
    } catch (error) {
      console.error(error);
      reset();
      setErrorMsg(typeof error === 'string' ? error : error.message);
    }
  });

  const renderHead = (
    <Stack spacing={2} sx={{ mb: 4, position: 'relative' }}>
      <Typography variant="h4" fontFamily={'peyda-bold'}>
        اطلاعات کاربری خود را وارد کنید
      </Typography>

      {/* <Stack direction="row" spacing={0.5}>
        <Typography variant="body2"> Already have an account? </Typography>

        <Link href={paths.auth.jwt.login} component={RouterLink} variant="subtitle2">
          Sign in
        </Link>
      </Stack> */}
    </Stack>
  );

  const renderTerms = (
    <Typography
      component="div"
      sx={{
        color: 'text.secondary',
        mt: 1,
        typography: 'caption',
        textAlign: 'left',
      }}
    >
      <Checkbox />
      {'By signing up, I agree to '}
      <Link underline="always" color="text.primary">
        Terms of Service
      </Link>
      {' and '}
      <Link underline="always" color="text.primary">
        Privacy Policy
      </Link>
      .
    </Typography>
  );

  const renderForm = (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <Stack spacing={2.5}>
        {!!errorMsg && <Alert severity="error">{errorMsg}</Alert>}

        <Box>
          <Typography variant="subtitle1" fontFamily={'peyda-bold'}
            sx={{
              pb: 1, width: 1
            }}>
            انتخاب نوع کاربر
          </Typography>

          <FormControl component="fieldset" sx={{ width: 1 }}>
            <RadioGroup row defaultValue="top">
              <FormControlLabel
                value={''}
                label={'شخص حقیقی'}
                labelPlacement={'end'}
                control={<Radio size="medium" />}
                sx={{ textTransform: 'capitalize' }}
              />
            </RadioGroup>
          </FormControl>

          <FormControl component="fieldset" sx={{ width: 1 }}>
            <RadioGroup row defaultValue="top">
              <FormControlLabel
                value={''}
                label={"شخص حقوقی"}
                labelPlacement={'end'}
                control={<Radio size="medium" />}
                sx={{ textTransform: 'capitalize' }}
              />
            </RadioGroup>
          </FormControl>

          <FormControl component="fieldset" sx={{ width: 1 }}>
            <RadioGroup row defaultValue="top">
              <FormControlLabel
                value={''}
                label={'شرکت'}
                labelPlacement={'end'}
                control={<Radio size="medium" />}
                sx={{ textTransform: 'capitalize' }}
              />
            </RadioGroup>
          </FormControl>


        </Box>

        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
          <RHFTitleTextField name='first_name' custom_label='نام' placeholder='نام' />
          <RHFTitleTextField name='last_name' custom_label='نام خانوادگی' placeholder='نام خانوادگی'/>
        </Stack>
        

        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
          <RHFTitleTextField name='code_meli' custom_label='کدملی' placeholder='3540200000' />
          <RHFTitleTextField name='email' custom_label='ایمیل (اختیاری)' placeholder='email@example.com' />
        </Stack>
        
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
          <RHFTitleTextField name='email' custom_label='شماره تلفن ثابت (اختیاری)' placeholder='021234567' />
        </Stack>

        {renderTerms}

        <LoadingButton
          fullWidth
          color="inherit"
          size="large"
          type="submit"
          variant="contained"
          loading={isSubmitting}
        >
          Create account
        </LoadingButton>
      </Stack>
    </FormProvider>
  );

  return (
    <>
      {renderHead}

      {renderForm}

      
    </>
  );
}
