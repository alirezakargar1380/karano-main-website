import { LoadingButton } from "@mui/lab";
import { Box, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { StyledRoundedWhiteButton } from "src/components/styles/props/rounded-white-button";
import { useCheckoutContext } from "../checkout/context";
import Scrollbar from "src/components/scrollbar";
import { styled } from '@mui/material/styles';
import { fCurrency } from "src/utils/format-number";
import { IInvoice } from "src/types/invoice";

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '& td': {
        textAlign: 'right',
        borderBottom: 'none',
        paddingTop: theme.spacing(1),
        paddingBottom: theme.spacing(1),
    },
}));

type Props = {
    invoice: IInvoice;
};

export default function InvoiceView({ invoice }: Props) {
    const checkout = useCheckoutContext();

    const renderTotal = (
        <>
            <StyledTableRow>
                <TableCell colSpan={3} />
                <TableCell sx={{ color: 'text.secondary' }}>
                    <Box sx={{ mt: 2 }} />
                    Subtotal
                </TableCell>
                <TableCell width={120} sx={{ typography: 'subtitle2' }}>
                    <Box sx={{ mt: 2 }} />
                    {fCurrency(invoice.subTotal)}
                </TableCell>
            </StyledTableRow>

            <StyledTableRow>
                <TableCell colSpan={3} />
                <TableCell sx={{ color: 'text.secondary' }}>Shipping</TableCell>
                <TableCell width={120} sx={{ color: 'error.main', typography: 'body2' }}>
                    {fCurrency(-invoice.shipping)}
                </TableCell>
            </StyledTableRow>

            <StyledTableRow>
                <TableCell colSpan={3} />
                <TableCell sx={{ color: 'text.secondary' }}>Discount</TableCell>
                <TableCell width={120} sx={{ color: 'error.main', typography: 'body2' }}>
                    {fCurrency(-invoice.discount)}
                </TableCell>
            </StyledTableRow>

            <StyledTableRow>
                <TableCell colSpan={3} />
                <TableCell sx={{ color: 'text.secondary' }}>Taxes</TableCell>
                <TableCell width={120}>{fCurrency(invoice.taxes)}</TableCell>
            </StyledTableRow>

            <StyledTableRow>
                <TableCell colSpan={3} />
                <TableCell sx={{ typography: 'subtitle1' }}>Total</TableCell>
                <TableCell width={140} sx={{ typography: 'subtitle1' }}>
                    {fCurrency(invoice.totalAmount)}
                </TableCell>
            </StyledTableRow>
        </>
    );


    const renderList = (
        <TableContainer sx={{ overflow: 'unset', mt: 5 }}>
            <Scrollbar>
                <Table sx={{ minWidth: 960 }}>
                    <TableHead sx={{ bgcolor: '#F2F2F2', borderColor: '#D1D1D1' }}>
                        <TableRow>
                            <TableCell width={40}>#</TableCell>

                            <TableCell sx={{ typography: 'subtitle2' }}>Description</TableCell>

                            <TableCell>Qty</TableCell>

                            <TableCell align="right">Unit price</TableCell>

                            <TableCell align="right">Total</TableCell>
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
                        </TableRow>

                        {invoice.items.map((row, index) => (
                            <TableRow key={index}>
                                <TableCell>{index + 1}</TableCell>

                                <TableCell>
                                    <Box sx={{ maxWidth: 560 }}>
                                        <Typography variant="subtitle2">{row.title}</Typography>

                                        <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
                                            {row.description}
                                        </Typography>
                                    </Box>
                                </TableCell>

                                <TableCell>{row.quantity}</TableCell>

                                <TableCell align="right">{fCurrency(row.price)}</TableCell>

                                <TableCell align="right">{fCurrency(row.price * row.quantity)}</TableCell>
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
                        </TableRow>

                        {invoice.items.map((row, index) => (
                            <TableRow key={index}>
                                <TableCell>{index + 1}</TableCell>

                                <TableCell>
                                    <Box sx={{ maxWidth: 560 }}>
                                        <Typography variant="subtitle2">{row.title}</Typography>

                                        <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
                                            {row.description}
                                        </Typography>
                                    </Box>
                                </TableCell>

                                <TableCell>{row.quantity}</TableCell>

                                <TableCell align="right">{fCurrency(row.price)}</TableCell>

                                <TableCell align="right">{fCurrency(row.price * row.quantity)}</TableCell>
                            </TableRow>
                        ))}

                        {/* {renderTotal} */}
                    </TableBody>
                </Table>
            </Scrollbar>
        </TableContainer>
    );

    return (
        <Box>
            <Typography variant="h4" sx={{ width: 1, pb: 2, fontFamily: 'peyda-bold', borderBottom: '1px solid #D1D1D1' }}>
                پیش‌فاکتور فروش کالا‌و‌خدمات
            </Typography>
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
                                    2 %
                                </TableCell>
                                <TableCell></TableCell>
                            </StyledTableRow>

                            <StyledTableRow sx={{ bgcolor: '#F8F8F8', width: 1 }}>
                                <TableCell></TableCell>
                                <TableCell></TableCell>
                                <TableCell sx={{ fontFamily: 'peyda-regular' }}>
                                    مبلغ پرداختی
                                </TableCell>

                                <TableCell>
                                    157,000,000 تومان
                                </TableCell>
                                <TableCell></TableCell>
                            </StyledTableRow>

                        </TableBody>
                    </Table>
                </Scrollbar>
            </TableContainer>

            <Stack sx={{ mt: 2 }} direction={'row'} spacing={1} justifyContent={'end'}>
                <StyledRoundedWhiteButton variant='outlined' sx={{ px: 4 }} onClick={() => checkout.onBackStep()}>مرحله قبل</StyledRoundedWhiteButton>
                <LoadingButton variant='contained' sx={{ borderRadius: '24px', px: 4 }} onClick={() => checkout.onNextStep()}>ثبت و ادامه</LoadingButton>
            </Stack>
        </Box>
    )
}