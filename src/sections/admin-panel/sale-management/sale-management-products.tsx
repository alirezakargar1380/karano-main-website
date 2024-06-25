import { Box, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import FormProvider, { RHFRadioGroup, RHFRadioGroupCard, RHFTextField } from "src/components/hook-form";
import Scrollbar from "src/components/scrollbar";
import { IOrderProductItem } from "src/types/order-products";
import { IProductItem, IProductProperties } from "src/types/product";
import { endpoints, server_axios } from "src/utils/axios";
import { useSnackbar } from 'src/components/snackbar';

interface Props {
    order: IOrderProductItem[]
}


export default function SaleManagementProducts({ order }: Props) {

    return (
        <Box border={(theme) => `1px solid ${theme.palette.divider}`} bgcolor={'#FFF'} width={1} borderRadius={'16px'}>
            <Stack direction={'column'} p={2} spacing={1.5} borderBottom={(theme) => `1px solid ${theme.palette.divider}`}>
                <Stack direction={'row'}>
                    <Box display={'flex'} width={'50%'}>
                        <Typography variant="h6" fontFamily={'peyda-bold'}>کد سفارش:</Typography>
                        <Typography variant="h6" fontFamily={'peyda-light'} sx={{ pl: 1 }}>
                            123456789
                        </Typography>
                    </Box>
                    <Box display={'flex'} width={'50%'}>
                        <Typography variant="h6" fontFamily={'peyda-bold'}>تعداد کالا :</Typography>
                        <Typography variant="h6" fontFamily={'peyda-light'} sx={{ pl: 1 }}>
                            {order.length > 0 ? order.map(({ product, properties }) => properties?.map((p) => p?.quantity)?.reduce((a, b) => (a ?? 0) + (b ?? 0), 0)) : 0}
                        </Typography>
                    </Box>
                </Stack>
                <Stack direction={'row'}>
                    <Box display={'flex'} width={'50%'}>
                        <Typography variant="h6" fontFamily={'peyda-bold'}>تاریخ ثب سفارش:</Typography>
                        <Typography variant="h6" fontFamily={'peyda-light'} sx={{ pl: 1 }}>
                            1402/02/01
                        </Typography>
                    </Box>
                    <Box display={'flex'} width={'50%'}>
                        <Typography variant="h6" fontFamily={'peyda-bold'}>
                            نام سفارش دهنده:
                        </Typography>
                        <Typography variant="h6" fontFamily={'peyda-light'} sx={{ pl: 1 }}>
                            لهراسب افروزنده
                        </Typography>
                    </Box>
                </Stack>
            </Stack>
            <Box p={2}>
                {order.map(({ product, properties }) => (
                    <Box key={product.id}>
                        {properties.map((p, propertyIndex) => (
                            <SaleManagementProductItem
                                key={propertyIndex}
                                product={product}
                                property={p}
                            />
                        ))}
                    </Box>
                ))}
            </Box>

        </Box>
    )
}

interface SaleManagmentItem {
    product: IProductItem,
    property: IProductProperties
}

function SaleManagementProductItem({
    product,
    property
}: SaleManagmentItem) {

    const { enqueueSnackbar } = useSnackbar();

    const methods = useForm({
        // resolver: yupResolver<any>(schema),
        defaultValues: {
            rejection_reason: property.rejection_reason || null,
            is_approved: (property.is_approved !== null) ? (property.is_approved ? '1' : '0')  : null
        },
    });

    const {
        reset,
        control,
        setValue,
        handleSubmit,
        watch,
        formState: { isSubmitting },
    } = methods;

    const values = watch();

    const onSubmit = handleSubmit(async (d) => {
        try {
            console.log(d);
            await server_axios.patch(endpoints.orderProductProperties.update(property.id), {
                ...d,
                rejection_reason: (d.rejection_reason) ? d.rejection_reason : null,
            })
                .then(({ data }) => {
                    enqueueSnackbar('آپدیت شد', {
                        variant: 'info'
                    })
                })
        } catch (error) {
            console.error(error);
            reset();
        }
    });

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            if (values.rejection_reason !== '' && values.rejection_reason !== property.rejection_reason) onSubmit();
        }, 1500)

        return () => clearTimeout(delayDebounceFn)
    }, [values.rejection_reason]);

    const handleApprove = useCallback((event: any) => {
        const v = event.target.value
        if (v === '1') {
            setValue('rejection_reason', '')
        }
        setValue('is_approved', v);
        onSubmit();
    }, [])

    return (
        <Box sx={{ mb: 6 }}>
            <Stack p={0} spacing={2} mb={2}>
                <Typography fontFamily={'peyda-bold'} variant="h5" mt={1}>
                    {product.name}
                </Typography>
                <TableContainer sx={{ overflow: 'unset' }}>
                    <Scrollbar>
                        <Table sx={{
                            // minWidth: 960 
                        }}>
                            <TableHead>
                                <TableRow>

                                    <TableCell sx={{ fontFamily: 'peyda-bold' }}>
                                        نوع پروفیل
                                    </TableCell>

                                    <TableCell sx={{ fontFamily: 'peyda-bold' }}>
                                        پوشش نهایی
                                    </TableCell>

                                    <TableCell sx={{ fontFamily: 'peyda-bold' }}>
                                        نوع قاب
                                    </TableCell>

                                    <TableCell sx={{ fontFamily: 'peyda-bold' }}>
                                        روکش گیری
                                    </TableCell>
                                    <TableCell sx={{ fontFamily: 'peyda-bold' }}>
                                        ابعاد
                                    </TableCell>

                                    <TableCell sx={{ fontFamily: 'peyda-bold' }}>
                                        تعداد
                                    </TableCell>
                                </TableRow>
                            </TableHead>

                            <TableBody>
                                <TableRow>

                                    <TableCell>
                                        {property.profile_type?.name || '-'}
                                    </TableCell>

                                    <TableCell>
                                        {property.cover_type?.name || '-'}
                                    </TableCell>
                                    <TableCell>
                                        {property.frame_type?.name || '-'}
                                    </TableCell>
                                    <TableCell>
                                        {property.coating_type || '-'}
                                    </TableCell>
                                    <TableCell>
                                        {property.dimension}
                                    </TableCell>
                                    <TableCell>
                                        {property.quantity}
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </Scrollbar>
                </TableContainer>
            </Stack>
            <FormProvider methods={methods} onSubmit={onSubmit}>
                <Stack sx={{ border: '1px solid #D1D1D1', borderRadius: '8px' }} direction={'row'} justifyContent={'space-between'}>
                    <Box p={2} fontFamily={'peyda-bold'}>
                        {'آیا کالای فوق را تایید میکنید؟'}
                    </Box>
                    <Box>
                        <RHFRadioGroupCard
                            name={`is_approved`}
                            row
                            options={[
                                {
                                    label: 'عدم تایید',
                                    value: '0'
                                },
                                {
                                    label: 'تایید',
                                    value: '1'
                                }
                            ]}
                            sx={{ pt: 1, mr: 1 }}
                            BSx={{
                                mb: 1
                            }}
                            // FSx={{ border: (theme: any) => `1px solid ${theme?.palette?.divider}`, borderRadius: '8px', pr: 2 }}
                            variant="body1"
                            RadioSx={{
                                p: '4px',
                                '&::after': {
                                    content: '""',
                                    position: 'absolute',
                                    left: '3px',
                                    // right: '1px',
                                    top: '3px',
                                    // bottom: '6px',
                                    background: 'white',
                                    borderRadius: '50%',
                                    width: '6px',
                                    height: '6px'
                                },
                            }}
                            onChange={handleApprove}
                        />
                    </Box>
                </Stack>
                <Box mt={3}>
                    <Typography variant="h6" fontFamily={'peyda-bold'} sx={{ pb: 1 }}>توضیحات برای مشتری</Typography>
                    <RHFTextField
                        name="rejection_reason"
                        multiline
                        rows={3}
                        disabled={values.is_approved === '1'}
                        sx={{
                            pt: 1,
                            mr: 1,
                            '& .MuiInputBase-root': {
                                bgcolor: '#E0E0E0',
                            }
                        }}
                        placeholder="متن محتوا"
                    />
                </Box>
            </FormProvider>
        </Box>

    )
}