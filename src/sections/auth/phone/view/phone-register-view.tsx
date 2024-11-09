'use client';

import * as Yup from 'yup';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { useRouter, useSearchParams } from 'src/routes/hooks';

import { useAuthContext } from 'src/auth/hooks';

import FormProvider, { RHFRadioGroup } from 'src/components/hook-form';
import { Box, Container } from '@mui/material';
import RHFTitleTextField from 'src/components/hook-form/rhf-title-text-field';
import { IUser, IUserTypes } from 'src/types/user';
import { paths } from 'src/routes/paths';
import { PrimaryButton } from 'src/components/styles/buttons/primary';
import { CustomLink } from 'src/components/styles/link/custom-link';

import querystring from "querystring";

// ----------------------------------------------------------------------

export default function PhoneRegisterView() {

  const { register } = useAuthContext();

  const router = useRouter();

  const searchParams = useSearchParams();
  const user_id = searchParams.get('user_id');
  const returnTo = searchParams.get('returnTo');

  const RegisterSchema = Yup.object().shape({
    user_type: Yup.string().required('نوع کاربری مورد نیاز است'),
    first_name: Yup.string().when('user_type', (type: any, schema) => {
      if (type[0] === IUserTypes.legal)
        return schema
      return schema.required('پر کردن این فیلد اجباری‌ست.').min(3, 'نام باید حداقل 3 کرکتر باشد')
    }),
    last_name: Yup.string().when('user_type', (type: any, schema) => {
      if (type[0] === IUserTypes.legal)
        return schema
      return schema.required('پر کردن این فیلد اجباری‌ست.').min(3, 'نام باید حداقل 3 کرکتر باشد')
    }),
    id_code: Yup.string().when('user_type', (type: any, schema) => {
      if (type[0] === IUserTypes.legal)
        return schema
      return schema.required('پر کردن این فیلد اجباری‌ست.').length(10, 'معتبر نیست!')
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
    landline_number: Yup.number().required('پر کردن این فیلد اجباری‌ست.'),
    // password: Yup.string().required('Password is required'),
  });

  const defaultValues = {
    user_type: IUserTypes.genuine,
  };

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

      const query = querystring.stringify({
        user_id,
        ...(returnTo && {
          returnTo
        })
      })

      router.replace(paths.auth.phone.address + `?${query}`);
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
            FSx={{
              // width: 1
            }}
            options={Object.values(IUserTypes).map((value: string) => {
              return { label: "شخص " + value, value: value };
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
          {(values.user_type === IUserTypes.legal) && (<RHFTitleTextField name='national_id' custom_label='کد ملی / کد اقتصادی' placeholder='9968741' />)}
          <RHFTitleTextField name='email' custom_label='ایمیل' lable_caption={'اختیاری'} placeholder='email@example.com' />
          <RHFTitleTextField name='landline_number' custom_label='شماره تلفن ثابت' placeholder='021-234567' />
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
    <Box>
      {renderHead}

      {renderForm}

    </Box>
  );
}
