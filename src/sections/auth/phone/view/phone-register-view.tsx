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
import { PrimaryButton } from 'src/components/styles/buttons/primary';
import { CustomLink } from 'src/components/styles/link/custom-link';

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
      if (type[0] === IUserTypes.legal)
        return schema
      return schema.required('نام خود را وارد کنید').min(3, 'نام باید حداقل 3 کرکتر باشد')
    }),
    last_name: Yup.string().when('user_type', (type: any, schema) => {
      if (type[0] === IUserTypes.legal)
        return schema
      return schema.required('نام خانوادگی خود را وارد کنید').min(3, 'نام باید حداقل 3 کرکتر باشد')
    }),
    id_code: Yup.string().when('user_type', (type: any, schema) => {
      if (type[0] === IUserTypes.legal)
        return schema
      return schema.required('کد ملی خود را وارد کنید').length(10, 'معتبر نیست!')
    }),
    // company_name: Yup.string().when('user_type', (type: any, schema) => {
    //   if (type[0] === IUserTypes.legal)
    //     return schema.required("نام شرکت را وارد کنید").min(3, 'باید حداقل 3 کرکتر باشد')
    //   return schema
    // }),
    national_id: Yup.string().when('user_type', (type: any, schema) => {
      if (type[0] === IUserTypes.legal)
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
      await register?.(data, user_id || '');
      // return
      // await server_axios.post(endpoints.auth.register + `/${user_id}`, data);

      // // router.push(returnTo || PATH_AFTER_LOGIN);

      // router.push(paths.auth.phone.address + `?user_id=${user_id}`);

      // return

      // router.push(returnTo || PATH_AFTER_LOGIN);
    } catch (error) {
      console.error(error);
      // reset();
    }
  });

  const renderHead = (
    <Stack spacing={2} sx={{ mb: 2, position: 'relative' }}>
      <Typography variant="title1">
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
      variant='caption2'
      sx={{
        borderTop: '1px solid #D1D1D1',
        pt: 2,
        mt: 1,
        textAlign: 'left',
        display: 'flex',
        alignItems: 'center',
        gap: '4px'
      }}
    >
      <Checkbox size='small' onChange={() => setTerms(!terms)} />
      {' با '}
      <CustomLink variant='hyperlink3' sx={{ width: 'fit-content' }}>
        شرایط کارانو
      </CustomLink>
      {' و '}
      <CustomLink variant='hyperlink3' sx={{ width: 'fit-content' }}>
        قوانین حریم خصوصی
      </CustomLink>
      {' موافق هستم '}
      .
    </Typography>
  );

  const renderForm = (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <Stack spacing={2.5}>

        <Box>
          <Typography
            variant="body3"
            sx={{
              pb: 1, width: 1
            }}
          >
            انتخاب نوع مشتری
          </Typography>

          <RHFRadioGroup
            name="user_type"
            options={Object.values(IUserTypes).map((value: string) => {
              return { label: value, value: value };
            })}
          />
        </Box>


        <Box
          columnGap={2}
          rowGap={3}
          display="grid"
          gridTemplateColumns={{
            xs: 'repeat(1, 1fr)',
            md: 'repeat(2, 1fr)',
          }}
        >
          <RHFTitleTextField name='first_name' custom_label='نام' placeholder='نام' />
          <RHFTitleTextField name='last_name' custom_label='نام خانوادگی' placeholder='نام خانوادگی' />
          {(values.user_type === IUserTypes.genuine) && (<RHFTitleTextField name='id_code' custom_label={'کد ملی'} placeholder='مثلا 3540200000' />)}
          {(values.user_type === IUserTypes.legal) && (<RHFTitleTextField name='national_id' custom_label='شناسه ملی / کد اقتصادی' placeholder='9968741' />)}
          <RHFTitleTextField name='email' custom_label='ایمیل' lable_caption={'اختیاری'} placeholder='email@example.com' />
          <RHFTitleTextField lable_caption={'اختیاری'} name='landline_number' custom_label='شماره تلفن ثابت' placeholder='021-234567' />
        </Box>

        <Box width={1} textAlign={'right'} pt={6} borderBottom={(theme) => `1px solid ${theme.palette.divider}`} pb={2}>
          {/* {renderTerms} */}

          <PrimaryButton
            color="inherit"
            size="medium"
            type="submit"
            variant="contained"
            isLoading={isSubmitting}
            // disabled={!terms}
            sx={{ width: 'fit-content', ml: 'auto' }}
          >
            ثبت و ادامه
          </PrimaryButton>
        </Box>


        <Stack direction={'row'} justifyContent={'space-between'}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            {' حساب کاربری دارید؟ '}
            <CustomLink sx={{ width: 'fit-content' }} href={paths.auth.phone.login}>
              ورود
            </CustomLink>
          </Box>

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
