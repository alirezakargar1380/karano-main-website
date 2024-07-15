import { yupResolver } from "@hookform/resolvers/yup";
import { Box, IconButton, Stack, Typography } from "@mui/material";
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { DialogWithButton } from "src/components/custom-dialog";
import SvgColor from "src/components/svg-color";
import { useBoolean } from "src/hooks/use-boolean";
import * as Yup from 'yup';

import FormProvider, {
    RHFTextField,
} from 'src/components/hook-form';
import { LoadingButton } from "@mui/lab";
import { endpoints, server_axios } from "src/utils/axios";

import { useSnackbar } from 'src/components/snackbar';

interface Props {
    name: string
    title: string
    value: string
}

export default function UserDetailsRow({
    name,
    title,
    value
}: Props) {
    const [fieldValue, setValue] = useState(value);
    const editDialog = useBoolean();

    const { enqueueSnackbar } = useSnackbar();

    const NewProductSchema = Yup.object().shape({
        [name]: Yup.string().required('Name is required'),
    });


    const defaultValues = useMemo(
        () => ({
            [name]: value,
        }),
        []
    );

    const methods = useForm({
        resolver: yupResolver(NewProductSchema),
        defaultValues,
    });

    const {
        handleSubmit,
        formState: { isSubmitting },
    } = methods;

    const onSubmit = handleSubmit(async (data) => {
        try {
            await server_axios.patch(endpoints.user.user_update, data)
            enqueueSnackbar('آپدیت شد!', {
                variant: 'info'
            })
            setValue(data[name])
            editDialog.onFalse();
        } catch (error) {
            console.error(error);
        }
    });

    return (
        <>
            <DialogWithButton dialog={editDialog} fullWith={false}>
                <FormProvider methods={methods} onSubmit={onSubmit}>
                    <RHFTextField name={name} label={title} variant="filled" />
                    <Box sx={{ mt: 4 }}>
                        <LoadingButton loading={isSubmitting} type="submit" variant="contained" fullWidth>
                            ذخیره
                        </LoadingButton>
                    </Box>
                </FormProvider>
            </DialogWithButton>
            <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={1} sx={{
                borderBottom: (theme) => `1px solid ${theme.palette.divider}`
            }}>
                <Box display={'flex'} sx={{ py: 3 }}>
                    <Typography variant="subtitle1" fontFamily={'peyda-regular'}>{title}:</Typography>
                    <Typography variant="subtitle1" sx={{ fontFamily: 'peyda-bold', pl: 0.5, direction: 'rtl' }}>
                        {fieldValue}
                    </Typography>
                </Box>
                {(name !== "user_type") && (
                    <IconButton onClick={editDialog.onTrue}>
                        <SvgColor src="/assets/icons/user-panel/edit-02.svg" color={'#727272'} sx={{ width: 16, height: 16 }} />
                    </IconButton>
                )}
            </Stack>
        </>

    )
}