"use client";

import { Box, ListItemText, MenuItem, Radio, Select, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { AdminBreadcrumbs } from "src/components/custom-breadcrumbs";
import { paths } from "src/routes/paths";
import { PageTitle } from "../../page-title";
import { Container } from "@mui/system";
import Scrollbar from "src/components/scrollbar";
import { useGetOrderProducts, useGetReadyOrderProducts } from "src/api/order-products";
import { IOrderProductItem, IOrderProductStatus } from "src/types/order-products";
import { IStorage, OrderStatus } from "src/types/order";
import { useState } from "react";
import { endpoints, server_axios } from "src/utils/axios";
import { useGetStorageOrder } from "src/api/orders";
import { ProductOrderType } from "src/types/product";
import { toFarsiNumber } from "src/utils/change-case";

type Props = {
    id: string;
};

export default function StorageDetailsView({ id }: Props) {
    const [select, setSelect] = useState<string>(OrderStatus.preparing);

    const onChangeValue = async (value: string) => {
        setSelect(value);
        await server_axios.patch(endpoints.orders.update(id), {
            status: value
        })
    }

    return (
        <Box>
            <Box>
                <PageTitle
                    title="بررسی جزییات"
                    icon="/assets/icons/admin-panel/arrow-right.svg"
                    color="#727272"
                />
            </Box>
            <Container maxWidth="xl">
                <Stack direction={'row'} justifyContent={'space-between'}>
                    <Typography variant="h6" fontFamily={'peyda-bold'}>لیست کالا ها</Typography>
                    <Select
                        size="small"
                        onChange={(e) => onChangeValue(e.target.value)}
                        value={select}
                        renderValue={(val) => <>{
                            (val === OrderStatus.preparing && 'در حال آماده سازی') ||
                            (val === OrderStatus.ready_to_send && 'آماده شده')
                        }</>}
                        sx={{ border: '1px solid #D1D1D1!important' }}>
                        <MenuItem value={OrderStatus.preparing}>
                            <Radio disableRipple checked={select === OrderStatus.preparing} />
                            در حال آماده سازی
                        </MenuItem>
                        <MenuItem value={OrderStatus.ready_to_send}>
                            <Radio disableRipple checked={select === OrderStatus.ready_to_send} />
                            آماده شده
                        </MenuItem>
                    </Select>
                </Stack>
                <StorageDetailsTable id={id} />
            </Container>
        </Box>
    )
}

export function StorageDetailsTable({ id }: { id: string }) {
    const { storage } = useGetStorageOrder(id);
    return (
        <TableContainer sx={{ overflow: 'unset', mt: 2, boxShadow: '2px 2px 8px 0px #0000001A', borderRadius: '12px', }}>
            <Scrollbar>
                <Table sx={{ minWidth: 960 }}>
                    <TableHead>
                        <TableRow>
                            <TableCell width={40} sx={{ borderTopLeftRadius: '12px' }}></TableCell>

                            <TableCell sx={{ typography: 'subtitle2', fontFamily: 'peyda-bold', color: "#000" }}>شرح کالا / خدمات</TableCell>

                            <TableCell sx={{ fontFamily: 'peyda-bold', color: "#000" }}>کد کالا</TableCell>

                            <TableCell sx={{ fontFamily: 'peyda-bold', color: "#000" }}>تعداد / مقدار</TableCell>

                            <TableCell sx={{ fontFamily: 'peyda-bold', color: "#000" }}>ابعاد</TableCell>

                            <TableCell sx={{ fontFamily: 'peyda-bold', color: "#000" }}>نوع سفارش</TableCell>

                            <TableCell sx={{ fontFamily: 'peyda-bold', color: "#000" }}>واحد</TableCell>

                            <TableCell sx={{ borderTopRightRadius: '12px' }}></TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {storage.map((row: IStorage, index) => (
                            <Row row={row} key={index} />
                        ))}
                    </TableBody>
                </Table>
            </Scrollbar>
        </TableContainer>
    )
}

function Row({ row }: { row: IStorage }) {

    return (
        <TableRow >
            <TableCell>{1}</TableCell>
            <TableCell>{row.name}</TableCell>
            <TableCell>{row.code}</TableCell>
            <TableCell>{toFarsiNumber(row.quantity)}</TableCell>
            <TableCell>{row.dimension ? toFarsiNumber(row.dimension.length) + 'x' + toFarsiNumber(row.dimension.width) : '-'}</TableCell>
            <TableCell>
                {
                    (row.need_to_assemble && row.order_type === ProductOrderType.custom_made) && 'سفارشی، مونتاژ شده'
                    || (!row.need_to_assemble && row.order_type === ProductOrderType.custom_made) && 'سفارشی، بدون مونتاژ'
                    || row.order_type === ProductOrderType.ready_to_use && 'آماده'
                }
            </TableCell>
            <TableCell>شاخه</TableCell>
        </TableRow>
    )
}