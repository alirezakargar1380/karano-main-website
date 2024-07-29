import { useRef, useState, useEffect, useCallback } from 'react';

import { DialogProps } from '@mui/material/Dialog';

import { useBooleanReturnType } from 'src/hooks/use-boolean';
import { Stack, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useForm } from 'react-hook-form';
import FormProvider, { RHFRadioGroupCard } from 'src/components/hook-form';
import { LoadingButton } from '@mui/lab';
import { DialogWithButton } from 'src/components/custom-dialog';
import { StyledRoundedWhiteButton } from 'src/components/styles/props/rounded-white-button';

// ----------------------------------------------------------------------
interface Props {
    dialog: useBooleanReturnType
    onUpdateAssemble: (is_need: boolean) => void;
}

export function AssembleDialog({ dialog, onUpdateAssemble }: Props) {
    const defaultValues = {
        assemble: '0'
    };

    const methods = useForm({
        defaultValues,
    });

    const {
        reset,
        watch,
        control,
        setValue,
        handleSubmit
    } = methods;

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
            onUpdateAssemble((data.assemble === '0') ? false : true)
            dialog.onFalse();
        } catch (error) {
            console.error(error);
        }
    });

    return (
        <DialogWithButton dialog={dialog} fullWith={false} width={640}>
            <FormProvider methods={methods} onSubmit={onSubmit}>
                <Box sx={{ p: 3, bgcolor: 'white', borderRadius: '16px' }}>
                    <Typography fontFamily={'peyda-bold'} variant='h4' borderBottom={(theme) => `1px solid ${theme.palette.divider}`} pb={2}>
                        تاییدیه هزینه مونتاژ
                    </Typography>

                    <Typography fontFamily={'peyda-bold'} pb={2} color={"#727272"} pt={3}>
                        آیا می‌خواهیدسفارش شما توسط کارانو مونتاژ ‌شود؟
                    </Typography>

                    <Stack direction={'row'} spacing={2} py={2}>
                        <RHFRadioGroupCard
                            name='assemble'
                            row
                            options={[
                                {
                                    label: 'خیر',
                                    value: '0'
                                },
                                {
                                    label: 'بله',
                                    value: '1'
                                }
                            ]}
                            RadioSx={{
                                // p: '4px',
                                // '&::after': {
                                //     content: '""',
                                //     position: 'absolute',
                                //     left: '4px',
                                //     // right: '1px',
                                //     top: '4px',
                                //     // bottom: '6px',
                                //     background: 'white',
                                //     borderRadius: '50%',
                                //     width: '6px',
                                //     height: '6px'
                                // },
                            }}
                        />
                    </Stack>


                    <Stack direction={'row'} spacing={1} justifyContent={'end'}>
                        <StyledRoundedWhiteButton variant='outlined' onClick={dialog.onFalse}>
                            انصرف
                        </StyledRoundedWhiteButton>
                        <LoadingButton variant='contained' type='submit' sx={{ borderRadius: '24px', px: 4 }}>
                            تایید
                        </LoadingButton>
                    </Stack>
                </Box>
            </FormProvider>
        </DialogWithButton>
    )
}