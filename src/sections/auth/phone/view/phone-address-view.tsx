'use client';

import { useState } from 'react';

import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { useRouter, useSearchParams } from 'src/routes/hooks';

import { useBoolean } from 'src/hooks/use-boolean';

import { PATH_AFTER_LOGIN } from 'src/config-global';

import { Box, Checkbox, Container } from '@mui/material';
import { paths } from 'src/routes/paths';
import { PrimaryButton } from 'src/components/styles/buttons/primary';
import { CustomLink } from 'src/components/styles/link/custom-link';
import { DeliveryAdressesNewEditForm } from 'src/sections/order-tracking/delivery-addresses-new-edit-form';

// ----------------------------------------------------------------------

export default function PhoneAddressView() {
    const [terms, setTerms] = useState<boolean>(true);

    const dialog = useBoolean();

    const router = useRouter();

    const searchParams = useSearchParams();

    const returnTo = searchParams.get('returnTo');

    const renderHead = (
        <Stack spacing={2} sx={{ mb: 2, position: 'relative' }}>
            <Typography variant="title1">
                اطلاعات آدرس خود را وارد کنید
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
                mt: '48px',
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
        <Box>
            <DeliveryAdressesNewEditForm
                handleAfterAddingAddress={() => {
                    router.push(returnTo || PATH_AFTER_LOGIN);
                }}
                exit={() => dialog.onFalse()}
                actions={(
                    <>
                        {renderTerms}
                        <Box textAlign={'right'} mt={1} mb={'24px'}>
                            <PrimaryButton size='medium' type='submit' disabled={!terms}>
                                ثبت
                            </PrimaryButton>
                        </Box>
                    </>
                )}
            />

            <Stack direction={'row'} justifyContent={'space-between'} borderTop={(theme) => `1px solid ${theme.palette.divider}`}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px', mt: '16px' }}>
                    {' حساب کاربری دارید؟ '}
                    <CustomLink sx={{ width: 'fit-content' }} href={paths.auth.phone.login}>
                        ورود
                    </CustomLink>
                </Box>
            </Stack>
        </Box>
    );

    return (
        <Container>
            {renderHead}

            {renderForm}

        </Container>
    );
}
