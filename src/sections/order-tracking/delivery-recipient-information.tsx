import { LoadingButton } from "@mui/lab";
import { Box, Stack, Typography } from "@mui/material";
import { RHFTitleTextField } from "src/components/hook-form";
import { BlueNotification } from "src/components/notification";
import { StyledRoundedWhiteButton } from "src/components/styles/props/rounded-white-button";
import { useCheckoutContext } from "../checkout/context";


export function DeliveryRecipientInformation() {
    const checkout = useCheckoutContext();

    return (
        <Stack spacing={3}>
            <Box sx={{ border: '2px solid #A9A9A9', borderRadius: '16px', p: 4 }}>
                <Typography variant="h4" sx={{ width: 1, pb: 2, fontFamily: 'peyda-bold', borderBottom: '1px solid #D1D1D1' }}>
                    اطلاعات تحویل گیرنده
                </Typography>
                <Stack direction={{ xs: 'column', sm: 'row' }} sx={{ mt: 2 }} spacing={2}>
                    <RHFTitleTextField name='first_name' custom_label='نام' placeholder='نام' />
                    <RHFTitleTextField name='first_name' custom_label='شماره تماس' placeholder='+98' />
                </Stack>
            </Box>

            <Box sx={{ border: '2px solid #A9A9A9', borderRadius: '16px', p: 4 }}>
                <Typography variant="h4" sx={{ width: 1, pb: 2, fontFamily: 'peyda-bold', borderBottom: '1px solid #D1D1D1' }}>
                    آدرس تحویل گیرنده
                </Typography>
                <Box sx={{ border: '2px solid #D1D1D1', borderRadius: '16px', p: 4, mt: 3, bgcolor: '#F8F8F8' }}>
                    <Typography variant="h4" sx={{ width: 1, pb: 2, fontFamily: 'peyda-bold', borderBottom: '1px solid #D1D1D1' }}>
                        اطلاعات آدرس جدید
                    </Typography>
                    <Box sx={{ mt: 2 }}>
                        <RHFTitleTextField name='first_name' custom_label='آدرس پستی' placeholder='نام' sx={{ bgcolor: '#fff' }} />
                    </Box>
                    <Stack
                        direction={{ xs: 'column', sm: 'row' }}
                        display="grid"
                        gridTemplateColumns={{
                            xs: 'repeat(1, 1fr)',
                            md: 'repeat(2, 1fr)',
                        }}
                        sx={{ mt: 2 }}
                        spacing={2}
                    >
                        <RHFTitleTextField name='first_name' custom_label='استان' placeholder='نام' sx={{ bgcolor: '#fff' }} />
                        <RHFTitleTextField name='first_name' custom_label='شهر' placeholder='+98' sx={{ bgcolor: '#fff' }} />
                        <RHFTitleTextField name='first_name' custom_label='کد پستی' placeholder='75416-11111' sx={{ bgcolor: '#fff' }} />
                    </Stack>
                </Box>
            </Box>

            <Box sx={{ border: '2px solid #A9A9A9', borderRadius: '16px', p: 4 }}>
                <Typography variant="h4" sx={{ width: 1, pb: 2, fontFamily: 'peyda-bold', borderBottom: '1px solid #D1D1D1' }}>
                    مشخصات صاحب فاکتور
                </Typography>
                <BlueNotification sx={{ mt: 2 }}>
                    می‌توانید فاکتور را به نام خود و یا فرد دیگری انتخاب کنید.
                </BlueNotification>
                <Stack direction={"row"} sx={{ p: 1.25, borderRadius: '12px', bgcolor: '#F2F2F2', textAlign: 'center', fontFamily: 'peyda-bold', my: 2 }}>
                    <Box sx={{ width: '50%', bgcolor: '#FFF', py: 1, borderRadius: '8px', cursor: 'pointer' }}>خودم</Box>
                    <Box sx={{ width: '50%', bgcolor: '#F2F2F2', py: 1, borderRadius: '8px', cursor: 'pointer' }}>فرد دیگر</Box>
                </Stack>
                <Stack
                    direction={{ xs: 'column', sm: 'row' }}
                    display="grid"
                    gridTemplateColumns={{
                        xs: 'repeat(1, 1fr)',
                        md: 'repeat(2, 1fr)',
                    }}
                    sx={{ mt: 2 }}
                    spacing={2}
                >
                    <RHFTitleTextField name='first_name' custom_label='نام' placeholder='نام' />
                    <RHFTitleTextField name='first_name' custom_label='نام خانوادگی' placeholder='بدر' />
                    <RHFTitleTextField name='first_name' custom_label='کد ملی' placeholder='بدر' />
                </Stack>
            </Box>

            <Stack sx={{ mt: 2 }} direction={'row'} spacing={1} justifyContent={'end'}>
                <StyledRoundedWhiteButton variant='outlined' sx={{ px: 4 }}>انصراف</StyledRoundedWhiteButton>
                <LoadingButton variant='contained' sx={{ borderRadius: '24px', px: 4 }} onClick={() => checkout.onNextStep()}>ثبت و ادامه</LoadingButton>
            </Stack>
        </Stack>
    )
}