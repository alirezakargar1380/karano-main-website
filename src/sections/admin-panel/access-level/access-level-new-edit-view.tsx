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
import { endpoints, server_axios } from "src/utils/axios";
import { adminRoleTranslate } from "src/utils/admin-role";
import { useEffect } from "react";

interface Props {
    adminDialog: useBooleanReturnType
    currentData?: IAdmin
}

export function AccessLevelNewEditView({ adminDialog, currentData }: Props) {
    console.log(currentData, currentData?.fullName)

    const warningDialog = useBoolean();

    const FormSchema = Yup.object().shape({
        username: Yup.string()
            .required('نام کاربری مورد نیاز است')
            .matches(/^[0-9aA-zZ]+$/, 'فقط از حروف انگلیسی و اعداد بدون فاصله استفاده کنید')
            .min(6, 'Mininum 6 characters')
            .max(32, 'Maximum 32 characters')
    });

    const defaultValues = {
        fullName: currentData?.fullName || '',
        username: currentData?.username || '',
        password: '',
        phone: currentData?.phone || '',
        role: EAdminRole.delivery,
    }

    const methods = useForm({
        // resolver: yupResolver<any>(FormSchema),
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
                if (!warningDialog.value) return warningDialog.onTrue();
                server_axios.post(endpoints.auth.admin.create, data);
            } else {

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
                content="آیا از افزودن «پرهام بدر» به عنوان «مدیر فروش» اطمینان دارید؟"
                closeTitle="لغو"
                action={
                    <LoadingButton variant="contained" onClick={() => onSubmit()} sx={{
                        borderRadius: '50px',
                        px: 4
                    }}>
                        تایید
                    </LoadingButton>
                }
            />
            <DialogWithButton dialog={adminDialog} fullWith={false} width={960}>
                <Box>
                    <FormProvider methods={methods} onSubmit={onSubmit}>
                        <Typography variant="h4" fontFamily={'peyda-bold'} sx={{ borderBottom: (theme) => `solid 1px ${theme.palette.divider}`, pb: 2 }}>
                            افزودن ادمین جدید
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
                                <SecondaryButton variant='outlined' sx={{ px: 4 }} onClick={adminDialog.onFalse}>
                                    انصراف
                                </SecondaryButton>
                                <LoadingButton
                                    variant='contained'
                                    sx={{ borderRadius: '24px', px: 4 }}
                                    type="submit"
                                >
                                    افزودن
                                </LoadingButton>
                            </Stack>
                        </Stack>

                    </FormProvider>
                </Box>
            </DialogWithButton>

        </Box>
    )
}