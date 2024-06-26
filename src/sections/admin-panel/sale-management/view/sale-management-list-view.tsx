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
import { useGetOrders } from "src/api/orders";
import { IOrderItem, OrderStatus } from "src/types/order";
import { fDate, fDateTime } from "src/utils/format-time";

export default function SaleManagementListView() {
    const settings = useSettingsContext();

    const router = useRouter();

    const schema = Yup.object().shape({
    });

    const {
        orders
    } = useGetOrders();

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
                <PageTitle title="مدیریت فروش" icon="/assets/icons/shop/shopping-cart-01.svg" />
            </Box>
            <FormProvider methods={methods} onSubmit={onSubmit}>
                <Stack sx={{ width: 1 }} direction={'row'} spacing={2}>
                    <Typography variant="h5" fontFamily={'peyda-bold'}>لیست سفارش ها</Typography>
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

                                        <TableCell>{row.user.first_name + " " + row.user.last_name}</TableCell>

                                        <TableCell>{row.order_number}</TableCell>

                                        <TableCell>
                                            {
                                                (row.status === OrderStatus.pending) && (
                                                    <Label variant="filled" color="info">
                                                        در حال بررسی
                                                    </Label>
                                                ) || (row.status === OrderStatus.failed) && (
                                                    <Label variant="filled" color="error">
                                                        رد شده
                                                    </Label>
                                                ) || (row.status === OrderStatus.accepted) && (
                                                    <Label variant="filled" color="success">
                                                        تایید شده
                                                    </Label>
                                                ) ||
                                                ''
                                            }

                                        </TableCell>

                                        <TableCell dir="ltr">{row.user.phone}</TableCell>
                                        <TableCell>{fDateTime(row.createdAt)}</TableCell>

                                        <TableCell>
                                            <LoadingButton
                                                variant="contained"
                                                sx={{ borderRadius: '28px', width: 1 }}
                                                onClick={() => router.push(paths.admin_dashboard.saleManagement.details(row.id))}
                                            >
                                                بررسی
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