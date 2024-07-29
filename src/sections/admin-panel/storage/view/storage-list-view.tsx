"use client"

import { Box, Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
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

export default function StorageListView() {

    const router = useRouter();

    const {
        orders
    } = useGetStorageOrders();

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
                                                ) || (row.status === OrderStatus.failed) && (
                                                    <Label variant="filled" color="success">
                                                        آماده‌شده
                                                    </Label>
                                                ) || ''
                                            }

                                        </TableCell>

                                        <TableCell dir="ltr">{row.user.phone}</TableCell>
                                        <TableCell>{fToJamali(row.createdAt)}</TableCell>

                                        <TableCell>
                                            <LoadingButton
                                                variant="contained"
                                                sx={{ borderRadius: '28px', width: 1 }}
                                                onClick={() => router.push(paths.admin_dashboard.storage.details(row.id))}
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