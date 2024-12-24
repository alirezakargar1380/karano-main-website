import { yupResolver } from "@hookform/resolvers/yup";
import { Box, IconButton, Stack, Typography } from "@mui/material";
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { DialogWithButton } from "src/components/custom-dialog";
import SvgColor from "src/components/svg-color";
import { useBoolean } from "src/hooks/use-boolean";
import * as Yup from 'yup';

import FormProvider, {
    RHFPhoneInput,
    RHFTextField,
} from 'src/components/hook-form';
import { LoadingButton } from "@mui/lab";
import { endpoints, server_axios } from "src/utils/axios";

import { useSnackbar } from 'src/components/snackbar';
import { PrimaryButton } from "src/components/styles/buttons/primary";
import { toEnglishNumber, toPhoneNumberInputFormat } from "src/utils/change-case";
import { numberRegex } from "src/constants/regex/number";
import { phoneFormatErrorMessage, phoneLengthErrorMessage } from "src/constants/messages/phone-error-messages";

interface Props {
    name: string
    title: string
    value: string
    defaultValue?: string
}

export default function UserDetailsRow({
    name,
    title,
    value,
    defaultValue
}: Props) {
    const [fieldValue, setValue] = useState(value);
    const editDialog = useBoolean();

    const { enqueueSnackbar } = useSnackbar();

    const NewProductSchema = Yup.object().shape({
        phone: Yup.string().matches(numberRegex, phoneFormatErrorMessage)
            .transform((value) => toEnglishNumber(value))
            .length(12, phoneLengthErrorMessage)
            // .required(phoneLengthErrorMessage),
    });


    const defaultValues = {
        [name]: defaultValue || value,
    }

    const methods = useForm({
        resolver: yupResolver<any>(NewProductSchema),
        defaultValues,
    });

    const {
        handleSubmit,
        formState: { isSubmitting },
    } = methods;

    const onSubmit = handleSubmit(async (data) => {
        try {
            return
            await server_axios.patch(endpoints.user.user_update, data)
            enqueueSnackbar('آپدیت شد!', {
                variant: 'myCustomVariant',
                color: 'info'
            })
            setValue(data[name])
            editDialog.onFalse();
        } catch (error) {
            console.error(error);
        }
    });

    return (
        <FormProvider methods={methods} onSubmit={onSubmit}>
            {/* <DialogWithButton dialog={editDialog} fullWith={false}>

                <RHFTextField name={name} label={title} variant="filled" />
                <Box sx={{ mt: 4 }}>
                    <PrimaryButton isLoading={isSubmitting} type="submit" size="medium" fullWidth>
                        ذخیره
                    </PrimaryButton>
                </Box>

            </DialogWithButton> */}
            <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={1} sx={{
                borderBottom: (theme) => `1px solid ${theme.palette.divider}`
            }}>
                <Box display={'flex'} sx={{ py: 3, width: 1, alignItems: 'center' }}>
                    <Typography variant="body2" fontFamily={'peyda-regular'} sx={{ pr: 0 }}>{title}:</Typography>

                    {/*  */}
                    {!editDialog.value && (
                        <Typography variant="subtitle1" sx={{ fontFamily: 'peyda-bold', pl: 1, direction: 'rtl' }}>
                            {
                                name === 'phone' && `+${toPhoneNumberInputFormat(fieldValue)}`
                                || fieldValue
                            }
                        </Typography>
                    )}

                    {editDialog.value && (
                        <>
                            {name === 'phone' && (
                                <RHFPhoneInput
                                    name={name}
                                    sx={{ ml: 1 }}
                                    ISx={{
                                        // width: 'fit-content',
                                        // '& fieldset': { border: 'none' },
                                        '& input': { py: '0px!important', px: 0 },
                                    }}
                                    inProps={{
                                        onBlur: onSubmit
                                    }}
                                />
                            ) || (
                                    <RHFTextField
                                        name={name}
                                        onBlur={() => onSubmit}
                                        sx={{
                                            width: 'fit-content',
                                            // '& fieldset': { border: 'none' },
                                            '& input': { py: '0px!important' },
                                            ml: 1
                                        }}
                                    />
                                )}
                        </>
                    )}

                </Box>
                {(name !== "user_type") && (
                    <IconButton onClick={editDialog.onTrue}>
                        <SvgColor src="/assets/icons/user-panel/edit-02.svg" color={'#727272'} sx={{ width: 16, height: 16 }} />
                    </IconButton>
                )}
            </Stack>
        </FormProvider>
    )
}