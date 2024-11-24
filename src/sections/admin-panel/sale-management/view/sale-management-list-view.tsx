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
import { fDateTime, fToJamali } from "src/utils/format-time";
import { IUserTypes } from "src/types/user";
import { PrimaryButton } from "src/components/styles/buttons/primary";
import { toFarsiNumber } from "src/utils/change-case";
import Tag from "src/components/tag";
import Filter from "../../filter";

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
        <Box>
            <Box>
                <PageTitle title="مدیریت فروش" icon="/assets/icons/shop/shopping-cart-01.svg" />
            </Box>
            <Container maxWidth={settings.themeStretch ? false : 'lg'} sx={{ pl: '20px!important', ml: '0px!important' }}>
                <Filter />
                <Box>
                    <TableContainer sx={{ overflow: 'unset', mt: 2, boxShadow: '2px 2px 8px 0px #0000001A', borderRadius: '12px', }}>
                        <Scrollbar>
                            <Table sx={{
                                minWidth: 960,
                                // bgcolor: 'white',
                            }}>
                                <TableHead sx={{ typography: 'body3' }}>
                                    <TableRow sx={{ typography: 'body3' }}>
                                        {/* <TableCell width={40}></TableCell> */}

                                        <TableCell sx={{ borderTopLeftRadius: '12px' }}>نام مشتری</TableCell>

                                        <TableCell>کد سفارش</TableCell>

                                        <TableCell>وضعیت سفارش</TableCell>

                                        <TableCell>موبایل مشتری</TableCell>

                                        <TableCell>تاریخ سفارش</TableCell>

                                        <TableCell sx={{ borderTopRightRadius: '12px' }}></TableCell>
                                    </TableRow>
                                </TableHead>

                                <TableBody>
                                    {orders.map((row: IOrderItem, index) => (
                                        <TableRow
                                            key={index}
                                            sx={{
                                                ...((index === orders.length - 1) && {
                                                    borderBottom: 'none'
                                                }),
                                            }}
                                        >
                                            {/* <TableCell>{row.id}</TableCell> */}

                                            <TableCell>{(row.user.user_type === IUserTypes.genuine) ? row.user.first_name + " " + row.user.last_name : row.user.company_name}</TableCell>

                                            <TableCell>{toFarsiNumber(row.order_number)}</TableCell>

                                            <TableCell>
                                                {
                                                    (row.status === OrderStatus.pending) && (
                                                        <Tag variant="outlined" size="medium" color="blue">
                                                            در انتظار بررسی
                                                        </Tag>
                                                    ) || (row.status === OrderStatus.failed) && (
                                                        <Tag variant="outlined" size="medium" color="red">
                                                            رد شده
                                                        </Tag>
                                                    ) || (row.status === OrderStatus.edited) && (
                                                        <Tag variant="outlined" size="medium" color="yellow">
                                                            اصلاح شده
                                                        </Tag>
                                                    ) || (row.status === OrderStatus.produced) && (
                                                        <Tag variant="outlined" size="medium" sx={{ color: "#005878", borderColor: "#0B7BA7" }}>
                                                            در انتظار پرداخت نهایی
                                                        </Tag>
                                                    ) || (row.status === OrderStatus.posted) && (
                                                        <Tag variant="outlined" size="medium" color="green">
                                                            ارسال شده
                                                        </Tag>
                                                    ) || (row.status === OrderStatus.accepted) && (
                                                        <Tag variant="outlined" size="medium" color="green">
                                                            تایید شده
                                                        </Tag>
                                                    ) || (row.status === OrderStatus.production) && (
                                                        <Tag variant="outlined" size="medium" color="green">
                                                            در حال تولید
                                                        </Tag>
                                                    ) || (row.status === OrderStatus.preparing) && (
                                                        <Tag variant="outlined" size="medium" color="green">
                                                            در حال آماده سازی
                                                        </Tag>
                                                    ) || (row.status === OrderStatus.ready_to_send) && (
                                                        <Tag variant="outlined" size="medium" color="green">
                                                            آماده ارسال
                                                        </Tag>
                                                    ) ||
                                                    ''
                                                }

                                            </TableCell>

                                            <TableCell dir="ltr">{toFarsiNumber(row.user.phone)}</TableCell>
                                            <TableCell>{fToJamali(row.createdAt)}</TableCell>

                                            <TableCell sx={{ textAlign: 'end' }}>
                                                <PrimaryButton
                                                    size="small"
                                                    variant="contained"
                                                    onClick={() => router.push(paths.admin_dashboard.saleManagement.details(row.id))}
                                                >
                                                    {(row.status === OrderStatus.edited
                                                        || row.status === OrderStatus.pending
                                                        || row.status === OrderStatus.failed) ? "بررسی" : "مشاهده"}
                                                </PrimaryButton>
                                            </TableCell>
                                        </TableRow>
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