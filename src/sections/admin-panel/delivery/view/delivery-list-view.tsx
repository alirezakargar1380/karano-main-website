
'use client';

import { Box, Container, MenuItem, Select, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { AdminBreadcrumbs } from "src/components/custom-breadcrumbs";
import { useSettingsContext } from "src/components/settings";
import { paths } from "src/routes/paths";
import { PageTitle } from "../../page-title";
import Scrollbar from "src/components/scrollbar";
import Label from "src/components/label";
import { LoadingButton } from "@mui/lab";
import FormProvider, { RHFMultiSelect } from "src/components/hook-form";
import { useForm } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from 'yup';
import { SecondaryButton } from "src/components/styles/buttons/secondary";
import { useGetDeliveryOrders, useGetOrder } from "src/api/orders";
import { IOrderDeliveryType, OrderStatus } from "src/types/order";
import { DialogWithButton } from "src/components/custom-dialog";
import { useBoolean } from "src/hooks/use-boolean";
import Iconify from "src/components/iconify";
import SvgColor from "src/components/svg-color";
import { useCallback, useState } from "react";
import { IUserTypes } from "src/types/user";
import { fToJamali } from "src/utils/format-time";
import { endpoints, server_axios } from "src/utils/axios";
import Filter from "../../filter";
import { PrimaryButton } from "src/components/styles/buttons/primary";
import { toFarsiNumber } from "src/utils/change-case";

export default function DeliveryListView() {
    const [orderId, setOrderId] = useState(0);

    const { order, orderLoading } = useGetOrder(`${orderId}`);

    const detailsDialog = useBoolean();

    const settings = useSettingsContext();

    const { orders } = useGetDeliveryOrders();

    const schema = Yup.object().shape({
    });

    const methods = useForm({
        resolver: yupResolver<any>(schema),
        defaultValues: {},
    });

    const {
        reset,
        handleSubmit
    } = methods;

    const onSubmit = handleSubmit(async () => {
        try {
        } catch (error) {
            console.error(error);
            reset();
        }
    });

    const handleUpdateOrder = async () => {
        detailsDialog.onFalse()
    }

    const handleMore = (id: number) => {
        setOrderId(id);
        detailsDialog.onTrue();
    }

    return (
        <Box>

            <DialogWithButton fullWith={false} width={932} dialog={detailsDialog}>
                {(!orderLoading) && (
                    <Scrollbar>
                        <Stack direction={'row'} justifyContent={'space-between'} borderBottom={'1px solid #D1D1D1'} pb={2} mb={2}>
                            <Typography variant="h4" fontFamily={'peyda-bold'}>جزییات ارسال</Typography>
                        </Stack>
                        <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'} borderBottom={'1px solid #D1D1D1'} pb={2}>
                            <Label variant="outlined" sx={{ color: "#096E35", borderColor: "#149B4A" }} mt={1}>
                                آماده ارسال
                            </Label>
                            {/* <SecondaryButton size="medium" variant='outlined' sx={{ px: 2, mr: 0.25 }}>
                                مشاهده فاکتور
                                <Iconify icon={'solar:arrow-left-linear'} sx={{ ml: 1 }} />
                            </SecondaryButton> */}
                        </Stack>

                        <Stack spacing={2} py={2} mt={2} px={2} border={(theme) => `2px solid ${theme.palette.divider}`} borderRadius={'16px'}>
                            <Typography
                                variant="h6"
                                fontFamily={'peyda-bold'}
                                sx={{ textWrap: 'nowrap' }}
                                pb={2}
                                borderBottom={'1px solid #D1D1D1'}
                            >
                                اطلاعات سفارش
                            </Typography>
                            <Box
                                columnGap={2}
                                rowGap={3}
                                display="grid"
                                gridTemplateColumns={{
                                    xs: 'repeat(1, 1fr)',
                                    md: 'repeat(2, 1fr)',
                                }}
                            >
                                <Stack direction={'row'}>
                                    <Typography variant="body1" fontFamily={'peyda-regular'}>کد سفارش:</Typography>
                                    <Typography ml={1} mt={0.25} fontFamily={'peyda-bold'}>{order.order_number}</Typography>
                                </Stack>
                                <Stack direction={'row'}>
                                    <Typography variant="body1" fontFamily={'peyda-regular'}>تعداد کالا:</Typography>
                                    <Typography ml={1} mt={0.25} fontFamily={'peyda-bold'}>150</Typography>
                                </Stack>
                                <Stack direction={'row'}>
                                    <Typography variant="body1" fontFamily={'peyda-regular'}>تاریخ ثبت سفارش:</Typography>
                                    <Typography ml={1} mt={0.25} fontFamily={'peyda-bold'}>{fToJamali(order.createdAt)}</Typography>
                                </Stack>
                                <Stack direction={'row'}>
                                    <Typography variant="body1" fontFamily={'peyda-regular'}>تاریخ تحویل:</Typography>
                                    <Typography ml={1} mt={0.25} fontFamily={'peyda-bold'}>{fToJamali(order.production_date)}</Typography>
                                </Stack>
                            </Box>
                        </Stack>

                        <Stack spacing={2} py={2} mt={2} px={2} border={(theme) => `2px solid ${theme.palette.divider}`} borderRadius={'16px'}>
                            <Typography
                                variant="h6"
                                fontFamily={'peyda-bold'}
                                sx={{ textWrap: 'nowrap' }}
                                pb={2}
                                borderBottom={'1px solid #D1D1D1'}
                            >
                                اطلاعات تحویل گیرنده
                            </Typography>
                            <Box

                                columnGap={2}
                                rowGap={3}
                                display="grid"
                                gridTemplateColumns={{
                                    xs: 'repeat(1, 1fr)',
                                    md: 'repeat(2, 1fr)',
                                }}
                            >
                                <Stack direction={'row'}>
                                    <Typography variant="body1" fontFamily={'peyda-regular'}>نام تحویل گیرنده:</Typography>
                                    <Typography ml={1} mt={0.25} fontFamily={'peyda-bold'}>{order.reciver_name}</Typography>
                                </Stack>
                                <Stack direction={'row'}>
                                    <Typography variant="body1" fontFamily={'peyda-regular'}>شماره تماس</Typography>
                                    <Typography ml={1} mt={0.25} fontFamily={'peyda-bold'} sx={{ direction: 'rtl' }}>{order.reciver_phone}</Typography>
                                </Stack>
                            </Box>
                        </Stack>

                        {order.address && (
                            <Box py={2} mt={2} px={2} border={(theme) => `2px solid ${theme.palette.divider}`} borderRadius={'16px'}>
                                <Typography variant="h6"
                                    fontFamily={'peyda-bold'}
                                    sx={{ textWrap: 'nowrap' }}
                                    pb={2}
                                    mb={2}
                                    borderBottom={'1px solid #D1D1D1'}
                                >
                                    آدرس تحویل سفارش
                                </Typography>
                                <Stack direction={'row'} spacing={1}>
                                    <SvgColor src="/assets/icons/address/marker-pin-01.svg" color={"#727272"} />
                                    <Box display={"flex"}>
                                        <Typography variant="body2">{order.address.province?.name + ", " + order.address.city?.name + ", " + order.address.address}</Typography>
                                        <Typography variant="body2" sx={{ direction: 'ltr', ml: 1, mt: 0.25 }}>{order.address.postal_code}</Typography>
                                    </Box>
                                </Stack>
                            </Box>
                        )}

                        <Box py={2} mt={2} px={2} border={(theme) => `2px solid ${theme.palette.divider}`} borderRadius={'16px'}>
                            <Typography variant="h6"
                                fontFamily={'peyda-bold'}
                                sx={{ textWrap: 'nowrap' }}
                                pb={2}
                                mb={2}
                                borderBottom={'1px solid #D1D1D1'}
                            >
                                جزییات نحوه ارسال
                            </Typography>
                            <Stack direction={'row'}>
                                <Typography variant="body1" fontFamily={'peyda-regular'} pt={0.5}>نحوه ارسال</Typography>
                                <SecondaryButton variant='outlined' sx={{ px: 2, ml: 1 }}>
                                    <SvgColor src={'/assets/icons/orders/delivery/flag-01.svg'} color={"#727272"} sx={{ mr: 1, width: 16 }} />
                                    {
                                        (order.delivery_type === IOrderDeliveryType.tehran && "تحویل در تهران") ||
                                        (order.delivery_type === IOrderDeliveryType.factory && "تحویل درب کارخانه") ||
                                        (order.delivery_type === IOrderDeliveryType.city && `تحویل در شهرستان، استان ${order.provice}، شهر ${order.city}`) || ""
                                    }
                                </SecondaryButton>
                            </Stack>
                        </Box>

                        <Stack spacing={2} py={2} mt={2} px={2} border={(theme) => `2px solid ${theme.palette.divider}`} borderRadius={'16px'}>
                            <Typography
                                variant="h6"
                                fontFamily={'peyda-bold'}
                                sx={{ textWrap: 'nowrap' }}
                                pb={2}
                                borderBottom={'1px solid #D1D1D1'}
                            >
                                مشخصات صاحب فاکتور
                            </Typography>
                            <Box
                                columnGap={2}
                                rowGap={3}
                                display="grid"
                                gridTemplateColumns={{
                                    xs: 'repeat(1, 1fr)',
                                    md: 'repeat(2, 1fr)',
                                }}
                            >
                                <Stack direction={'row'}>
                                    <Typography variant="body1" fontFamily={'peyda-regular'}>نام:</Typography>
                                    <Typography ml={1} mt={0.25} fontFamily={'peyda-bold'}>{order.invoice_owner?.first_name}</Typography>
                                </Stack>
                                <Stack direction={'row'}>
                                    <Typography variant="body1" fontFamily={'peyda-regular'}>نام خانوادگی:</Typography>
                                    <Typography ml={1} mt={0.25} fontFamily={'peyda-bold'}>{order.invoice_owner?.last_name}</Typography>
                                </Stack>
                                <Stack direction={'row'}>
                                    <Typography variant="body1" fontFamily={'peyda-regular'}>کد ملی:</Typography>
                                    <Typography ml={1} mt={0.25} fontFamily={'peyda-bold'}>{order.invoice_owner?.id_code}</Typography>
                                </Stack>
                            </Box>
                        </Stack>
                        <Stack direction={'row'}>
                            <PrimaryButton size="medium" onClick={handleUpdateOrder} sx={{ px: 5, ml: 'auto', borderRadius: 100, mt: 2 }}>تایید</PrimaryButton>
                        </Stack>
                    </Scrollbar>
                )}
            </DialogWithButton>

            <Box>
                <PageTitle title="مدیریت ارسال" icon="/assets/icons/admin-panel/send-03.svg" />
            </Box>
            <Container maxWidth={settings.themeStretch ? false : 'lg'} sx={{ pl: '20px!important', ml: '0px!important' }}>
                <Filter />
                <Box>
                    <TableContainer sx={{ overflow: 'unset', mt: 2, boxShadow: '2px 2px 8px 0px #0000001A', borderRadius: '12px', }}>
                        <Scrollbar>
                            <Table sx={{ minWidth: 960 }}>
                                <TableHead>
                                    <TableRow>
                                        <TableCell width={40} sx={{ borderTopLeftRadius: '12px' }}></TableCell>
                                        <TableCell sx={{ fontFamily: 'peyda-bold!important' }}>نام مشتری</TableCell>
                                        <TableCell sx={{ fontFamily: 'peyda-bold!important' }}>کد سفارش</TableCell>

                                        <TableCell sx={{ fontFamily: 'peyda-bold!important' }}>وضعیت سفارش</TableCell>



                                        <TableCell sx={{ fontFamily: 'peyda-bold!important' }}>تاریخ سفارش</TableCell>
                                        <TableCell sx={{ fontFamily: 'peyda-bold!important' }}>تاریخ تحویل</TableCell>

                                        <TableCell width={200} sx={{ borderTopRightRadius: '12px' }}></TableCell>
                                    </TableRow>
                                </TableHead>

                                <TableBody>
                                    {orders.map((row, index) => (
                                        <Row key={index} row={row} moreHandler={() => handleMore(row.id)} />
                                    ))}
                                </TableBody>
                            </Table>
                        </Scrollbar>
                    </TableContainer>
                </Box>
            </Container>
        </Box>
    )
}


function Row({ row, moreHandler }: any) {
    const [value, setValue] = useState('');

    const handleChangeProductionStatus = useCallback(async (e: any, orderId: number) => {
        setValue(e.target.value);
        await server_axios.patch(endpoints.orders.update(orderId), {
            status: e.target.value
        });
    }, [])

    return (
        <TableRow>
            <TableCell>{row.id}</TableCell>

            <TableCell>{(row.user.user_type === IUserTypes.genuine) ? row.user.first_name + " " + row.user.last_name : row.user.company_name}</TableCell>
            <TableCell>{toFarsiNumber(row.order_number)}</TableCell>

            <TableCell>
                {(row.status === OrderStatus.produced) ? (
                    <Label variant="outlined" sx={{ color: "#005878", borderColor: "#0B7BA7" }}>
                        در انتظار پرداخت نهایی
                    </Label>
                ) : (
                    <Select value={value || row.status} size="small"
                        sx={{
                            ...(((value || row.status) !== OrderStatus.ready_to_send) ? {
                                bgcolor: "#DCF9FF",
                                color: "#005878!important",
                                borderRadius: '24px',
                                border: '1px solid #86D8F8!important',
                            } : {
                                bgcolor: "#E0FFEB",
                                color: "#096E35!important",
                                borderRadius: '24px',
                                border: '1px solid #8EEFB4!important',
                            }),
                            height: '29px',
                            width: 'fit-content',
                            p: 0,
                            typography: 'body4',
                            '& fieldset': {
                                border: 'none'
                            }
                        }}
                        variant="outlined"
                        onChange={(e) => handleChangeProductionStatus(e, row.id)}>
                        <MenuItem value={OrderStatus.ready_to_send}>
                            آماده ارسال
                        </MenuItem>
                        <MenuItem value={OrderStatus.posted}>
                            ارسال شده
                        </MenuItem>
                    </Select>
                )}
            </TableCell>

            <TableCell>{fToJamali(row.createdAt)}</TableCell>

            <TableCell>{fToJamali(row.production_date)}</TableCell>

            <TableCell sx={{ textAlign: 'center' }}>
                <PrimaryButton
                    size="small"
                    sx={{ borderRadius: '28px', px: 1.5 }}
                    onClick={moreHandler}
                >
                    مشاهده جزئیات
                </PrimaryButton>
            </TableCell>
        </TableRow>
    )
}