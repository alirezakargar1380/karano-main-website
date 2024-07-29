'use client';

import * as Yup from 'yup';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';

import { useRouter, useSearchParams } from 'src/routes/hooks';

import { useBoolean } from 'src/hooks/use-boolean';

import { useAuthContext } from 'src/auth/hooks';
import { PATH_AFTER_LOGIN } from 'src/config-global';

import FormProvider, { RHFRadioGroup } from 'src/components/hook-form';
import { Box, Checkbox, Container } from '@mui/material';
import RHFTitleTextField from 'src/components/hook-form/rhf-title-text-field';
import { IUser, IUserTypes } from 'src/types/user';
import axios from 'axios';
import { endpoints, server_axios } from 'src/utils/axios';
import { useSnackbar } from 'src/components/snackbar';
import { paths } from 'src/routes/paths';

// ----------------------------------------------------------------------

export default function PhoneRegisterView() {
  const [terms, setTerms] = useState<boolean>(false);

  const { register } = useAuthContext();

  const router = useRouter();

  const { enqueueSnackbar } = useSnackbar();

  const searchParams = useSearchParams();

  const returnTo = searchParams.get('returnTo');
  const user_id = searchParams.get('user_id');

  const password = useBoolean();

  const RegisterSchema = Yup.object().shape({
    user_type: Yup.string().required('نوع کاربری مورد نیاز است'),
    first_name: Yup.string().when('user_type', (type: any, schema) => {
      if (type[0] === IUserTypes.company)
        return schema
      return schema.required('نام خود را وارد کنید').min(3, 'نام باید حداقل 3 کرکتر باشد')
    }),
    last_name: Yup.string().when('user_type', (type: any, schema) => {
      if (type[0] === IUserTypes.company)
        return schema
      return schema.required('نام خانوادگی خود را وارد کنید').min(3, 'نام باید حداقل 3 کرکتر باشد')
    }),
    id_code: Yup.string().when('user_type', (type: any, schema) => {
      if (type[0] === IUserTypes.company)
        return schema
      return schema.required('کد ملی خود را وارد کنید').length(10, 'معتبر نیست!')
    }),
    company_name: Yup.string().when('user_type', (type: any, schema) => {
      if (type[0] === IUserTypes.company)
        return schema.required("نام شرکت را وارد کنید").min(3, 'باید حداقل 3 کرکتر باشد')
      return schema
    }),
    national_id: Yup.string().when('user_type', (type: any, schema) => {
      if (type[0] === IUserTypes.company)
        return schema.required("کد را وارد کنید").min(3, 'باید حداقل 3 کرکتر باشد')
      return schema
    }),
    email: Yup.string().email('لطفا یک آدرس ایمیل معتبر را ثبت نمایید'),
    // password: Yup.string().required('Password is required'),
  });

  const defaultValues = {
    user_type: IUserTypes.genuine,
  };

  useEffect(() => {
    axios.get('http://localhost:4998/api/users').then(({ data }: any) => {
      console.log(data)
    })
  }, []);

  const methods = useForm({
    resolver: yupResolver<any>(RegisterSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    watch,
    formState: { isSubmitting },
  } = methods;

  const values = watch();

  const onSubmit = handleSubmit(async (data: IUser) => {
    try {
      await server_axios.post(endpoints.auth.register + `/${user_id}`, data)

      enqueueSnackbar('ثبت نام با موفقیت انجام شد', { variant: 'success' });

      router.push(returnTo || PATH_AFTER_LOGIN);

      return
      
      // await register?.(data.email, data.password, data.firstName, data.lastName);

      router.push(returnTo || PATH_AFTER_LOGIN);
    } catch (error) {
      console.error(error);
      // reset();
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

        {(values.user_type !== IUserTypes.company) && (
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <RHFTitleTextField name='first_name' custom_label='نام' placeholder='نام' />
            <RHFTitleTextField name='last_name' custom_label='نام خانوادگی' placeholder='نام خانوادگی' />
          </Stack>
        )}


        {(values.user_type === IUserTypes.company) && (
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <RHFTitleTextField name='company_name' custom_label='نام شرکت' placeholder='نام' />
            <RHFTitleTextField name='national_id' custom_label='شناسه ملی / کد اقتصادی' placeholder='9968741' />
          </Stack>
        )}

        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
          {(values.user_type !== IUserTypes.company) && (
            <RHFTitleTextField name='id_code' custom_label={'کد ملی'}
              placeholder='مثلا 3540200000'
            />
          )}
          <RHFTitleTextField name='email' custom_label='ایمیل (اختیاری)' placeholder='email@example.com' />
          {(values.user_type === IUserTypes.company) && (
            <RHFTitleTextField name='landline_number' custom_label='شماره تلفن ثابت (اختیاری)' placeholder='021-234567' />
          )}
        </Stack>

        {renderTerms}

        <Stack direction={'row'} justifyContent={'space-between'}>
          <Box>
            {' حساب کاربری دارید؟ '}
            <Link color="#0B7BA7" fontFamily={'peyda-bold'} href={paths.auth.phone.login}>
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
    <Container>
      {renderHead}

      {renderForm}

    </Container>
  );
}
