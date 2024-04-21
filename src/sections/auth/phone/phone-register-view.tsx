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

import FormProvider, { RHFRadioGroup } from 'src/components/hook-form';
import { Box, Checkbox, FormControl, FormControlLabel, Radio, RadioGroup } from '@mui/material';
import RHFTitleTextField from 'src/components/hook-form/rhf-title-text-field';
import { IUserTypes } from 'src/types/user';
import { StyledRoundedWhiteButton } from 'src/components/styles/props/rounded-white-button';

// ----------------------------------------------------------------------

export default function PhoneRegisterView() {
  const [terms, setTerms] = useState<boolean>(false);

  const { register } = useAuthContext();

  const router = useRouter();

  const [errorMsg, setErrorMsg] = useState('');

  const searchParams = useSearchParams();

  const returnTo = searchParams.get('returnTo');

  const password = useBoolean();

  const RegisterSchema = Yup.object().shape({
    // firstName: Yup.string().required('First name required'),
    // lastName: Yup.string().required('Last name required'),
    // email: Yup.string().required('Email is required').email('Email must be a valid email address'),
    // password: Yup.string().required('Password is required'),
  });

  const defaultValues = {
    user_type: IUserTypes.genuine,
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  };

  const methods = useForm<any>({
    resolver: yupResolver(RegisterSchema),
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
      console.log(data)
      return
      // await register?.(data.email, data.password, data.firstName, data.lastName);

      router.push(returnTo || PATH_AFTER_LOGIN);
    } catch (error) {
      console.error(error);
      reset();
      setErrorMsg(typeof error === 'string' ? error : error.message);
    }
  });

  const renderHead = (
    <Stack spacing={2} sx={{ mb: 2, position: 'relative' }}>
      <Typography variant="h3" fontFamily={'peyda-bold'}>
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
      fontFamily={'peyda-bold'}
      variant='body2'
      sx={{
        color: 'text.secondary',
        mt: 1,
        // typography: 'caption',
        textAlign: 'left',
      }}
    >
      <Checkbox onChange={() => setTerms(!terms)} />
      {' با '}
      <Link color="#0B7BA7">
        شرایط کارانو
      </Link>
      {' و '}
      <Link color="#0B7BA7">
        قوانین حریم خصوصی
      </Link>
      {' موافق هستم '}
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
            انتخاب نوع مشتری
          </Typography>

          <RHFRadioGroup
            name="user_type"
            options={Object.values(IUserTypes).map((value: string) => {
              return { label: value, value: value };
            })}
          />
        </Box>

        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
          <RHFTitleTextField name='first_name' custom_label='نام' placeholder='نام' />
          <RHFTitleTextField name='last_name' custom_label='نام خانوادگی' placeholder='نام خانوادگی' />
        </Stack>


        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
          <RHFTitleTextField name='code_meli' custom_label={(values.user_type !== IUserTypes.genuine) ? 'کد ملی / کد اقتصادی' : 'کد ملی'}
            placeholder='مثلا 3540200000'
          />
          <RHFTitleTextField name='email' custom_label='ایمیل (اختیاری)' placeholder='email@example.com' />
        </Stack>

        {(values.user_type !== IUserTypes.company) && (
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <RHFTitleTextField name='phone' custom_label='شماره تلفن ثابت (اختیاری)' placeholder='021-234567' />
          </Stack>
        )}

        {renderTerms}

        <Stack direction={'row'} justifyContent={'space-between'}>
          <Box>
            {' حساب کاربری دارید؟ '}
            <Link color="#0B7BA7" fontFamily={'peyda-bold'}>
              ورود
            </Link>
          </Box>
          <LoadingButton
            fullWidth
            color="inherit"
            size="medium"
            type="submit"
            variant="contained"
            loading={isSubmitting}
            disabled={!terms}
            sx={{ width: 'fit-content', borderRadius: '28px', px: 5, py: 0.5 }}
          >
            تایید
          </LoadingButton>
        </Stack>


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
