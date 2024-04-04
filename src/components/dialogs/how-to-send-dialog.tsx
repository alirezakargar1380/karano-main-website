import { useRef, useState, useEffect, useCallback } from 'react';

import DialogContent from '@mui/material/DialogContent';
import Dialog, { DialogProps } from '@mui/material/Dialog';

import { useBoolean, useBooleanReturnType } from 'src/hooks/use-boolean';
import { Fade, IconButton, Radio, Stack, TableBody, Typography } from '@mui/material';
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
import SvgColor from '../svg-color';
import { tr } from 'date-fns/locale';
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
            <DialogWithButton title='جزئیات نحوه ارسال' dialog={dialog} fullWith={false}>
                <HowToSendDialogOption>تحویل در تهران</HowToSendDialogOption>
                <HowToSendDialogOption>تحویل در تهران</HowToSendDialogOption>
                <HowToSendDialogOption>تحویل در تهران</HowToSendDialogOption>
            </DialogWithButton>
        </FormProvider>
    );
}
