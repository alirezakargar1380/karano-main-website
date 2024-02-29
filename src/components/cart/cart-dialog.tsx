import { useRef, useState, useEffect, useCallback } from 'react';

import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Dialog, { DialogProps } from '@mui/material/Dialog';
import DialogContentText from '@mui/material/DialogContentText';

import { useBoolean, useBooleanReturnType } from 'src/hooks/use-boolean';
import { Avatar, FormControl, FormControlLabel, Grid, Radio, RadioGroup, Stack, Typography } from '@mui/material';
import { Box } from '@mui/system';
import RHFTitleTextField from '../hook-form/rhf-title-text-field';
import { useForm } from 'react-hook-form';
import FormProvider, { RHFSelect } from 'src/components/hook-form';

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
            <Dialog open={dialog.value} onClose={dialog.onFalse} scroll={scroll} fullWidth={true} maxWidth={'xl'}>
                <DialogActions>
                    <Grid container spacing={4}>
                        <Grid item md={4}>
                            <Typography sx={{ borderBottom: '1px solid #D1D1D1', pb: 2 }} variant='h3'>درب کابینتی - P60</Typography>
                            <Box sx={{ pt: 2, borderBottom: '1px solid #D1D1D1', pb: 2 }}>
                                <Typography sx={{ pb: 2 }} variant='h6' color={'#727272'}>
                                    ویژگی های مورد نظر را انتخاب کنید
                                </Typography>
                                <Box>
                                    <Typography variant="subtitle2" fontFamily={'peyda-bold'} sx={{
                                        width: 1, pb: 1
                                    }}>
                                        نوع پروفیل
                                    </Typography>
                                    <Stack direction={'row'} spacing={2}>
                                        <FormControl component="fieldset">
                                            <RadioGroup row defaultValue="top">
                                                <FormControlLabel
                                                    label={"درب کشو"}
                                                    labelPlacement={'end'}
                                                    control={
                                                        <Radio size="medium" />
                                                    }
                                                    sx={{ textTransform: 'capitalize' }}
                                                />
                                            </RadioGroup>
                                        </FormControl>

                                        <FormControl component="fieldset">
                                            <RadioGroup row defaultValue="top">
                                                <FormControlLabel
                                                    label={'درب کابینتی'}
                                                    labelPlacement={'end'}
                                                    control={
                                                        <Radio size="medium" />
                                                    }
                                                    sx={{ textTransform: 'capitalize' }}
                                                />
                                            </RadioGroup>
                                        </FormControl>
                                    </Stack>
                                </Box>
                            </Box>
                            <Box sx={{ py: 2, borderBottom: '1px solid #D1D1D1' }}>
                                <Typography variant="subtitle2" fontFamily={'peyda-bold'} sx={{
                                    width: 1, pb: 1
                                }}>
                                    پوشش نهایی
                                </Typography>
                                <Stack direction={'row'}
                                    spacing={2}
                                    columnGap={2}
                                    rowGap={3}
                                    display="grid"
                                    gridTemplateColumns={{
                                        xs: 'repeat(1, 1fr)',
                                        md: 'repeat(2, 1fr)',
                                    }}>
                                    <FormControl component="fieldset">
                                        <RadioGroup row defaultValue="top">
                                            <FormControlLabel
                                                label={"درب کشو"}
                                                labelPlacement={'end'}
                                                control={
                                                    <>
                                                        <Radio size="medium" />
                                                        <Avatar sx={{ mr: 1 }} />
                                                    </>

                                                }
                                                sx={{ textTransform: 'capitalize' }}
                                            />
                                        </RadioGroup>
                                    </FormControl>
                                    <FormControl component="fieldset">
                                        <RadioGroup row defaultValue="top">
                                            <FormControlLabel
                                                label={"درب کشو"}
                                                labelPlacement={'end'}
                                                control={
                                                    <>
                                                        <Radio size="medium" />
                                                        <Avatar sx={{ mr: 1 }} />
                                                    </>

                                                }
                                                sx={{ textTransform: 'capitalize' }}
                                            />
                                        </RadioGroup>
                                    </FormControl>
                                    <FormControl component="fieldset">
                                        <RadioGroup row defaultValue="top">
                                            <FormControlLabel
                                                label={"درب کشو"}
                                                labelPlacement={'end'}
                                                control={
                                                    <>
                                                        <Radio size="medium" />
                                                        <Avatar sx={{ mr: 1 }} />
                                                    </>

                                                }
                                                sx={{ textTransform: 'capitalize' }}
                                            />
                                        </RadioGroup>
                                    </FormControl>
                                    <FormControl component="fieldset">
                                        <RadioGroup row defaultValue="top">
                                            <FormControlLabel
                                                label={"درب کشو"}
                                                labelPlacement={'end'}
                                                control={
                                                    <>
                                                        <Radio size="medium" />
                                                        <Avatar sx={{ mr: 1 }} />
                                                    </>

                                                }
                                                sx={{ textTransform: 'capitalize' }}
                                            />
                                        </RadioGroup>
                                    </FormControl>
                                </Stack>
                            </Box>
                            <Box sx={{ py: 2, borderBottom: '1px solid #D1D1D1' }}>
                                <Typography variant="subtitle2" fontFamily={'peyda-bold'} sx={{
                                    width: 1, pb: 1
                                }}>
                                    نوع قاب
                                </Typography>
                                <Stack direction={'row'}
                                    spacing={2}
                                    columnGap={2}
                                    rowGap={3}
                                    display="grid"
                                    gridTemplateColumns={{
                                        xs: 'repeat(1, 1fr)',
                                        md: 'repeat(2, 1fr)',
                                    }}>
                                    <FormControl component="fieldset">
                                        <RadioGroup row defaultValue="top">
                                            <FormControlLabel
                                                label={"حجمی"}
                                                labelPlacement={'end'}
                                                control={
                                                    <Radio size="medium" />
                                                }
                                                sx={{ textTransform: 'capitalize' }}
                                            />
                                        </RadioGroup>
                                    </FormControl>
                                    <FormControl component="fieldset">
                                        <RadioGroup row defaultValue="top">
                                            <FormControlLabel
                                                label={"حجمی"}
                                                labelPlacement={'end'}
                                                control={
                                                    <Radio size="medium" />
                                                }
                                                sx={{ textTransform: 'capitalize' }}
                                            />
                                        </RadioGroup>
                                    </FormControl>
                                    <FormControl component="fieldset">
                                        <RadioGroup row defaultValue="top">
                                            <FormControlLabel
                                                label={"حجمی"}
                                                labelPlacement={'end'}
                                                control={
                                                    <Radio size="medium" />
                                                }
                                                sx={{ textTransform: 'capitalize' }}
                                            />
                                        </RadioGroup>
                                    </FormControl>
                                    <FormControl component="fieldset">
                                        <RadioGroup row defaultValue="top">
                                            <FormControlLabel
                                                label={"حجمی"}
                                                labelPlacement={'end'}
                                                control={
                                                    <Radio size="medium" />
                                                }
                                                sx={{ textTransform: 'capitalize' }}
                                            />
                                        </RadioGroup>
                                    </FormControl>
                                </Stack>
                            </Box>
                            <Box sx={{ py: 2, borderBottom: '1px solid #D1D1D1' }}>
                                <Typography variant="subtitle2" fontFamily={'peyda-bold'} sx={{
                                    width: 1, pb: 1
                                }}>
                                    نوع روکش گیری
                                </Typography>
                                <Stack direction={'row'}
                                    spacing={2}
                                    columnGap={2}
                                    rowGap={3}
                                    display="grid"
                                    gridTemplateColumns={{
                                        xs: 'repeat(1, 1fr)',
                                        md: 'repeat(2, 1fr)',
                                    }}>
                                    <FormControl component="fieldset">
                                        <RadioGroup row defaultValue="top">
                                            <FormControlLabel
                                                label={"حجمی"}
                                                labelPlacement={'end'}
                                                control={
                                                    <Radio size="medium" />
                                                }
                                                sx={{ textTransform: 'capitalize' }}
                                            />
                                        </RadioGroup>
                                    </FormControl>
                                    <FormControl component="fieldset">
                                        <RadioGroup row defaultValue="top">
                                            <FormControlLabel
                                                label={"حجمی"}
                                                labelPlacement={'end'}
                                                control={
                                                    <Radio size="medium" />
                                                }
                                                sx={{ textTransform: 'capitalize' }}
                                            />
                                        </RadioGroup>
                                    </FormControl>
                                </Stack>
                            </Box>
                            <Box sx={{ py: 2 }}>
                                <Typography variant="subtitle2" fontFamily={'peyda-bold'} sx={{
                                    width: 1, pb: 1
                                }}>
                                    ابعاد
                                </Typography>
                                <Stack direction={'row'}
                                    sx={{ pb: 2 }}
                                    spacing={2}
                                    columnGap={2}
                                    rowGap={3}
                                    display="grid"
                                    gridTemplateColumns={{
                                        xs: 'repeat(1, 1fr)',
                                        md: 'repeat(2, 1fr)',
                                    }}>
                                    <RHFTitleTextField name='' custom_label='عرض(سانتی‌متر)' placeholder='26' />
                                    <RHFTitleTextField name='' custom_label='طول - راه روکش (سانتی‌متر) ' placeholder='84' />
                                </Stack>
                                <RHFTitleTextField name='' custom_label='تعداد' placeholder='2' />
                            </Box>
                        </Grid>
                        <Grid item md={8}>
                            <Typography sx={{ borderBottom: '1px solid #D1D1D1', pb: 2 }} variant='h3'>
                                لیست سفارش های ثبت شده
                            </Typography>
                        </Grid>
                    </Grid>
                    {/* <Button onClick={dialog.onFalse}>Cancel</Button> */}
                </DialogActions>
                <DialogTitle sx={{ pb: 2 }}>Subscribe</DialogTitle>

                <DialogContent dividers={scroll === 'paper'}>
                    <DialogContentText ref={descriptionElementRef} tabIndex={-1}>
                        {[...new Array(50)]
                            .map(
                                () => `Cras mattis consectetur purus sit amet fermentum.
Cras justo odio, dapibus ac facilisis in, egestas eget quam.
Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
Praesent commodo cursus magna, vel scelerisque nisl consectetur et.`
                            )
                            .join('\n')}
                    </DialogContentText>
                </DialogContent>


            </Dialog>
        </FormProvider>

    );
}
