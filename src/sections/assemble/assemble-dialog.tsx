import { useRef, useState, useEffect, useCallback } from 'react';

import { DialogProps } from '@mui/material/Dialog';

import { useBooleanReturnType } from 'src/hooks/use-boolean';
import { Stack, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useForm } from 'react-hook-form';
import FormProvider, { RHFRadioGroupCard } from 'src/components/hook-form';
import { LoadingButton } from '@mui/lab';
import { DialogWithButton } from 'src/components/custom-dialog';
import { SecondaryButton } from 'src/components/styles/buttons/secondary';
import { PrimaryButton } from 'src/components/styles/buttons/primary';

// ----------------------------------------------------------------------
interface Props {
    dialog: useBooleanReturnType
    onUpdateAssemble: (is_need: boolean) => void;
}

export function AssembleDialog({ dialog, onUpdateAssemble }: Props) {
    const defaultValues = {
        assemble: ''
    };

    const methods = useForm({
        defaultValues,
    });

    const {
        watch,
        handleSubmit
    } = methods;

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
                <Box sx={{ bgcolor: 'white', borderRadius: '16px' }}>
                    <Typography variant='title1' borderBottom={(theme) => `1px solid ${theme.palette.divider}`} pb={'16px'}>
                        تاییدیه هزینه مونتاژ
                    </Typography>

                    <Typography variant={'body2'} pb={2} color={"#727272"} pt={3}>
                        آیا می‌خواهیدسفارش شما توسط کارانو مونتاژ ‌شود؟
                    </Typography>

                    <Stack direction={'row'} spacing={2} py={2}>
                        <RHFRadioGroupCard
                            name='assemble'
                            variant='body4'
                            row
                            options={[
                                {
                                    label: 'بله',
                                    value: '1'
                                },
                                {
                                    label: 'خیر',
                                    value: '0'
                                },
                            ]}
                            BSx={{
                                pr: 5,
                                pl: '8px',
                                py: 0,
                                borderRadius: '8px',
                            }}
                            RadioSx={{
                                ml: 0.5,
                                mr: 0.25
                            }}
                        />
                    </Stack>


                    <Stack direction={'row'} spacing={'12px'} justifyContent={'end'}>
                        <SecondaryButton size='medium' sx={{ px: 4 }} onClick={dialog.onFalse}>
                            انصراف
                        </SecondaryButton>
                        <PrimaryButton size='medium' type='submit' sx={{ borderRadius: '24px', px: 4 }}>
                            تایید
                        </PrimaryButton>
                    </Stack>
                </Box>
            </FormProvider>
        </DialogWithButton>
    )
}