"use client";

import { Box, ListItemText, MenuItem, Radio, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { AdminBreadcrumbs } from "src/components/custom-breadcrumbs";
import { paths } from "src/routes/paths";
import { PageTitle } from "../../page-title";
import { Container } from "@mui/system";
import Scrollbar from "src/components/scrollbar";
import { useGetOrderProducts, useGetReadyOrderProducts } from "src/api/order-products";
import { IOrderProductItem, IOrderProductStatus } from "src/types/order-products";
import { OrderStatus } from "src/types/order";
import { useState } from "react";
import { endpoints, server_axios } from "src/utils/axios";

type Props = {
    id: string;
};

export default function StorageDetailsView({ id }: Props) {
    const [select, setSelect] = useState('')

    const { orderProducts } = useGetOrderProducts(+id);

    const onChangeValue = async (value: string, orderId: number) => {
        setSelect(value);
        await server_axios.patch(endpoints.orderProducts.update(orderId), {
            status: value
        })
            .then(() => {

            })
    }

    const readyCheck = () => {

    }

    return (
        <Box>
            <AdminBreadcrumbs
                links={[
                    { name: 'خانه', href: paths.admin_dashboard.root },
                    { name: 'مدیریت انبار' },
                ]}
                sx={{
                    mb: { xs: 3, md: 5 },
                }}
            />
            <Box>
                <PageTitle
                    title="بررسی جزییات"
                    icon="/assets/icons/admin-panel/arrow-right.svg"
                    color="#727272"
                />
            </Box>
            <Container maxWidth="xl">
                <Typography variant="h6" fontFamily={'peyda-bold'}>لیست کالا ها</Typography>
                <TableContainer sx={{ overflow: 'unset', mt: 2 }}>
                    <Scrollbar>
                        <Table sx={{ minWidth: 960, bgcolor: 'white' }}>
                            <TableHead>
                                <TableRow>
                                    <TableCell width={40}></TableCell>

                                    <TableCell sx={{ typography: 'subtitle2', fontFamily: 'peyda-bold', color: "#000" }}>شرح کالا / خدمات</TableCell>

                                    <TableCell sx={{ fontFamily: 'peyda-bold', color: "#000" }}>کد کالا</TableCell>

                                    <TableCell sx={{ fontFamily: 'peyda-bold', color: "#000" }}>تعداد / مقدار</TableCell>

                                    <TableCell sx={{ fontFamily: 'peyda-bold', color: "#000" }}>واحد</TableCell>

                                    <TableCell></TableCell>
                                </TableRow>
                            </TableHead>

                            <TableBody>
                                {orderProducts.map((row: IOrderProductItem, index) => (
                                    <Row row={row} key={index} />
                                ))}
                            </TableBody>
                        </Table>
                    </Scrollbar>
                </TableContainer>
            </Container>
        </Box>
    )
}

function Row({ row }: { row: IOrderProductItem }) {
    const [select, setSelect] = useState(row.status);

    const onChangeValue = async (value: string, orderId: number) => {
        setSelect(value);
        await server_axios.patch(endpoints.orderProducts.update(orderId), {
            status: value
        })
            .then(() => {

            })
    }

    const readyCheck = () => {

    }

    return (
        <TableRow >
            <TableCell>{row.id}</TableCell>

            <TableCell>{row.product.name}</TableCell>
            <TableCell>{row.product.code}</TableCell>
            <TableCell>{row.properties.reduce((a, b) => a + b.quantity, 0)}</TableCell>
            <TableCell>شاخه</TableCell>
            <TableCell>
                <Select
                    size="small"
                    onChange={(e) => onChangeValue(e.target.value, row.order.id)}
                    value={select || row.status}
                    renderValue={(val) => <>{
                        (val === IOrderProductStatus.preparing && 'در حال آماده سازی') ||
                        (val === IOrderProductStatus.ready && 'آماده ارسال')
                    }</>}
                    sx={{ border: '1px solid #D1D1D1!important' }}>
                    <MenuItem value={IOrderProductStatus.preparing}>
                        <Radio disableRipple checked={select === IOrderProductStatus.preparing} />
                        در حال آماده سازی
                    </MenuItem>
                    <MenuItem value={IOrderProductStatus.ready}>
                        <Radio disableRipple checked={select === IOrderProductStatus.ready} />
                        آماده ارسال
                    </MenuItem>
                </Select>
            </TableCell>

            {/* <TableCell>{row.order_number}</TableCell>

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
                                        </TableCell> */}
        </TableRow>
    )
}