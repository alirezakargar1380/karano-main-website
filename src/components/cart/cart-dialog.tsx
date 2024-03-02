import { useRef, useState, useEffect, useCallback } from 'react';

import DialogContent from '@mui/material/DialogContent';
import Dialog, { DialogProps } from '@mui/material/Dialog';

import { useBoolean, useBooleanReturnType } from 'src/hooks/use-boolean';
import { Stack, TableBody, Typography } from '@mui/material';
import { Box } from '@mui/system';
import RHFTitleTextField from '../hook-form/rhf-title-text-field';
import { useForm } from 'react-hook-form';
import FormProvider, { RHFSelect } from 'src/components/hook-form';
import Table from '@mui/material/Table';
import { TableHeadCustom } from '../table';
import CartTableRow from '../../sections/cart/cart-table-row';
import Scrollbar from '../scrollbar';
import { CartDialogView } from 'src/sections/cart/view';
import { LoadingButton } from '@mui/lab';
import { StyledRoundedWhiteButton } from '../styles/props/rounded-white-button';

// ----------------------------------------------------------------------
interface Props {
    dialog: useBooleanReturnType
}


export default function CartDialog({ dialog }: Props) {
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
        } catch (error) {
            console.error(error);
        }
    });

    return (
        <FormProvider methods={methods} onSubmit={onSubmit}>
            <Dialog open={dialog.value} onClose={dialog.onFalse} scroll={'paper'} fullWidth={true} maxWidth={'xl'}>
                <CartDialogView />


                <DialogContent sx={{ p: 4, backgroundColor: '#F8F8F8', overflow: 'hidden' }}>

                    <Stack direction={'row'} justifyContent={'space-between'}>
                        <Box>
                            <StyledRoundedWhiteButton variant='outlined' sx={{ px: 6 }}>افزودن به لیست</StyledRoundedWhiteButton>
                        </Box>
                        <Stack direction={'row'} spacing={2}>
                            <StyledRoundedWhiteButton variant='outlined' sx={{ px: 2 }} onClick={dialog.onFalse}>انصراف</StyledRoundedWhiteButton>
                            <LoadingButton variant='contained' sx={{ borderRadius: '24px', px: 4 }}>افزودن به لیست سبد</LoadingButton>
                        </Stack>
                    </Stack>
                    {/* <Button onClick={dialog.onFalse}>Cancel</Button> */}
                </DialogContent>
            </Dialog>
        </FormProvider>
    );
}
