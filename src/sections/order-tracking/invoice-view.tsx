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
import { useGetOrderInvoice } from "src/api/invoice";

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '& td': {
        textAlign: 'right',
        borderBottom: 'none',
        paddingTop: theme.spacing(1),
        paddingBottom: theme.spacing(1),
    },
}));

type Props = {
    orderId?: number;
    title?: string;
    invoice_data?: Iinvoice;
    production_date?: string
    downloadable?: boolean | undefined
};

interface IinvoiceCloumn {
    name: string;
    unit: string;
    code: string;
    quantity: number;
    unit_price: number;
    price: number;
}

export interface Iinvoice {
    prepayment: number;
    discount_percentage: number;
    total_price: number;
    tax: number;
    shipping: number;
    products: IinvoiceCloumn[]
    assemble_wage: IinvoiceCloumn[]
    packaging: IinvoiceCloumn[]
}

export default function InvoiceView({
    orderId,
    title = 'مشاهده فاکتور',
    invoice_data,
    production_date,
    downloadable
}: Props) {

    const { invoice } = useGetOrderInvoice(orderId);

    // const [invoice, setInvoice] = useState<Iinvoice>(invoice_data || {
    //     total_price: 0,
    //     prepayment: 0,
    //     shipping: 0,
    //     tax: 0,
    //     discount_percentage: 0,
    //     products: [],
    //     assemble_wage: [],
    //     packaging: [],
    // })

    // useEffect(() => {
    //     if (orderId)
    //         server_axios.post(endpoints.invoice.calculate(orderId)).then((res) => {
    //             setInvoice(res.data)
    //         })
    // }, [])

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
                                    {toFarsiNumber(product.code)}
                                </TableCell>

                                <TableCell>
                                    {toFarsiNumber(product.quantity)}
                                </TableCell>

                                <TableCell>
                                    {product.unit}
                                </TableCell>

                                <TableCell align="left">
                                    {toFarsiNumber(fCurrency(product.unit_price))}
                                </TableCell>

                                <TableCell align="left">
                                    {product.price ? toFarsiNumber(fCurrency(product.price)) : 0}
                                </TableCell>
                            </TableRow>
                        ))}


                        {invoice.assemble_wage.length > 0 && (
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
                        )}


                        {invoice.assemble_wage.map((row, index) => (
                            <TableRow key={index}>
                                <TableCell>{index + 1}</TableCell>

                                <TableCell>
                                    <Typography variant="title3">{row.name}</Typography>
                                </TableCell>

                                <TableCell>{row.code}</TableCell>
                                <TableCell>{toFarsiNumber(row.quantity)}</TableCell>
                                <TableCell>{row.unit}</TableCell>
                                <TableCell align="left">{toFarsiNumber(fCurrency(row.unit_price))}</TableCell>
                                <TableCell align="left">{toFarsiNumber(fCurrency(row.price))}</TableCell>
                            </TableRow>
                        ))}

                        {invoice.packaging.length > 0 && (
                            <TableRow sx={{ bgcolor: '#F8F8F8', width: 1 }}>
                                <TableCell></TableCell>

                                <TableCell>
                                    بسته بندی
                                </TableCell>
                                <TableCell></TableCell>
                                <TableCell></TableCell>
                                <TableCell></TableCell>
                                <TableCell></TableCell>
                                <TableCell></TableCell>
                            </TableRow>
                        )}


                        {invoice.packaging.map((row, index) => (
                            <TableRow key={index}>
                                <TableCell>{index + 1}</TableCell>

                                <TableCell>
                                    <Typography variant="title3">{row.name}</Typography>
                                </TableCell>

                                <TableCell>{row.code}</TableCell>
                                <TableCell>{toFarsiNumber(row.quantity)}</TableCell>
                                <TableCell>{row.unit}</TableCell>
                                <TableCell align="left">{toFarsiNumber(fCurrency(row.unit_price))}</TableCell>
                                <TableCell align="left">{toFarsiNumber(fCurrency(row.price))}</TableCell>
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
                        <Label color="blue" variant="filled" fontFamily={'peyda-bold'} px={4} mt={0.75}>
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

                            {/* <StyledTableRow sx={{ bgcolor: '#F8F8F8', width: 1 }}>
                                <TableCell></TableCell>
                                <TableCell></TableCell>
                                <TableCell sx={{ fontFamily: 'peyda-regular' }}>
                                    محصولات
                                </TableCell>

                                <TableCell>
                                    210*1235
                                </TableCell>
                                <TableCell></TableCell>
                            </StyledTableRow> */}

                            <StyledTableRow sx={{ bgcolor: '#F8F8F8', width: 1 }}>
                                <TableCell></TableCell>
                                <TableCell></TableCell>
                                <TableCell sx={{ fontFamily: 'peyda-regular' }}>
                                    هزینه ارسال
                                </TableCell>

                                <TableCell>
                                    {invoice.shipping > 0 ? toFarsiNumber(fCurrency(invoice.shipping || 0)) + ' ریال' : '۰ ریال'}
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
                                    {toFarsiNumber(fCurrency(invoice.tax)) + ' ریال'}
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
                                    % {toFarsiNumber(invoice.discount_percentage)}
                                </TableCell>
                                <TableCell></TableCell>
                            </StyledTableRow>

                            {invoice.prepayment > 0 && (
                                <StyledTableRow sx={{ bgcolor: '#F8F8F8', width: 1 }}>
                                    <TableCell></TableCell>
                                    <TableCell></TableCell>
                                    <TableCell sx={{ fontFamily: 'peyda-regular' }}>
                                        مبلغ پیش پرداخت
                                    </TableCell>

                                    <TableCell>
                                        {toFarsiNumber(fCurrency(invoice.prepayment)) + ' ریال'}
                                    </TableCell>
                                    <TableCell></TableCell>
                                </StyledTableRow>
                            )}

                            <StyledTableRow sx={{ bgcolor: '#F8F8F8', width: 1 }}>
                                <TableCell></TableCell>
                                <TableCell></TableCell>
                                <TableCell sx={{ fontFamily: 'peyda-regular' }}>
                                    مبلغ کل
                                </TableCell>

                                <TableCell>
                                    {toFarsiNumber(fCurrency(invoice.total_price)) + " " + 'ریال'}
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