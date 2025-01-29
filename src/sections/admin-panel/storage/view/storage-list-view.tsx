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
import Filter from "../../filter";
import { useSettingsContext } from "src/components/settings";
import { PrimaryButton } from "src/components/styles/buttons/primary";
import { toFarsiNumber } from "src/utils/change-case";

export default function StorageListView() {
    const settings = useSettingsContext();

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
        <Box>
            <Box>
                <PageTitle title="مدیریت انبار" icon="/assets/icons/admin-panel/archive.svg" />
            </Box>
            <Container maxWidth={settings.themeStretch ? false : 'lg'} sx={{ pl: '20px!important', ml: '0px!important' }}>
                <Filter />
                <Box>
                    <TableContainer sx={{ overflow: 'unset', mt: 2, boxShadow: '2px 2px 8px 0px #0000001A', borderRadius: '12px' }}>
                        <Scrollbar>
                            <Table sx={{ minWidth: 960 }}>
                                <TableHead>
                                    <TableRow>
                                        <TableCell width={40} sx={{ borderTopLeftRadius: '12px' }}></TableCell>

                                        <TableCell sx={{ typography: 'subtitle2' }}>نام مشتری</TableCell>

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
                                            <TableCell>{row.id}</TableCell>

                                            <TableCell>{(row.user.user_type === IUserTypes.genuine) ? row.user.first_name + " " + row.user.last_name : row.user.company_name}</TableCell>

                                            <TableCell>{toFarsiNumber(row.order_number)}</TableCell>

                                            <TableCell>
                                                {
                                                    (row.status === OrderStatus.preparing || row.status === OrderStatus.produced) && (
                                                        <Label variant="filled" color="yellow">
                                                            در حال آماده‌سازی
                                                        </Label>
                                                    ) || (row.status === OrderStatus.ready_to_send) && (
                                                        <Label variant="filled" color="green">
                                                            آماده‌ شده
                                                        </Label>
                                                    ) || ''
                                                }

                                            </TableCell>

                                            <TableCell dir="ltr">{toFarsiNumber(row.user.phone)}</TableCell>
                                            <TableCell>{fToJamali(row.createdAt)}</TableCell>

                                            <TableCell sx={{ textAlign: 'center' }}>
                                                <PrimaryButton
                                                    size="small"
                                                    onClick={() => router.push(paths.admin_dashboard.storage.details(row.id))}
                                                >
                                                    بررسی جزییات
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