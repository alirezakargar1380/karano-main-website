import { Box, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import Scrollbar from "src/components/scrollbar";
import { styled } from '@mui/material/styles';
import { fCurrency } from "src/utils/format-number";
import { IOrderProductItem } from "src/types/order-products";
import React, { use, useEffect, useState } from "react";
import { ProductOrderType } from "src/types/product";
import Label from "src/components/label";
import { fToJamali } from "src/utils/format-time";
import SvgColor from "src/components/svg-color";
import axiosInstance, { endpoints, server_axios } from "src/utils/axios";
import { toFarsiNumber } from "src/utils/change-case";

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '& td': {
        textAlign: 'right',
        borderBottom: 'none',
        paddingTop: theme.spacing(1),
        paddingBottom: theme.spacing(1),
    },
}));

type Props = {
    orderId: number;
    title?: string
    production_date?: string
    downloadable?: boolean | undefined
};

interface Iinvoice {
    total_price: number;
    products: {
        name: string;
        unit: string;
        code: string;
        quantity: number;
        unit_price: number;
        price: number;
    }[]
    assemble_wage: {
        name: string
        code: string
        quantity: number
        price: number
    }[]
}

export default function InvoiceView({
    orderId,
    title = 'مشاهده فاکتور',
    production_date,
    downloadable
}: Props) {

    const [invoice, setInvoice] = useState<Iinvoice>({
        total_price: 0,
        products: [],
        assemble_wage: [],
    })

    useEffect(() => {
        server_axios.post(endpoints.invoice.calculate(orderId)).then((res) => {
            console.log(res.data)
            setInvoice(res.data)
        })
    }, [])

    const renderList = (
        <TableContainer sx={{ overflow: 'unset', mt: 5 }}>
            <Scrollbar>
                <Table sx={{ minWidth: 960 }}>
                    <TableHead sx={{ bgcolor: '#F2F2F2', borderColor: '#D1D1D1' }}>
                        <TableRow>
                            <TableCell width={40}>#</TableCell>

                            <TableCell sx={{ fontFamily: 'peyda-bold', color: '#000' }}>شرح کالا/خدمات</TableCell>

                            <TableCell sx={{ fontFamily: 'peyda-bold', color: '#000' }}>کد کالا</TableCell>

                            <TableCell sx={{ fontFamily: 'peyda-bold', color: '#000' }}>تعداد / مقدار</TableCell>

                            <TableCell sx={{ fontFamily: 'peyda-bold', color: '#000' }}>واحد</TableCell>

                            <TableCell sx={{ fontFamily: 'peyda-bold', color: '#000' }} align="left">مبلغ واحد</TableCell>

                            <TableCell sx={{ fontFamily: 'peyda-bold', color: '#000' }} align="left">مبلغ کل</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        <TableRow sx={{ bgcolor: '#F8F8F8', width: 1 }}>
                            <TableCell></TableCell>

                            <TableCell>
                                محصولات
                            </TableCell>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                        </TableRow>

                        {invoice.products.map((product, index) => (
                            <TableRow key={index}>
                                <TableCell>{index + 1}</TableCell>

                                <TableCell sx={{ maxWidth: 210 }}>
                                    <Typography variant="title3">{product.name}</Typography>

                                    {/* <Typography variant="body2" sx={{ color: 'text.secondary', direction: 'rtl' }} noWrap>
                                            {(property.profile_type?.name || ' * ')}
                                            {"-" + (property.coating_type || ' * ')}
                                            {"-" + (property.cover_type?.name || ' * ')}
                                            {"-" + (property.frame_type?.name || ' * ')}
                                        </Typography> */}
                                </TableCell>

                                <TableCell>
                                    {product.code}
                                </TableCell>

                                <TableCell>
                                    {product.quantity}
                                </TableCell>

                                <TableCell>
                                    {product.unit}
                                </TableCell>

                                <TableCell align="left">
                                    {fCurrency(product.unit_price)}
                                </TableCell>

                                {/* <TableCell align="right">{fCurrency(589 * 99)}</TableCell> */}
                                <TableCell align="left">
                                    {product.price ? fCurrency(product.price) : 0}
                                </TableCell>
                            </TableRow>
                        ))}

                        <TableRow sx={{ bgcolor: '#F8F8F8', width: 1 }}>
                            <TableCell></TableCell>

                            <TableCell>
                                دستمزد مونتاژ
                            </TableCell>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                        </TableRow>

                        {invoice.assemble_wage.map((row, index) => (
                            <TableRow key={index}>
                                <TableCell>{index + 1}</TableCell>

                                <TableCell>
                                    <Typography variant="title3">{row.name}</Typography>
                                </TableCell>

                                <TableCell>{row.code}</TableCell>
                                <TableCell>{row.quantity}</TableCell>
                                <TableCell>{'-'}</TableCell>
                                <TableCell align="left">{fCurrency(row.price / row.quantity)}</TableCell>
                                <TableCell align="left">{fCurrency(row.price)}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Scrollbar>
        </TableContainer>
    );

    return (
        <Box>
            <Stack direction={'row'} justifyContent={'space-between'} borderBottom={'1px solid #D1D1D1'}>
                <Stack direction={'row'} spacing={2}>
                    <Typography variant="h4" sx={{ pb: 2, fontFamily: 'peyda-bold' }}>
                        {title}
                    </Typography>
                    {production_date && (
                        <Label color="blue" fontFamily={'peyda-bold'} px={4} mt={0.75}>
                            تاریخ تحویل:
                            <Box pl={0.5}>{fToJamali(production_date)}</Box>
                        </Label>
                    )}
                </Stack>
                {downloadable && (
                    <SvgColor src="/assets/icons/orders/download-01.svg" sx={{ mr: 0.5 }} />
                )}
            </Stack>
            {renderList}

            <TableContainer sx={{ overflow: 'unset' }}>
                <Scrollbar>
                    <Table sx={{
                        width: {
                            md: '50%',
                            sm: '100%',
                        },
                        ml: 'auto',
                    }}>
                        <TableBody>
                            {/* <TableHead></TableHead> */}

                            <StyledTableRow sx={{ bgcolor: '#F8F8F8', width: 1 }}>
                                <TableCell></TableCell>
                                <TableCell></TableCell>
                                <TableCell sx={{ fontFamily: 'peyda-regular' }}>
                                    محصولات
                                </TableCell>

                                <TableCell>
                                    210*1235
                                </TableCell>
                                <TableCell></TableCell>
                            </StyledTableRow>

                            <StyledTableRow sx={{ bgcolor: '#F8F8F8', width: 1 }}>
                                <TableCell></TableCell>
                                <TableCell></TableCell>
                                <TableCell sx={{ fontFamily: 'peyda-regular' }}>
                                    هزینه ارسال
                                </TableCell>

                                <TableCell>
                                    10,000 تومان
                                </TableCell>
                                <TableCell></TableCell>
                            </StyledTableRow>

                            <StyledTableRow sx={{ bgcolor: '#F8F8F8', width: 1 }}>
                                <TableCell></TableCell>
                                <TableCell></TableCell>
                                <TableCell sx={{ fontFamily: 'peyda-regular' }}>
                                    مالیات و عوارض
                                </TableCell>

                                <TableCell>
                                    1,000,000 تومان
                                </TableCell>
                                <TableCell></TableCell>
                            </StyledTableRow>

                            <StyledTableRow sx={{ bgcolor: '#F8F8F8', width: 1 }}>
                                <TableCell></TableCell>
                                <TableCell></TableCell>
                                <TableCell sx={{ fontFamily: 'peyda-regular' }}>
                                    تخفیف
                                </TableCell>

                                <TableCell>
                                    0 %
                                </TableCell>
                                <TableCell></TableCell>
                            </StyledTableRow>

                            <StyledTableRow sx={{ bgcolor: '#F8F8F8', width: 1 }}>
                                <TableCell></TableCell>
                                <TableCell></TableCell>
                                <TableCell sx={{ fontFamily: 'peyda-regular' }}>
                                    مبلغ کل
                                </TableCell>

                                <TableCell>
                                    {fCurrency(invoice.total_price) + " " + 'ریال'}
                                </TableCell>
                                <TableCell></TableCell>
                            </StyledTableRow>

                        </TableBody>
                    </Table>
                </Scrollbar>
            </TableContainer>
        </Box>
    )
}