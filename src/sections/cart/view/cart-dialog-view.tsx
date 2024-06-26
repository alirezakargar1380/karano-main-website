import {
    Grid, Stack, TableBody, Typography
} from '@mui/material';
import { Box } from '@mui/system';
import { RHFRadioGroup, RHFRadioGroupWithImage } from 'src/components/hook-form';
import Table from '@mui/material/Table';
import Scrollbar from 'src/components/scrollbar';
import CartTableRow from '../cart-table-row';
import { TableHeadCustom } from 'src/components/table';
import RHFTitleTextField from 'src/components/hook-form/rhf-title-text-field';
import { IProductDefaultDetails } from 'src/types/product';
import { endpoints } from 'src/utils/axios';
import { ICheckoutAddCustomMadeProductData, ICheckoutItemPropertyPrice } from 'src/types/checkout';

export const CartTableHead = [
    { id: 'name', label: 'نوع پروفیل' },
    { id: 'createdAt', label: 'پوشش نهایی', width: 160 },
    { id: 'inventoryType', label: 'نوع قاب', width: 160 },
    { id: 'price', label: 'روکش گیری', width: 140 },
    { id: 'publish', label: 'ابعاد', width: 110 },
    { id: 'quntity', label: 'تعداد', width: 110 },
    { id: 'zzz', width: 88 },
]

export const ReadyProductCartTableHead = [
    { id: 'name', label: 'نوع پوشش' },
    { id: 'publish', label: 'ابعاد', width: 110 },
    { id: 'quntity', label: 'تعداد', width: 110 },
    { id: 'zzz', width: 88 },
]

interface Props {
    title: string
    formOptions: IProductDefaultDetails
    data: ICheckoutItemPropertyPrice[]
    onUpdate: (id: number) => void
}

export default function CartDialogView({
    title,
    formOptions,
    data,
    onUpdate
}: Props) {

    return (
        // <Scrollbar sx={{ minHeight: 200 }}>
        <Grid container spacing={4} sx={{ width: 1, padding: 3 }}>
            <Grid item xs={12} md={4}>
                <Box sx={{ px: 0 }}>
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

                            <RHFRadioGroup
                                name='profile_type'
                                row
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
                                        value: profile_type.id,
                                    }
                                })}
                            />
                        </Box>
                    </Box>
                    <Box sx={{ py: 2, borderBottom: '1px solid #D1D1D1' }}>
                        <Typography variant="subtitle2" fontFamily={'peyda-bold'} sx={{
                            width: 1, pb: 1
                        }}>
                            پوشش نهایی
                        </Typography>
                        <RHFRadioGroupWithImage
                            name='cover_type'
                            FSx={{
                                '&.MuiFormControlLabel-root': {
                                    ml: 0,
                                    mr: 0
                                }
                            }}
                            options={formOptions.cover_type.map((cover_type) => {
                                return {
                                    label: cover_type.name,
                                    value: cover_type.id,
                                    src: endpoints.cover_type.get_image(cover_type.icon_image_name)
                                }
                            })}
                        />
                    </Box>
                    <Box sx={{ py: 2, borderBottom: '1px solid #D1D1D1' }}>
                        <Typography variant="subtitle2" fontFamily={'peyda-bold'} sx={{
                            width: 1, pb: 1
                        }}>
                            نوع قاب
                        </Typography>
                        <RHFRadioGroup
                            name='frame_type'
                            row
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
                                    value: frame_type.id,
                                }
                            })}
                        />
                    </Box>
                    <Box sx={{ py: 2, borderBottom: '1px solid #D1D1D1' }}>
                        <Typography variant="subtitle2" fontFamily={'peyda-bold'} sx={{
                            width: 1, pb: 3, pt: 1
                        }}>
                            نوع روکش گیری
                        </Typography>
                        <RHFRadioGroup
                            name='coating_type'
                            row
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
                            options={[
                                {
                                    label: 'جناقی',
                                    value: 'جناقی'
                                },
                                {
                                    label: 'غیر جناقی',
                                    value: 'غیر جناقی'
                                }
                            ]}
                        />
                    </Box>
                    <Box sx={{ py: 2 }}>
                        <Typography variant="subtitle2" fontFamily={'peyda-bold'} sx={{
                            width: 1, pb: 3, pt: 1
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
                            <RHFTitleTextField name='dimention.height' custom_label='عرض (سانتی‌متر)' placeholder='26' />
                            <RHFTitleTextField name='dimention.width' custom_label='طول - راه روکش (سانتی‌متر) ' placeholder='84' />
                        </Stack>
                        <RHFTitleTextField name='quantity' custom_label='تعداد' placeholder='2' />
                    </Box>
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
                                {data.map((item, index: number) => (
                                    <CartTableRow
                                        onDeleteRow={() => { }}
                                        onEditRow={() => onUpdate(index)}
                                        key={index}
                                        row={{
                                            quality: item.quantity,
                                            coating: item?.coating_type,
                                            dimensions: item.dimention.width + 'x' + item.dimention.height,
                                            final_coating: item.cover_type?.name,
                                            frame_type: item.frame_type?.name,
                                            profile_type: item.profile_type?.name,
                                        }}
                                    />
                                ))}
                            </TableBody>
                        </Table>
                    </Scrollbar>
                </Box>
            </Grid>
        </Grid>
        // </Scrollbar>
    );
}