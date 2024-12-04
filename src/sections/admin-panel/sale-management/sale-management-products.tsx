import { Box, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import FormProvider, { RHFRadioGroupCard, RHFTextField } from "src/components/hook-form";
import Scrollbar from "src/components/scrollbar";
import { IOrderProductItem } from "src/types/order-products";
import { IProductItem, IProductProperties, ProductOrderType } from "src/types/product";
import { endpoints, server_axios } from "src/utils/axios";
import { useSnackbar } from 'src/components/snackbar';
import Label from "src/components/label";
import { IOrderItem } from "src/types/order";
import { IOrderProductPropertyStatus } from "src/types/order-products-property";
import { IUserTypes } from "src/types/user";
import { fToJamali } from "src/utils/format-time";

import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { SecondaryButton } from "src/components/styles/buttons/secondary";
import { useGetOrderProducts } from "src/api/order-products";

interface Props {
    // orderProducts: IOrderProductItem[]
    order: IOrderItem
    updateHasAnydeapprove: (val: boolean) => void
}


export default function SaleManagementProducts({
    // orderProducts, 
    order,
    updateHasAnydeapprove
}: Props) {

    const { orderProducts } = useGetOrderProducts(order.id);

    useEffect(() => {
        updateHasAnydeapprove(true)
    }, []);

    return (
        <Box border={(theme) => `1px solid ${theme.palette.divider}`} bgcolor={'#FFF'} width={1} borderRadius={'16px'}>
            <Stack
                sx={{
                    width: 1
                }}
                direction={'column'}
                p={2}
                spacing={1.5}
                borderBottom={(theme) => `1px solid ${theme.palette.divider}`}>
                <Stack direction={'row'}>
                    <Box display={'flex'} width={'50%'}>
                        <Typography variant="h6" fontFamily={'peyda-bold'}>کد سفارش:</Typography>
                        <Typography variant="subtitle1" noWrap fontFamily={'peyda-light'} sx={{ pl: 1 }}>
                            {order.order_number}
                        </Typography>
                    </Box>
                    <Box display={'flex'} width={'50%'}>
                        <Typography variant="h6" fontFamily={'peyda-bold'}>تعداد کالا :</Typography>
                        <Typography variant="h6" fontFamily={'peyda-light'} sx={{ pl: 1 }}>
                            {150}
                        </Typography>
                    </Box>
                </Stack>
                <Stack direction={'row'}>
                    <Box display={'flex'} width={'50%'}>
                        <Typography variant="h6" fontFamily={'peyda-bold'}>تاریخ ثب سفارش:</Typography>
                        <Typography variant="subtitle1" fontFamily={'peyda-extra-light'} sx={{ pl: 1, pt: 0.25 }}>
                            {fToJamali(order.createdAt)}
                        </Typography>
                    </Box>
                    <Box display={'flex'} width={'50%'}>
                        <Typography variant="h6" fontFamily={'peyda-bold'}>
                            نام سفارش دهنده:
                        </Typography>
                        <Typography variant="h6" fontFamily={'peyda-light'} sx={{ pl: 1 }}>
                            {(order.user.user_type === IUserTypes.genuine) ? order.user.first_name + " " + order.user.last_name : order.user.company_name}
                        </Typography>
                    </Box>
                </Stack>
            </Stack>
            <Scrollbar sx={{ maxHeight: '70vh' }}>
                <Box>
                    {orderProducts.map(({ product, properties, need_to_assemble }) => (
                        <Box key={product.id}>
                            {properties.map((p, propertyIndex) => (
                                <SaleManagementProductItem
                                    key={propertyIndex}
                                    product={product}
                                    property={p}
                                    need_to_assemble={need_to_assemble}
                                    updateHasAnydeapprove={() => updateHasAnydeapprove(false)}
                                />
                            ))}
                        </Box>
                    ))}
                </Box>
            </Scrollbar>
        </Box>
    )
}

interface SaleManagmentItem {
    product: IProductItem,
    property: IProductProperties,
    need_to_assemble: boolean,
    updateHasAnydeapprove: () => void
}

function SaleManagementProductItem({
    product,
    property,
    need_to_assemble,
    updateHasAnydeapprove
}: SaleManagmentItem) {

    const schema = Yup.object().shape({
        rejection_reason: Yup.string().when('is_approved', (type: any, schema) => {
            if (type[0] == "1")
                return schema
            return schema
                .required('پرکردن این فیلد اجباری‌ست.')
                .test('rejection_reason', 'تعداد کاراکتر واردشده کمتر از ۲۰ کلمه است.', (val: any) => val.split(" ").length > 20)
                .test('rejection_reason', 'تعداد کاراکتر واردشده بیشتر از ۱۰۰ کلمه است.', (val: any) => val.split(" ").length <= 100)

            // .min(20, 'علت باید حداقل 20 کلمه باشد')

        }),
    });

    const defaultValues = {
        rejection_reason: property.rejection_reason || '',
        is_approved: (property.is_approved !== null || property.status !== IOrderProductPropertyStatus.normal) ?
            (property.is_approved ?
                '1' : property.status === IOrderProductPropertyStatus.edited ? null : '0'
            ) : null
    }

    const { enqueueSnackbar } = useSnackbar();

    const methods = useForm({
        resolver: yupResolver<any>(schema),
        defaultValues,
    });

    const {
        reset,
        setValue,
        handleSubmit,
        watch,
        formState: {
            isSubmitting,
        }
    } = methods;

    const values = watch();

    const onSubmit = handleSubmit(async (d) => {
        try {
            // if (d.is_approved == "0") {
            //     await server_axios.patch(endpoints.orders.update(order_id), {
            //         status: OrderStatus.failed
            //     })
            //     enqueueSnackbar('وضعیت سفارش تغییر کرد', {
            //         variant: 'info'
            //     })
            // }

            // enqueueSnackbar('وضعیت سفارش تغییر کرد', {
            //     variant: 'info'
            // })

            const data = {
                ...d,
                status: (d.is_approved == "0") ? IOrderProductPropertyStatus.denied : IOrderProductPropertyStatus.approve,
                rejection_reason: (d.rejection_reason) ? d.rejection_reason : null,
            }

            await server_axios.patch(endpoints.orderProductProperties.update_approve(property.id), data)
                .then(() => {
                    property.status = data.status
                })

            updateHasAnydeapprove()
        } catch (error) {
            console.error(error);
            reset();
        }
    });

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            if (values.rejection_reason !== '' && values.rejection_reason !== property.rejection_reason) onSubmit();
        }, 500)

        return () => clearTimeout(delayDebounceFn)
    }, [values.rejection_reason]);


    const handleApprove = useCallback(async (event: any) => {
        const v = event.target.value
        setValue('is_approved', v);
        if (v === '1') {
            setValue('rejection_reason', '')
            await server_axios.patch(endpoints.orderProductProperties.update_approve(property.id), {
                status: (v == "0") ? IOrderProductPropertyStatus.denied : IOrderProductPropertyStatus.approve,
                is_approved: v,
                rejection_reason: ''
            }).then(() => console.log('done!'))
            updateHasAnydeapprove()
        } else {
            if (values.rejection_reason) onSubmit();
        }
    }, [values]);

    return (
        <Box sx={{ borderBottom: '1px solid #e0e0e0' }}>
            <Box sx={{ mb: 2, px: 2, py: 3 }}>
                <Stack p={0} spacing={1} mb={2}>
                    <Typography fontFamily={'peyda-bold'} variant="h5" mt={1}>
                        {product.name}
                        {(product.order_type === ProductOrderType.custom_made && property.status === IOrderProductPropertyStatus.edited) && (
                            <Label
                                sx={{ ml: 1 }}
                                color={
                                    (property.status === IOrderProductPropertyStatus.edited) && 'yellow' || 'default'
                                }
                            >
                                {
                                    (property.status === IOrderProductPropertyStatus.edited) && 'اصلاح شده' || ''
                                }
                            </Label>
                        )}
                    </Typography>
                    <TableContainer sx={{ overflow: 'unset' }}>
                        <Scrollbar>
                            <Table sx={{
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

                                        <TableCell sx={{ fontFamily: 'peyda-bold' }}>
                                            نیاز به مونتاژ
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
                                            {property.dimension?.length + "x" + property.dimension?.width}
                                        </TableCell>
                                        <TableCell>
                                            {property.quantity}
                                        </TableCell>


                                        <TableCell>
                                            {need_to_assemble ?
                                                <Label variant="outlined" color="green">
                                                    دارد
                                                </Label>
                                                :
                                                <Label variant="outlined" color="red">
                                                    ندارد
                                                </Label>
                                            }
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </Scrollbar>
                    </TableContainer>
                </Stack>
                {product.order_type === ProductOrderType.custom_made && (
                    <FormProvider methods={methods} onSubmit={onSubmit}>
                        <Stack sx={{ border: '1px solid #D1D1D1', borderRadius: '8px', mt: 3 }} direction={'row'} justifyContent={'space-between'}>
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
                                    variant="body1"
                                    // RadioSx={{
                                    //     p: '4px',
                                    //     '&::after': {
                                    //         content: '""',
                                    //         position: 'absolute',
                                    //         left: '3px',
                                    //         // right: '1px',
                                    //         top: '3px',
                                    //         // bottom: '6px',
                                    //         background: 'white',
                                    //         borderRadius: '50%',
                                    //         width: '6px',
                                    //         height: '6px'
                                    //     },
                                    // }}
                                    onChange={handleApprove}
                                />
                            </Box>
                        </Stack>
                        <Box mt={3}>
                            <Stack direction={'row'}>
                                <Typography fontFamily={'peyda-bold'} sx={{ pb: 1, fontSize: 14 }}>توضیحات برای مشتری</Typography>
                                <Typography fontFamily={'peyda-bold'} sx={{ pb: 1, color: "#727272", fontSize: 12, ml: 0.5, pt: 0.25 }}>(حداقل ۲۰ و حداکثر ۱۰۰ کلمه)</Typography>
                            </Stack>
                            <RHFTextField
                                name="rejection_reason"
                                multiline
                                rows={3}
                                disabled={(values.is_approved === '1')}
                                sx={{
                                    mr: 1,
                                    '& .MuiInputBase-root': {
                                        bgcolor: '#E0E0E0',
                                    }
                                }}
                                placeholder="متن محتوا"
                            />
                            {/* <Box sx={{ width: 1, textAlign: 'right' }}>
                                <SecondaryButton
                                    type="submit"
                                    variant="outlined"
                                    size="small"
                                    sx={{ mt: '12px', fontFamily: 'peyda-medium', py: '2px' }}
                                >
                                    ثبت
                                </SecondaryButton>
                            </Box> */}
                        </Box>
                    </FormProvider>
                )}
            </Box>
        </Box>
    )
}