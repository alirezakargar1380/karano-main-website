import { Avatar, Box, Stack, Typography } from "@mui/material";
import { DialogWithButton } from "src/components/custom-dialog";
import { useBooleanReturnType } from "src/hooks/use-boolean";

import FormProvider, { RHFMultiSelect, RHFTitleTextField } from "src/components/hook-form";
import { useForm } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from 'yup';
import { SecondaryButton } from "src/components/styles/buttons/secondary";
import { PrimaryButton } from "src/components/styles/buttons/primary";

export default function SettingsDialog({ dialog }: { dialog: useBooleanReturnType }) {

    const schema = Yup.object().shape({
    });

    const methods = useForm({
        resolver: yupResolver<any>(schema),
        defaultValues: {},
    });

    const {
        reset,
        handleSubmit,
        watch,
        formState: { isSubmitting },
    } = methods;

    const values = watch();

    const onSubmit = handleSubmit(async () => {
        try {
        } catch (error) {
            console.error(error);
            reset();
        }
    });

    return (
        <DialogWithButton dialog={dialog} fullWith={false} width={640}>
            <Typography variant="title1" sx={{ borderBottom: (theme) => `solid 1px ${theme.palette.divider}`, pb: 2 }}>
                تنظیمات پروفایل
            </Typography>
            <Typography variant="body2" fontFamily={'peyda-bold'} py={3} color={'text.secondary'}>
                با کلیک بر روی اطلاعات پروفایل، می‌توانید تغییرات مورد نظر خود را اعمال کنید.
            </Typography>
            <Box>
                <FormProvider methods={methods} onSubmit={onSubmit}>
                    <Stack spacing={'24px'}>
                        <RHFTitleTextField custom_label="نام کاربری" name="name" />
                        <RHFTitleTextField custom_label="رمز ورود" name="pass" />
                        <Stack direction="row" alignItems={'center'} spacing={0} sx={{}}>
                            <Box sx={{ mr: '16px' }}>
                                <Avatar sx={{ border: `solid 8px #F8F8F8`, width: 80, height: 80 }} src={''} />
                            </Box>
                            <Box>
                                <SecondaryButton size="small">آپلود عکس جدید</SecondaryButton>
                            </Box>
                        </Stack>
                    </Stack>
                    <Stack direction="row" justifyContent={'flex-end'} spacing={'12px'} sx={{ mt: 4 }}>
                        <SecondaryButton onClick={dialog.onFalse} size="medium">انصراف</SecondaryButton>
                        <PrimaryButton size="medium">اعمال تغییرات</PrimaryButton>
                    </Stack>
                </FormProvider>
            </Box>
        </DialogWithButton>
    )
}