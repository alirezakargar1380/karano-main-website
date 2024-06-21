import { useRef, useState, useEffect, useCallback } from 'react';

import { DialogProps } from '@mui/material/Dialog';

import { useBooleanReturnType } from 'src/hooks/use-boolean';
import { Stack, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useForm } from 'react-hook-form';
import FormProvider from 'src/components/hook-form';
import { LoadingButton } from '@mui/lab';
import { StyledRoundedWhiteButton } from '../styles/props/rounded-white-button';
import DialogWithButton from '../custom-dialog/dialog-with-button';
import HowToSendDialogOption from './options/how-to-send-dialog-option';

// ----------------------------------------------------------------------
interface Props {
    dialog: useBooleanReturnType
}


export default function HowToSendDialog({ dialog }: Props) {
    const defaultValues = {
    };

    const methods = useForm({
        defaultValues,
    });

    const { reset, watch, control, setValue, handleSubmit } = methods;

    const values = watch();

    const [scroll, setScroll] = useState<DialogProps['scroll']>('paper');

    const handleClickOpen = useCallback(
        (scrollType: DialogProps['scroll']) => () => {
            dialog.onTrue();
            //   setScroll(scrollType);
        },
        [dialog]
    );

    const descriptionElementRef = useRef<HTMLElement>(null);

    useEffect(() => {
        if (dialog.value) {
            const { current: descriptionElement } = descriptionElementRef;
            if (descriptionElement) {
                descriptionElement.focus();
            }
        }
    }, [dialog.value]);

    const onSubmit = handleSubmit(async (data) => {
        try {
            console.log(data)
        } catch (error) {
            console.error(error);
        }
    });

    return (
        <FormProvider methods={methods} onSubmit={onSubmit}>
            <DialogWithButton dialog={dialog} fullWith={false}>
                <Box sx={{ p: 4, bgcolor: 'white', borderRadius: '16px' }}>
                    <Typography variant="h4" sx={{ width: 1, pb: 2, fontFamily: 'peyda-bold', borderBottom: '1px solid #D1D1D1' }}>
                        جزئیات نحوه ارسال
                    </Typography>
                    <HowToSendDialogOption>تحویل در تهران</HowToSendDialogOption>
                    <HowToSendDialogOption>تحویل در تهران</HowToSendDialogOption>
                    <HowToSendDialogOption>تحویل در تهران</HowToSendDialogOption>
                    <Stack sx={{ mt: 2 }} direction={'row'} spacing={1} justifyContent={'end'}>
                        <StyledRoundedWhiteButton variant='outlined' sx={{ px: 4 }}>انصراف</StyledRoundedWhiteButton>
                        <LoadingButton variant='contained' sx={{ borderRadius: '24px', px: 4 }} >تایید</LoadingButton>
                    </Stack>
                </Box>
            </DialogWithButton>
        </FormProvider>
    );
}
