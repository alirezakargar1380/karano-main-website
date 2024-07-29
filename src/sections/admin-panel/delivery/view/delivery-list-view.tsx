
'use client';

import { Box, Container, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { AdminBreadcrumbs } from "src/components/custom-breadcrumbs";
import { useSettingsContext } from "src/components/settings";
import { paths } from "src/routes/paths";
import { PageTitle } from "../../page-title";
import Scrollbar from "src/components/scrollbar";
import Label from "src/components/label";
import { LoadingButton } from "@mui/lab";
import { useRouter } from 'src/routes/hooks';
import FormProvider, { RHFMultiSelect } from "src/components/hook-form";
import { useForm } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from 'yup';
import { StyledRoundedWhiteButton } from "src/components/styles/props/rounded-white-button";
import { useGetDeliveryOrders, useGetOrder } from "src/api/orders";
import { IOrderDeliveryType, OrderStatus } from "src/types/order";
import { DialogWithButton } from "src/components/custom-dialog";
import { useBoolean } from "src/hooks/use-boolean";
import Iconify from "src/components/iconify";
import SvgColor from "src/components/svg-color";
import { useState } from "react";
import { IUserTypes } from "src/types/user";
import { fToJamali } from "src/utils/format-time";
import { endpoints, server_axios } from "src/utils/axios";

export default function DeliveryListView() {
    const [orderId, setOrderId] = useState(0);

    const { order, orderLoading } = useGetOrder(`${orderId}`)

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
        if (!orderId) return
        await server_axios.patch(endpoints.orders.update(orderId), {
            status: OrderStatus.posted
        })
        detailsDialog.onFalse()
    }

    return (
        <Container maxWidth={settings.themeStretch ? false : 'lg'}>
            <DialogWithButton fullWith={false} width={932} dialog={detailsDialog}>
                {(!orderLoading) && (
                    <>
                        <Stack direction={'row'} justifyContent={'space-between'} borderBottom={'1px solid #D1D1D1'} pb={2} mb={2}>
                            <Typography variant="h4" fontFamily={'peyda-bold'}>جزییات ارسال</Typography>
                        </Stack>
                        <Stack direction={'row'} justifyContent={'space-between'} borderBottom={'1px solid #D1D1D1'} pb={2}>
                            <Label variant="outlined" sx={{ color: "#096E35", borderColor: "#149B4A" }} mt={1}>
                                آماده ارسال
                            </Label>
                            <StyledRoundedWhiteButton variant='outlined' sx={{ px: 2 }}>
                                مشاهده فاکتور
                                <Iconify icon={'solar:arrow-left-linear'} sx={{ ml: 1 }} />
                            </StyledRoundedWhiteButton>
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
                                        <Typography variant="body2">{order.address.provice + ", " + order.address.city + ", " + order.address.address}</Typography>
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
                                <StyledRoundedWhiteButton variant='outlined' sx={{ px: 2, ml: 1 }}>
                                    <SvgColor src={'/assets/icons/orders/delivery/flag-01.svg'} color={"#727272"} sx={{ mr: 1, width: 16 }} />
                                    {
                                        (order.delivery_type === IOrderDeliveryType.tehran && "تحویل در تهران") ||
                                        (order.delivery_type === IOrderDeliveryType.factory && "تحویل درب کارخانه") ||
                                        (order.delivery_type === IOrderDeliveryType.city && `تحویل در شهرستان، استان ${order.provice}، شهر ${order.city}`) || ""
                                    }
                                </StyledRoundedWhiteButton>
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
                            <LoadingButton variant="contained" onClick={handleUpdateOrder} sx={{ px: 5, ml: 'auto', borderRadius: 100, mt: 2 }}>تایید</LoadingButton>
                        </Stack>
                    </>
                )}
            </DialogWithButton>
            <AdminBreadcrumbs
                links={[
                    { name: 'پنل کاربری ادمین', href: paths.admin_dashboard.root },
                    { name: 'مدیریت فروش' },
                ]}
                sx={{
                    mb: { xs: 3, md: 5 },
                }}
            />
            <Box>
                <PageTitle title="مدیریت ارسال" icon="/assets/icons/admin-panel/send-03.svg" />
            </Box>
            <FormProvider methods={methods} onSubmit={onSubmit}>
                <Stack sx={{ width: 1 }} direction={'row'} spacing={2}>
                    <Typography variant="h5" fontFamily={'peyda-bold'}>لیست سفارش</Typography>
                    <RHFMultiSelect
                        name="dsdf"
                        label="وضعیت تولید"
                        value="1"
                        options={[
                            {
                                label: '1',
                                value: '1'
                            },
                            {
                                label: '2',
                                value: '2'
                            },
                            {
                                label: '3',
                                value: '4'
                            }
                        ]}
                        checkbox
                        icon="/assets/icons/admin-panel/flag-01.svg"
                        sx={{
                            bgcolor: 'white',
                            borderRadius: '24px!important',
                            py: '0px !important',
                            '& .MuiOutlinedInput-input': {
                                py: 1,
                            },
                            '& .MuiInputBase-root': {
                                borderRadius: '24px!important',
                            },
                        }}
                    />
                    <RHFMultiSelect
                        name="dsdf"
                        label="تاریخ"
                        value="1"
                        options={[
                            {
                                label: 'فردا',
                                value: '1'
                            },
                            {
                                label: 'دو روز آینده',
                                value: '2'
                            },
                            {
                                label: 'یک هفته آینده',
                                value: '4'
                            }
                        ]}
                        icon="/assets/icons/admin-panel/calandar.svg"
                        sx={{
                            bgcolor: 'white',
                            borderRadius: '24px!important',
                            py: '0px !important',
                            '& .MuiOutlinedInput-input': {
                                py: 1,
                            },
                            '& .MuiInputBase-root': {
                                borderRadius: '24px!important',
                            },
                        }}
                    />
                </Stack>
            </FormProvider>

            <Box>
                <TableContainer sx={{ overflow: 'unset', mt: 2 }}>
                    <Scrollbar>
                        <Table sx={{ minWidth: 960, bgcolor: 'white' }}>
                            <TableHead>
                                <TableRow>
                                    <TableCell width={40}></TableCell>
                                    <TableCell sx={{ fontFamily: 'peyda-bold!important' }}>نام مشتری</TableCell>
                                    <TableCell sx={{ fontFamily: 'peyda-bold!important' }}>کد سفارش</TableCell>

                                    <TableCell sx={{ fontFamily: 'peyda-bold!important' }}>وضعیت سفارش</TableCell>



                                    <TableCell sx={{ fontFamily: 'peyda-bold!important' }}>تاریخ سفارش</TableCell>
                                    <TableCell sx={{ fontFamily: 'peyda-bold!important' }}>تاریخ تحویل</TableCell>

                                    <TableCell width={200}></TableCell>
                                </TableRow>
                            </TableHead>

                            <TableBody>
                                {orders.map((row, index) => (
                                    <TableRow key={index}>
                                        <TableCell>{row.id}</TableCell>

                                        <TableCell>{(row.user.user_type === IUserTypes.genuine) ? row.user.first_name + " " + row.user.last_name : row.user.company_name}</TableCell>
                                        <TableCell>{row.order_number}</TableCell>

                                        <TableCell>
                                            {(row.status === OrderStatus.produced) && (
                                                <Label variant="outlined" sx={{ color: "#005878", borderColor: "#0B7BA7" }}>
                                                    در انتظار پرداخت نهایی
                                                </Label>
                                            )}
                                            {(row.status === OrderStatus.ready_to_send) && (
                                                <Label variant="outlined" sx={{ color: "#096E35", borderColor: "#149B4A" }}>
                                                    آماده ارسال
                                                </Label>
                                            )}
                                            {(row.status === OrderStatus.posted) && (
                                                <Label variant="outlined" sx={{ color: "#096E35", borderColor: "#149B4A" }}>
                                                    ارسال شده
                                                </Label>
                                            )}
                                        </TableCell>

                                        <TableCell>{fToJamali(row.createdAt)}</TableCell>

                                        <TableCell>{fToJamali(row.production_date)}</TableCell>

                                        <TableCell>
                                            <LoadingButton
                                                variant="contained"
                                                sx={{ borderRadius: '28px', width: 1 }}
                                                onClick={() => {
                                                    setOrderId(row.id)
                                                    detailsDialog.onTrue()
                                                }}
                                            >
                                                مشاهده جزئیات
                                            </LoadingButton>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </Scrollbar>
                </TableContainer>
            </Box>
        </Container >
    )
}