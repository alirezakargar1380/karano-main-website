import { Stack, Typography, Box, MenuItem, Checkbox, ListItemText } from "@mui/material";

import { SecondaryButton } from "src/components/styles/buttons/secondary";
import { LoadingButton } from "@mui/lab";
import { useBoolean, useBooleanReturnType } from "src/hooks/use-boolean";
import { DialogWithButton, WarningDialog } from "src/components/custom-dialog";
import FormProvider, { RHFSelect, RHFTitleTextField } from "src/components/hook-form";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from "yup";
import _ from "lodash";
import { EAdminRole, IAdmin } from "src/types/admin";
import axiosInstance, { endpoints, server_axios } from "src/utils/axios";
import { adminRoleTranslate } from "src/utils/admin-role";
import { useEffect, useMemo } from "react";
import { PrimaryButton } from "src/components/styles/buttons/primary";

interface Props {
    adminDialog: useBooleanReturnType
    currentData?: IAdmin
}

export function AccessLevelNewEditView({ adminDialog, currentData }: Props) {
    const warningDialog = useBoolean();

    const FormSchema = Yup.object().shape({
        username: Yup.string()
            .required('نام کاربری مورد نیاز است')
            .matches(/^[0-9aA-zZ]+$/, 'فقط از حروف انگلیسی و اعداد بدون فاصله استفاده کنید'),
        fullName: Yup.string().required('نام و نام خانوادگی مورد نیاز است'),
        password: Yup.string().required('پسورد مورد نیاز است'),
        phone: Yup.string().min(11, 'کامل وارد کنید').required('شماره تماس مورد نیاز است'),
        role: Yup.string().required('سطح دسترسی مورد نیاز است')
    });

    const defaultValues = useMemo(() => ({
        fullName: currentData?.fullName || '',
        username: currentData?.username || '',
        password: '',
        phone: currentData?.phone || '',
        role: currentData?.role || EAdminRole.delivery,
    }), [currentData]);

    const methods = useForm({
        resolver: yupResolver<any>(FormSchema),
        defaultValues,
    });

    const {
        watch,
        reset,
        handleSubmit
    } = methods;

    const values = watch();

    useEffect(() => {
        reset(defaultValues);
    }, [currentData])

    const onSubmit = handleSubmit(async (data) => {
        try {
            if (!currentData) {
                if (!warningDialog.value)
                    return warningDialog.onTrue();

                axiosInstance.post(endpoints.auth.admin.create, data);
            } else {
                axiosInstance.patch(endpoints.auth.admin.update(currentData.id), data);
            }

            adminDialog.onFalse();
            warningDialog.onFalse();
            console.info('DATA', data);
        } catch (error) {
            console.error(error);
        }
    });

    return (
        <Box>
            <WarningDialog
                open={warningDialog.value}
                onClose={warningDialog.onFalse}
                title="اطمینان از افزودن"
                content={`آیا از افزودن «${values.fullName}» به عنوان «${adminRoleTranslate(`${values.role}`)}» اطمینان دارید؟`}
                closeTitle="لغو"
                action={
                    <PrimaryButton size="medium" onClick={() => onSubmit()}>
                        تایید
                    </PrimaryButton>
                }
            />
            <Box>
                <FormProvider methods={methods} onSubmit={onSubmit}>
                    <Typography variant="h4" fontFamily={'peyda-bold'} sx={{ borderBottom: (theme) => `solid 1px ${theme.palette.divider}`, pb: 2 }}>
                        {currentData ? 'ویرایش ادمین' : 'افزودن ادمین جدید'}
                    </Typography>

                    <Typography variant="body2" fontFamily={'peyda-bold'} py={3} color={'text.secondary'}>
                        اطلاعات ادمین مورد نظر خود را وارد کنید.
                    </Typography>

                    <Box
                        columnGap={2}
                        rowGap={3}
                        display="grid"
                        gridTemplateColumns={{
                            xs: 'repeat(1, 1fr)',
                            md: 'repeat(2, 1fr)',
                        }}
                    >
                        <RHFTitleTextField custom_label="نام و نام خانوادگی" name="fullName" placeholder="افزودن محتوا" />
                        <Box>
                            <Typography fontFamily={'peyda-bold'} sx={{ pb: 0.5, pl: 0.75 }}>
                                سطح دسترسی
                            </Typography>
                            <RHFSelect
                                name="role"
                                placeholder="افزودن محتوا"
                                SelectProps={{
                                    renderValue: (value) => {
                                        return <>{adminRoleTranslate(`${value}`)}</>
                                    },
                                }}
                            >
                                {_.values(EAdminRole).map((value, index) => (
                                    <MenuItem value={value} key={index}>
                                        <Checkbox
                                            checked={(values.role === value)}
                                        />
                                        <ListItemText primary={adminRoleTranslate(value)} />
                                    </MenuItem>
                                ))}

                            </RHFSelect>
                        </Box>
                        <RHFTitleTextField custom_label="نام کاربری" name="username" placeholder="افزودن محتوا" />
                        <RHFTitleTextField custom_label="پسورد" name="password" placeholder="افزودن محتوا" />
                        <RHFTitleTextField custom_label="شماره تماس" name="phone" placeholder="افزودن محتوا" />
                    </Box>

                    <Stack direction={'row'} justifyContent={'end'} mt={2}>
                        <Stack direction={'row'} spacing={2}>
                            <SecondaryButton size="medium" variant='outlined' sx={{ px: 4 }} onClick={adminDialog.onFalse}>
                                انصراف
                            </SecondaryButton>
                            <PrimaryButton
                                size="medium"
                                type="submit"
                            >
                                {currentData ? 'ویرایش ادمین' : 'افزودن ادمین'}
                            </PrimaryButton>
                        </Stack>
                    </Stack>
                </FormProvider>
            </Box>
        </Box>
    )
}