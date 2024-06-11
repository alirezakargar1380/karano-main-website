import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Dialog, { DialogProps } from '@mui/material/Dialog';
import DialogContentText from '@mui/material/DialogContentText';

import { useBoolean, useBooleanReturnType } from 'src/hooks/use-boolean';
import { Avatar, FormControl, FormControlLabel, Grid, Radio, RadioGroup, Stack, TableBody, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useForm } from 'react-hook-form';
import FormProvider, { RHFRadioGroup, RHFRadioGroupWithImage, RHFSelect } from 'src/components/hook-form';
import Table from '@mui/material/Table';
import Scrollbar from 'src/components/scrollbar';
import CartTableRow from '../cart-table-row';
import { TableHeadCustom } from 'src/components/table';
import RHFTitleTextField from 'src/components/hook-form/rhf-title-text-field';
import { IProductDefaultDetails } from 'src/types/product';
import { endpoints } from 'src/utils/axios';

export const CartTableHead = [
    { id: 'name', label: 'نوع پروفیل' },
    { id: 'createdAt', label: 'پوشش نهایی', width: 160 },
    { id: 'inventoryType', label: 'نوع قاب', width: 160 },
    { id: 'price', label: 'روکش گیری', width: 140 },
    { id: 'publish', label: 'ابعاد', width: 110 },
    { id: 'publish', label: 'تعداد', width: 110 },
    { id: '', width: 88 },
]

interface Props {
    title: string
    formOptions: IProductDefaultDetails
}

export default function CartDialogView({ title, formOptions }: Props) {
    return (
        <Scrollbar sx={{ maxHeight: 860 }}>
            <Grid container spacing={4} sx={{ width: 1, padding: 3 }}>
                <Grid item xs={12} md={4}>
                    <Typography sx={{ borderBottom: '1px solid #D1D1D1', pb: 2 }} variant='h3'>
                        {title}
                    </Typography>
                    <Box sx={{ pt: 2, borderBottom: '1px solid #D1D1D1', pb: 2 }}>
                        <Typography sx={{ pb: 2 }} variant='h6' color={'#727272'}>
                            ویژگی های مورد نظر را انتخاب کنید
                        </Typography>
                        <Box width={1}>
                            <Typography variant="subtitle2" fontFamily={'peyda-bold'} sx={{
                                width: 1, pb: 1
                            }}>
                                نوع پروفیل
                            </Typography>

                            {/* <Stack direction={'row'}
                                spacing={2}
                                columnGap={2}
                                rowGap={3}
                                display="grid"
                                gridTemplateColumns={{
                                    xs: 'repeat(1, 1fr)',
                                    md: 'repeat(2, 1fr)',
                                }}
                            > */}
                            <RHFRadioGroup name='' row
                                sx={{
                                    width: 1,
                                    display: 'grid',
                                    gridTemplateColumns: {
                                        xs: 'repeat(1, 1fr)',
                                        md: 'repeat(2, 1fr)',
                                    },
                                }}
                                FormControlSx={{
                                    width: 1
                                }}
                                options={formOptions.profile_type.map((profile_type) => {
                                    return {
                                        label: profile_type.name,
                                        value: profile_type.name,
                                    }
                                })}
                            />
                            {/* <FormControl component="fieldset">
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
                                </FormControl> */}
                            {/* </Stack> */}
                        </Box>
                    </Box>
                    <Box sx={{ py: 2, borderBottom: '1px solid #D1D1D1' }}>
                        <Typography variant="subtitle2" fontFamily={'peyda-bold'} sx={{
                            width: 1, pb: 1
                        }}>
                            پوشش نهایی
                        </Typography>
                        <RHFRadioGroupWithImage name=''
                            FSx={{
                                '&.MuiFormControlLabel-root': {
                                    ml: 0,
                                    mr: 0
                                }
                            }}
                            options={formOptions.cover_type.map((cover_type) => {
                                return {
                                    label: cover_type.name,
                                    value: cover_type.name,
                                    src: endpoints.cover_type.get_image(cover_type.icon_image_name)
                                }
                            })}
                        // options={[
                        //     {
                        //         label: 'nhka',
                        //         value: '',
                        //         src: ''
                        //     },
                        //     {
                        //         label: 'nhka',
                        //         value: '',
                        //         src: ''
                        //     },
                        //     {
                        //         label: 'nhka',
                        //         value: '',
                        //         src: ''
                        //     },
                        //     {
                        //         label: 'nhka',
                        //         value: '',
                        //         src: ''
                        //     },
                        // ]}
                        />
                    </Box>
                    <Box sx={{ py: 2, borderBottom: '1px solid #D1D1D1' }}>
                        <Typography variant="subtitle2" fontFamily={'peyda-bold'} sx={{
                            width: 1, pb: 1
                        }}>
                            نوع قاب
                        </Typography>
                        <RHFRadioGroup name='' row
                            sx={{
                                mt: 2,
                                width: 1,
                                display: 'grid',
                                rowGap: 1,
                                gridTemplateColumns: {
                                    xs: 'repeat(1, 1fr)',
                                    md: 'repeat(2, 1fr)',
                                },
                            }}
                            FormControlSx={{
                                width: 1
                            }}
                            options={formOptions.frame_type.map((frame_type) => {
                                return {
                                    label: frame_type.name,
                                    value: frame_type.name,
                                }
                            })}
                        />
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
                                        label={"جناقی"}
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
                                        label={"غیر جناقی"}
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
                <Grid item xs={12} md={8}>
                    <Typography sx={{ borderBottom: '1px solid #D1D1D1', pb: 2 }} variant='h3'>
                        لیست سفارش های ثبت شده
                    </Typography>
                    <Box>
                        <Scrollbar sx={{ maxHeight: 680 }}>
                            <Table size={'medium'} sx={{ minWidth: 780 }}>
                                <TableHeadCustom
                                    sx={{
                                        backgroundColor: '#F2F2F2'
                                    }}
                                    headLabel={CartTableHead}
                                />

                                <TableBody>
                                    {[...Array(30)].map((data, index: number) => (
                                        <CartTableRow
                                            onDeleteRow={() => { }}
                                            onEditRow={() => { }}
                                            key={index}
                                            row={{
                                                quality: 11,
                                                coating: 'غیر جناقی',
                                                dimensions: '210*235',
                                                final_coating: 'روکش خام',
                                                frame_type: 'حجمی',
                                                profile_type: 'درب کابینتی',
                                            }}
                                        />
                                    ))}
                                </TableBody>
                            </Table>
                        </Scrollbar>
                    </Box>
                </Grid>
            </Grid>
        </Scrollbar>
    );
}