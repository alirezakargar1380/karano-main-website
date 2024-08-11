"use client"

import { Box, Container, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { PageTitle } from "../../page-title";
import { paths } from "src/routes/paths";
import { AdminBreadcrumbs } from "src/components/custom-breadcrumbs";
import Scrollbar from "src/components/scrollbar";
import { useGetStorageOrders } from "src/api/orders";
import { IOrderItem, OrderStatus } from "src/types/order";
import { IUserTypes } from "src/types/user";
import Label from "src/components/label";
import { fDateTime, fToJamali } from "src/utils/format-time";
import { LoadingButton } from "@mui/lab";
import { useRouter } from 'src/routes/hooks';
import FormProvider, { RHFMultiSelect } from "src/components/hook-form";
import { useForm } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from 'yup';

export default function StorageListView() {

    const router = useRouter();

    const {
        orders
    } = useGetStorageOrders();

    const methods = useForm({
        // resolver: yupResolver<any>(schema),
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
        <Container maxWidth={'lg'}>
            <AdminBreadcrumbs
                links={[
                    { name: 'پنل کاربری ادمین', href: paths.admin_dashboard.root },
                    { name: 'مدیریت انبار' },
                ]}
                sx={{
                    mb: { xs: 3, md: 5 },
                }}
            />
            <Box>
                <PageTitle title="مدیریت انبار" icon="/assets/icons/admin-panel/archive.svg" />
            </Box>
            <FormProvider methods={methods} onSubmit={onSubmit}>
            <Stack sx={{ width: 1 }} direction={'row'} spacing={2}>
                <Typography variant="body1" fontFamily={'peyda-bold'} mt={1}>لیست سفارش ها</Typography>
                <RHFMultiSelect
                    name="dsdf"
                    label="وضعیت سفارش"
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

                                    <TableCell sx={{ typography: 'subtitle2' }}>نام مشتری</TableCell>

                                    <TableCell>کد سفارش</TableCell>

                                    <TableCell>وضعیت سفارش</TableCell>

                                    <TableCell>موبایل مشتری</TableCell>

                                    <TableCell>تاریخ سفارش</TableCell>

                                    <TableCell></TableCell>
                                </TableRow>
                            </TableHead>

                            <TableBody>
                                {orders.map((row: IOrderItem, index) => (
                                    <TableRow key={index}>
                                        <TableCell>{row.id}</TableCell>

                                        <TableCell>{(row.user.user_type === IUserTypes.genuine) ? row.user.first_name + " " + row.user.last_name : row.user.company_name}</TableCell>

                                        <TableCell>{row.order_number}</TableCell>

                                        <TableCell>
                                            {
                                                (row.status === OrderStatus.preparing) && (
                                                    <Label variant="filled" color="warning">
                                                        در حال آماده‌سازی
                                                    </Label>
                                                ) || (row.status === OrderStatus.ready_to_send) && (
                                                    <Label variant="filled" color="success">
                                                        آماده‌ شده
                                                    </Label>
                                                ) || ''
                                            }

                                        </TableCell>

                                        <TableCell dir="ltr">{row.user.phone}</TableCell>
                                        <TableCell>{fToJamali(row.createdAt)}</TableCell>

                                        <TableCell sx={{ textAlign: 'center' }}>
                                            <LoadingButton
                                                variant="contained"
                                                sx={{ borderRadius: '28px', }}
                                                onClick={() => router.push(paths.admin_dashboard.storage.details(row.id))}
                                            >
                                                بررسی جزییات
                                            </LoadingButton>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </Scrollbar>
                </TableContainer>
            </Box>
        </Container>
    )
}