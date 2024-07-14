
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

export default function DeliveryListView() {
    const [orderId, setOrderId] = useState(0);

    const { order, orderLoading } = useGetOrder(`${orderId}`)

    const detailsDialog = useBoolean(true);

    const settings = useSettingsContext();

    const router = useRouter();

    const { orders } = useGetDeliveryOrders();

    const schema = Yup.object().shape({
    });

    const methods = useForm({
        resolver: yupResolver<any>(schema),
        defaultValues: {},
    });

    const {
        reset,
        handleSubmit,
        watch,
        formState: { isSubmitting },
    } = methods;

    const values = watch();

    const onSubmit = handleSubmit(async () => {
        try {
        } catch (error) {
            console.error(error);
            reset();
        }
    });

    return (
        <Container maxWidth={settings.themeStretch ? false : 'lg'}>
            <DialogWithButton fullWith={false} width={932} dialog={detailsDialog}>
                {(!orderLoading) && (
                    <>
                        <Stack direction={'row'} justifyContent={'space-between'} borderBottom={'1px solid #D1D1D1'} pb={2}>
                            <Label variant="outlined" sx={{ color: "#096E35", borderColor: "#149B4A" }} mt={1}>
                                آماده ارسال
                            </Label>
                            <StyledRoundedWhiteButton variant='outlined' sx={{ px: 2 }}>
                                مشاهده فاکتور
                                <Iconify icon={'solar:arrow-left-linear'} sx={{ ml: 1 }} />
                            </StyledRoundedWhiteButton>
                        </Stack>

                        <Stack spacing={2} py={2}>
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
                                    <Typography variant="h6" fontFamily={'peyda-bold'}>کد سفارش:</Typography>
                                    <Typography ml={1} mt={0.5}>{order.order_number}</Typography>
                                </Stack>
                                <Stack direction={'row'}>
                                    <Typography variant="h6" fontFamily={'peyda-bold'}>تعداد کالا:</Typography>
                                    <Typography ml={1} mt={0.25}>150</Typography>
                                </Stack>
                                <Stack direction={'row'}>
                                    <Typography variant="h6" fontFamily={'peyda-bold'}>تاریخ ثبت سفارش:</Typography>
                                    <Typography ml={1} mt={0.25}>1340/58/88</Typography>
                                </Stack>
                                <Stack direction={'row'}>
                                    <Typography variant="h6" fontFamily={'peyda-bold'}>تاریخ تحویل:</Typography>
                                    <Typography ml={1} mt={0.25}>1340/58/88</Typography>
                                </Stack>
                            </Box>
                        </Stack>

                        <Stack direction={'row'} my={2}>
                            <Typography variant="h6" fontFamily={'peyda-bold'} sx={{ textWrap: 'nowrap' }}>اطلاعات تحویل گیرنده</Typography>
                            <Box width={1} borderBottom={'1px solid #D1D1D1'} mb={1.5} ml={1}></Box>
                        </Stack>

                        <Stack spacing={2} py={2}>
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
                                    <Typography variant="h6" fontFamily={'peyda-bold'}>نام تحویل گیرنده:</Typography>
                                    <Typography ml={1}>{order.reciver_name}</Typography>
                                </Stack>
                                <Stack direction={'row'}>
                                    <Typography variant="h6" fontFamily={'peyda-bold'}>شماره تماس</Typography>
                                    <Typography ml={1} mt={0.25} sx={{ direction: 'rtl' }}>{order.reciver_phone}</Typography>
                                </Stack>
                            </Box>
                        </Stack>

                        <Stack direction={'row'} my={2}>
                            <Typography variant="h6" fontFamily={'peyda-bold'} sx={{ textWrap: 'nowrap' }}>آدرس و نحوه ارسال</Typography>
                            <Box width={1} borderBottom={'1px solid #D1D1D1'} mb={1.5} ml={1}></Box>
                        </Stack>

                        <Stack direction={'row'}>
                            <Typography variant="h6" fontFamily={'peyda-bold'}>نحوه ارسال:</Typography>
                            <StyledRoundedWhiteButton variant='outlined' sx={{ px: 2, ml: 1, mb: 3 }}>
                                <SvgColor src={'/assets/icons/orders/delivery/flag-01.svg'} color={"#727272"} sx={{ mr: 1, width: 16 }} />
                                {
                                    (order.delivery_type === IOrderDeliveryType.tehran && "تحویل در تهران") ||
                                    (order.delivery_type === IOrderDeliveryType.factory && "تحویل درب کارخانه") ||
                                    (order.delivery_type === IOrderDeliveryType.city && "تحویل در شهرستان") || ""
                                }
                            </StyledRoundedWhiteButton>
                        </Stack>

                        <Stack direction={'row'} my={2}>
                            <Typography variant="h6" fontFamily={'peyda-bold'} sx={{ textWrap: 'nowrap' }}>مشخصات صاحب فاکتور</Typography>
                            <Box width={1} borderBottom={'1px solid #D1D1D1'} mb={1.5} ml={1}></Box>
                        </Stack>

                        <Stack spacing={2} py={2}>
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
                                    <Typography variant="h6" fontFamily={'peyda-bold'}>نام:</Typography>
                                    <Typography ml={1} mt={0.5}>{order.invoice_owner?.first_name}</Typography>
                                </Stack>
                                <Stack direction={'row'}>
                                    <Typography variant="h6" fontFamily={'peyda-bold'}>نام خانوادگی:</Typography>
                                    <Typography ml={1} mt={0.25}>{order.invoice_owner?.last_name}</Typography>
                                </Stack>
                                <Stack direction={'row'}>
                                    <Typography variant="h6" fontFamily={'peyda-bold'}>کد ملی:</Typography>
                                    <Typography ml={1} mt={0.25}>{order.invoice_owner?.id_code}</Typography>
                                </Stack>
                            </Box>
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
                                        <TableCell>{index + 1}</TableCell>

                                        <TableCell>{row.user.first_name + " " + row.user.last_name}</TableCell>
                                        <TableCell>{23335}</TableCell>

                                        <TableCell>
                                            {(row.status === OrderStatus.produced) ? (
                                                <Label variant="outlined" sx={{ color: "#005878", borderColor: "#0B7BA7" }}>
                                                    در انتظار پرداخت نهایی
                                                </Label>
                                            ) : (
                                                <Label variant="outlined" sx={{ color: "#096E35", borderColor: "#149B4A" }}>
                                                    آماده ارسال
                                                </Label>
                                            )}
                                        </TableCell>



                                        <TableCell>1409/01/01</TableCell>
                                        <TableCell>1409/01/01</TableCell>

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