import { Avatar, Box, Stack, Typography } from "@mui/material";
import { DialogWithButton } from "src/components/custom-dialog";
import { useBooleanReturnType } from "src/hooks/use-boolean";

import FormProvider, { RHFMultiSelect, RHFTitleTextField } from "src/components/hook-form";
import { useForm } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from 'yup';
import { SecondaryButton } from "src/components/styles/buttons/secondary";
import { PrimaryButton } from "src/components/styles/buttons/primary";
import { use, useEffect, useRef, useState } from "react";
import axiosInstance, { endpoints, server_axios } from "src/utils/axios";
import { enqueueSnackbar } from "notistack";
import { useAuthContext } from "src/auth/hooks";

export default function SettingsDialog({ dialog }: { dialog: useBooleanReturnType }) {
    const { admin } = useAuthContext();

    const [avatarUrl, setAvatarUrl] = useState<any | string>('');

    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleUploadClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file: any = event.target.files?.[0];
        if (file) {
            setAvatarUrl(URL.createObjectURL(file));
            setAvatarUrl(
                Object.assign(file, {
                    preview: URL.createObjectURL(file),
                })
            );
            // Handle the file upload logic here
            // console.log('Selected file:', file);
            // const form = new FormData();

            // form.append("file", file)

            // await axiosInstance.put(endpoints.admin_panel.settings.upload_profile, form)
        }
    };

    const schema = Yup.object().shape({
        fullName: Yup.string().required('نام و نام خانوادگی مورد نیاز است'),
        password: Yup.string().required('پسورد مورد نیاز است'),
    });

    const defaultValues = {
        fullName: admin?.fullName || '',
        password: '',
    }

    const methods = useForm({
        resolver: yupResolver<any>(schema),
        defaultValues,
    });

    const {
        reset,
        handleSubmit,
        watch,
        formState: { isSubmitting },
    } = methods;

    const onSubmit = handleSubmit(async (data) => {
        try {
            await axiosInstance.patch(endpoints.auth.admin.me_update, data);

            enqueueSnackbar('اطلاعات با موفقیت بروزرسانی شد.', {
                variant: 'myCustomVariant',
                color: 'info'
            })
        } catch (error) {
            console.error(error);
            reset();
        }
    });

    const beforeUpdate = async () => {
        try {
            console.log('beforeUpdate');

            if (avatarUrl) {
                const form = new FormData();
                form.append("file", avatarUrl)
                await axiosInstance.put(endpoints.admin_panel.settings.upload_profile, form)
                .then(() => {
                })
            }

            onSubmit();

        } catch (error) {
            console.error(error);
        }
    };

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
                        <RHFTitleTextField custom_label="نام کاربری" name="fullName" />
                        <RHFTitleTextField custom_label="رمز ورود" name="password" />
                        <Stack direction="row" alignItems={'center'} spacing={0}>
                            <Box sx={{ mr: '16px' }}>
                                <Avatar sx={{ border: `solid 8px #F8F8F8`, width: 80, height: 80 }} src={avatarUrl?.preview || endpoints.admin_panel.settings.get_profile(admin?.profile)} />
                            </Box>
                            <Box>
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    onChange={handleFileChange}
                                    accept="image/*"
                                    style={{ display: 'none' }}
                                />
                                <SecondaryButton size="small" onClick={handleUploadClick}>آپلود عکس جدید</SecondaryButton>
                            </Box>
                        </Stack>
                    </Stack>
                    <Stack direction="row" justifyContent={'flex-end'} spacing={'12px'} sx={{ mt: 4 }}>
                        <SecondaryButton onClick={dialog.onFalse} size="medium">انصراف</SecondaryButton>
                        <PrimaryButton size="medium" onClick={() => beforeUpdate()}>اعمال تغییرات</PrimaryButton>
                    </Stack>
                </FormProvider>
            </Box>
        </DialogWithButton>
    )
}