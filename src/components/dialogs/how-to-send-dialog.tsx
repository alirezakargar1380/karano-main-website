import { useRef, useState, useEffect, useCallback } from 'react';

import DialogContent from '@mui/material/DialogContent';
import Dialog, { DialogProps } from '@mui/material/Dialog';

import { useBoolean, useBooleanReturnType } from 'src/hooks/use-boolean';
import { IconButton, Radio, Stack, TableBody, Typography } from '@mui/material';
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
        } catch (error) {
            console.error(error);
        }
    });

    return (
        <FormProvider methods={methods} onSubmit={onSubmit}>
            <Dialog open={dialog.value} onClose={dialog.onFalse} scroll={'paper'} maxWidth={false}
                PaperProps={{
                    style: {
                        backgroundColor: 'transparent',
                        boxShadow: 'none',
                    },
                }}
                fullWidth={false}
                sx={{}}
            >
                <Box sx={{ minWidth: 480, display: 'flex' }}>
                    <Scrollbar sx={{ maxHeight: 'fit-content' }}>
                        <Box sx={{ p: 4, bgcolor: 'white', borderRadius: '16px' }}>
                            <Typography variant="h4" sx={{ width: 1, pb: 2, fontFamily: 'peyda-bold', borderBottom: '1px solid #D1D1D1' }}>
                                جزئیات نحوه ارسال
                            </Typography>
                            <Stack direction="row" spacing={2} sx={{ mb: 2, pt: 2 }}>
                                <Box sx={{
                                    border: '1px solid #D1D1D1', borderRadius: '8px', width: 1, display: 'flex', py: 1,
                                    '&:hover': {
                                        cursor: 'pointer',
                                        border: '1px solid #000'
                                    }
                                }}>
                                    <Radio size="small" />
                                    <SvgColor src='/assets/icons/orders/delivery/flag-01.svg' sx={{ mt: 1 }} />
                                    <Typography variant="h6" sx={{
                                        //fontFamily: 'peyda-bold',
                                        mt: 1,
                                        pl: 1
                                    }}>
                                        تحویل در تهران
                                    </Typography>
                                </Box>
                            </Stack>
                        </Box>
                    </Scrollbar>
                    <IconButton onClick={() => { dialog.onFalse() }} sx={{ bgcolor: 'white', height: 'fit-content', ml: 2, borderRadius: '50%', border: '1px solid #D1D1D1', '&:hover': { background: '#F2F2F2' } }}>
                        <SvgColor src='/assets/icons/navbar/x-close.svg' />
                    </IconButton>
                </Box>
            </Dialog>
        </FormProvider>
    );
}
