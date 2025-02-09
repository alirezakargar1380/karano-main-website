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
import { ECoatingTexture, ECoverEdgeTape } from "src/types/cart";
import { translateCoatingTexture, translateCoverEdgeTape } from "src/sections/cart/cart-table-row";
import { toFarsiNumber } from "src/utils/change-case";

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
        <Box border={(theme) => `1px solid ${theme.palette.divider}`} bgcolor={'#FFF'} width={1} borderRadius={'12px'} boxShadow={'2px 2px 8px 0px #0000001A'}>
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
                        <Typography variant="body3" fontFamily={'peyda-bold'}>کد سفارش:</Typography>
                        <Typography variant="body4" noWrap fontFamily={'peyda-light'} sx={{ pl: 1 }}>
                            {toFarsiNumber(order.order_number)}
                        </Typography>
                    </Box>
                    <Box display={'flex'} width={'50%'}>
                        <Typography variant="body3" fontFamily={'peyda-bold'}>تعداد کالا :</Typography>
                        <Typography variant="body4" fontFamily={'peyda-light'} sx={{ pl: 1 }}>
                            {orderProducts.reduce((acc, item) => acc + item.properties.reduce((ac, it) => ac + it.quantity, 0), 0)}
                        </Typography>
                    </Box>
                </Stack>
                <Stack direction={'row'}>
                    <Box display={'flex'} width={'50%'}>
                        <Typography variant="body3" fontFamily={'peyda-bold'}>تاریخ ثبت سفارش:</Typography>
                        <Typography variant="body4" fontFamily={'peyda-extra-light'} sx={{ pl: 1, pt: 0.25 }}>
                            {fToJamali(order.createdAt)}
                        </Typography>
                    </Box>
                    <Box display={'flex'} width={'50%'}>
                        <Typography variant="body3" fontFamily={'peyda-bold'}>
                            نام سفارش دهنده:
                        </Typography>
                        <Typography variant="body4" fontFamily={'peyda-light'} sx={{ pl: 1 }}>
                            {(order?.user?.user_type === IUserTypes.genuine) ? order.user.first_name + " " + order.user.last_name : order?.user?.company_name}
                        </Typography>
                    </Box>
                </Stack>
            </Stack>
            <Scrollbar sx={{ maxHeight: '720px' }}>
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
                .test('rejection_reason', 'تعداد کاراکتر واردشده کمتر از ۱۰ کلمه است.', (val: any) => val.split(" ").length > 10)
                .test('rejection_reason', 'تعداد کاراکتر واردشده بیشتر از ۱۰۰ کلمه است.', (val: any) => val.split(" ").length <= 100)
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
            })
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
                        {product.name + " (" + product?.code?.code + ")"}
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
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        {property.profile_type?.name && (
                                            <TableCell sx={{ fontFamily: 'peyda-bold' }}>
                                                نوع پروفیل
                                            </TableCell>
                                        )}

                                        {property.cover_type?.name && (
                                            <TableCell sx={{ fontFamily: 'peyda-bold' }}>
                                                پوشش نهایی
                                            </TableCell>
                                        )}

                                        {property.frame_type?.name && (
                                            <TableCell sx={{ fontFamily: 'peyda-bold' }}>
                                                نوع قاب
                                            </TableCell>
                                        )}

                                        {property.coating_type && (
                                            <TableCell sx={{ fontFamily: 'peyda-bold', textWrap: 'nowrap' }}>
                                                روکش گیری
                                            </TableCell>
                                        )}

                                        {property.cover_edge_tape && (
                                            <TableCell sx={{ fontFamily: 'peyda-bold' }}>
                                                نوار لبه روکش بلوط
                                            </TableCell>
                                        )}

                                        {property.coating_texture && (
                                            <TableCell sx={{ fontFamily: 'peyda-bold', textWrap: 'nowrap' }}>
                                                بافت روکش
                                            </TableCell>
                                        )}

                                        {property.inlaid_flower !== null && (
                                            <TableCell sx={{ fontFamily: 'peyda-bold' }}>
                                                گل منبت
                                            </TableCell>
                                        )}

                                        {property.inlaid_flower !== null && (
                                            <TableCell sx={{ fontFamily: 'peyda-bold' }}>
                                                زمینه خالی جهت منبت
                                            </TableCell>
                                        )}

                                        {property.dimension && (property.dimension.length != 0 && property.dimension.width != 0) && (
                                            <TableCell sx={{ fontFamily: 'peyda-bold' }}>
                                                ابعاد
                                            </TableCell>
                                        )}

                                        <TableCell sx={{ fontFamily: 'peyda-bold' }}>
                                            تعداد
                                        </TableCell>

                                        {/* <TableCell sx={{ fontFamily: 'peyda-bold' }}>
                                            نیاز به مونتاژ
                                        </TableCell> */}
                                    </TableRow>
                                </TableHead>

                                <TableBody>
                                    <TableRow>

                                        {property.profile_type?.name && (
                                            <TableCell>
                                                {property.profile_type?.name || '-'}
                                            </TableCell>
                                        )}

                                        {property.cover_type?.name && (
                                            <TableCell>
                                                {property.cover_type?.name || '-'}
                                            </TableCell>
                                        )}

                                        {property.frame_type?.name && (
                                            <TableCell>
                                                {property.frame_type?.name + " " + (property.frame_type?.frame_code ? property.frame_type?.frame_code?.code : '')}
                                            </TableCell>
                                        )}

                                        {property.coating_type && (
                                            <TableCell>
                                                {property.coating_type || '-'}
                                            </TableCell>
                                        )}

                                        {property.cover_edge_tape !== ECoverEdgeTape.none && (
                                            <TableCell>
                                                {translateCoverEdgeTape(property.cover_edge_tape)}
                                            </TableCell>
                                        )}

                                        {property.coating_texture !== ECoatingTexture.none && (
                                            <TableCell>
                                                {translateCoatingTexture(property.coating_texture)}
                                            </TableCell>
                                        )}

                                        {property.inlaid_flower !== null && (
                                            <TableCell>
                                                {property.inlaid_flower ? 'دارد' : 'ندارد'}
                                            </TableCell>
                                        )}

                                        {property.inlaid_flower !== null && (
                                            <TableCell >
                                                {property.inlaid_flower === false ? property.inlaid_flower_emty_space + " سانتی متر" : '-'}
                                            </TableCell>
                                        )}

                                        {property.dimension && (property.dimension.length != 0 && property.dimension.width != 0) && (
                                            <TableCell>
                                                {toFarsiNumber(property.dimension?.length) + "x" + toFarsiNumber(property.dimension?.width)}
                                            </TableCell>
                                        )}

                                        {property.quantity && (
                                            <TableCell>
                                                {toFarsiNumber(property.quantity)}
                                            </TableCell>
                                        )}

                                        {/* <TableCell>
                                            {need_to_assemble ?
                                                <Label variant="outlined" color="green">
                                                    دارد
                                                </Label>
                                                :
                                                <Label variant="outlined" color="red">
                                                    ندارد
                                                </Label>
                                            }
                                        </TableCell> */}
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </Scrollbar>
                    </TableContainer>
                </Stack>
                {product.order_type === ProductOrderType.custom_made && (
                    <FormProvider methods={methods} onSubmit={onSubmit}>
                        <Stack sx={{ border: '1px solid #D1D1D1', borderRadius: '8px', mt: 3 }} direction={'row'} justifyContent={'space-between'}>
                            <Box pl={'12px'} py={'16px'} fontFamily={'peyda-bold'}>
                                {'آیا کالای فوق را تایید میکنید؟'}
                            </Box>
                            <Box display={'flex'} alignItems={'center'}>
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
                                    sx={{ mr: '12px' }}
                                    // BSx={{
                                    //     mb: 1
                                    // }}
                                    BSx={{
                                        borderRadius: '8px',
                                        '&:hover': {
                                            cursor: 'pointer',
                                            border: '1.5px solid #D1D1D1'
                                        },
                                        py: '0px',
                                        ml: 0,
                                        mb: '0px',
                                        pl: '8px'
                                    }}
                                    variant="body1"
                                    RadioSx={{
                                        mr: '0px',
                                    }}
                                    onChange={handleApprove}
                                />
                            </Box>
                        </Stack>
                        <Box mt={3}>
                            <Stack direction={'row'}>
                                <Typography fontFamily={'peyda-bold'} sx={{ pb: 1, fontSize: 14 }}>توضیحات برای مشتری</Typography>
                                <Typography fontFamily={'peyda-bold'} sx={{ pb: 1, color: "#727272", fontSize: 12, ml: 0.5, pt: 0.25 }}>(حداقل ۱۰ و حداکثر ۱۰۰ کلمه)</Typography>
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