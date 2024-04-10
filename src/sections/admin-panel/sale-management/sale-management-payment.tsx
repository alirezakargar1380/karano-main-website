import { Box, Checkbox, FormControlLabel, Stack, Typography } from "@mui/material";
import Iconify from "src/components/iconify";
import { GrayNotification } from "src/components/notification";
import FormProvider, {
    RHFSelect,
    RHFEditor,
    RHFUpload,
    RHFTitleTextField,
    RHFSwitch,
    RHFTextField,
    RHFMultiSelect,
    RHFAutocomplete,
    RHFMultiCheckbox,
} from 'src/components/hook-form';
import { useForm } from "react-hook-form";
import { LoadingButton } from "@mui/lab";
export default function SaleManagementPayment() {
    const methods = useForm({
        defaultValues: {},
    });

    const {
        reset,
        watch,
        setValue,
        handleSubmit,
        formState: { isSubmitting },
    } = methods;

    const onSubmit = handleSubmit(async (data) => {
        try {
            await new Promise((resolve) => setTimeout(resolve, 500));
            reset();
            console.info('DATA', data);
        } catch (error) {
            console.error(error);
        }
    });

    return (
        <FormProvider methods={methods} onSubmit={onSubmit}>
            <Box sx={{
                background: '#FFFFFF', border: 'solid 1px #D1D1D1', borderTopLeftRadius: '16px', borderTopRightRadius: '16px',
                borderBottomLeftRadius: '36px', borderBottomRightRadius: '36px', pb: 2
            }}>
                <Box sx={{ borderBottom: (theme) => `solid 1px ${theme.palette.divider}` }} pb={2} p={2}>
                    <Typography variant="h6" fontFamily={'peyda-bold'}>
                        تعداد کارهای درحال تولید: 146
                    </Typography>
                </Box>
                <Stack p={2} spacing={4}>
                    <GrayNotification>
                        با توجه به اطلاعات واحد تولید، زمان حدودی تولید  را تعیین کنید.
                    </GrayNotification>
                    <Stack direction={'row'} spacing={1} sx={{ bgcolor: '#DCF9FF', borderRadius: '8px', p: 2, border: 'solid 1px #0B7BA7' }}>
                        <Typography variant="h6" fontFamily={'peyda-bold'}>مبلغ کل سفارش:</Typography>
                        <Typography variant="h6" fontFamily={''}>
                            1455555555
                        </Typography>
                        <Typography variant="h6" fontFamily={''} pl={2}>
                            ریال
                        </Typography>
                    </Stack>
                    <FormControlLabel
                        control={
                            <Checkbox
                                color="info"
                            // size="small"
                            // icon={<Iconify icon="eva:award-fill" />}
                            // checkedIcon={<Iconify icon="eva:award-fill" />}
                            />
                        }
                        label="عدم نیاز به پیش‌پرداخت"
                    />
                    <RHFTitleTextField custom_label="مبلغ پیش‌پرداخت" name="" placeholder="قیمت" />
                    <RHFTitleTextField custom_label={"تخمین زمان تولید (روز)"} name="" placeholder="قیمت" />
                </Stack>
                <Box borderTop={(theme) => `solid 1px ${theme.palette.divider}`} sx={{ p: 2, mt: 1 }}>
                    <LoadingButton variant="contained" sx={{ width: 1, borderRadius: '24px', py: 1 }}>
                        تایید نهایی
                    </LoadingButton>
                </Box>
            </Box>

        </FormProvider>
    )
}