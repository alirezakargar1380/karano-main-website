import { LoadingButton } from "@mui/lab";
import { Box, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { StyledRoundedWhiteButton } from "src/components/styles/props/rounded-white-button";
import { useCheckoutContext } from "../checkout/context";
import Scrollbar from "src/components/scrollbar";
import { styled } from '@mui/material/styles';
import { fCurrency } from "src/utils/format-number";
import { IInvoice } from "src/types/invoice";
import { IOrderProductItem } from "src/types/order-products";
import React from "react";
import { ProductOrderType } from "src/types/product";
import Label from "src/components/label";
import { fToJamali } from "src/utils/format-time";
import SvgColor from "src/components/svg-color";

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '& td': {
        textAlign: 'right',
        borderBottom: 'none',
        paddingTop: theme.spacing(1),
        paddingBottom: theme.spacing(1),
    },
}));

type Props = {
    orderProducts: IOrderProductItem[];
    title?: string
    production_date?: string
};

export default function InvoiceView({
    orderProducts,
    title = 'مشاهده فاکتور',
    production_date
}: Props) {
    // const checkout = useCheckoutContext();

    // const renderTotal = (
    //     <>
    //         <StyledTableRow>
    //             <TableCell colSpan={3} />
    //             <TableCell sx={{ color: 'text.secondary' }}>
    //                 <Box sx={{ mt: 2 }} />
    //                 Subtotal
    //             </TableCell>
    //             <TableCell width={120} sx={{ typography: 'subtitle2' }}>
    //                 <Box sx={{ mt: 2 }} />
    //                 {fCurrency(invoice.subTotal)}
    //             </TableCell>
    //         </StyledTableRow>

    //         <StyledTableRow>
    //             <TableCell colSpan={3} />
    //             <TableCell sx={{ color: 'text.secondary' }}>Shipping</TableCell>
    //             <TableCell width={120} sx={{ color: 'error.main', typography: 'body2' }}>
    //                 {fCurrency(-invoice.shipping)}
    //             </TableCell>
    //         </StyledTableRow>

    //         <StyledTableRow>
    //             <TableCell colSpan={3} />
    //             <TableCell sx={{ color: 'text.secondary' }}>Discount</TableCell>
    //             <TableCell width={120} sx={{ color: 'error.main', typography: 'body2' }}>
    //                 {fCurrency(-invoice.discount)}
    //             </TableCell>
    //         </StyledTableRow>

    //         <StyledTableRow>
    //             <TableCell colSpan={3} />
    //             <TableCell sx={{ color: 'text.secondary' }}>Taxes</TableCell>
    //             <TableCell width={120}>{fCurrency(invoice.taxes)}</TableCell>
    //         </StyledTableRow>

    //         <StyledTableRow>
    //             <TableCell colSpan={3} />
    //             <TableCell sx={{ typography: 'subtitle1' }}>Total</TableCell>
    //             <TableCell width={140} sx={{ typography: 'subtitle1' }}>
    //                 {fCurrency(invoice.totalAmount)}
    //             </TableCell>
    //         </StyledTableRow>
    //     </>
    // );

    function calculateProfileTotal(width: number, qty: number) {
        let panels = {
            length: 8,
            width: 240,
            quantity: 1000,
        },
            parts = {
                length: 111,
                width: width,
                quantity: qty,
            }
        let count = 0
        const allPanels = []
        const itemShouldBuild = []

        for (let i = 1; i <= panels.quantity; i++) {
            allPanels.push({
                length: panels.length,
                width: panels.width
            })
        }

        for (let i = 1; i <= parts.quantity * 2; i++) {
            itemShouldBuild.push({
                width: parts.width,
                build: false
            })
            itemShouldBuild.push({
                width: parts.length,
                build: false
            })
        }

        for (let i = 0; i < allPanels.length; i++) {
            let panel = allPanels[i];
            // let panel = {
            //     width: 240
            // }
            for (let j = 0; j < itemShouldBuild.length; j++) {
                let part = itemShouldBuild[j]
                // if (part.width > panel.width && part.build) count++
                if (part.width < panel.width && !part.build) {
                    part.build = true
                    panel.width -= part.width
                } else {
                    // count++
                    // panel.width = 240
                    continue;
                }
            }
        }

        allPanels.forEach((p) => p.width !== panels.width && count++)

        return count
    }

    const renderList = (
        <TableContainer sx={{ overflow: 'unset', mt: 5 }}>
            <Scrollbar>
                <Table sx={{ minWidth: 960 }}>
                    <TableHead sx={{ bgcolor: '#F2F2F2', borderColor: '#D1D1D1' }}>
                        <TableRow>
                            <TableCell width={40}>#</TableCell>

                            <TableCell sx={{ fontFamily: 'peyda-bold', color: '#000' }}>Description</TableCell>

                            <TableCell sx={{ fontFamily: 'peyda-bold', color: '#000' }}>کد کالا</TableCell>

                            <TableCell sx={{ fontFamily: 'peyda-bold', color: '#000' }}>تعداد / مقدار</TableCell>

                            <TableCell sx={{ fontFamily: 'peyda-bold', color: '#000' }}>ابعاد</TableCell>

                            <TableCell sx={{ fontFamily: 'peyda-bold', color: '#000' }}>تعداد پروفیل</TableCell>

                            <TableCell sx={{ fontFamily: 'peyda-bold', color: '#000' }} align="right">Unit price</TableCell>

                            <TableCell sx={{ fontFamily: 'peyda-bold', color: '#000' }} align="right">Total</TableCell>
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
                            <TableCell></TableCell>
                        </TableRow>

                        {orderProducts.map((orderProduct, ind) => (
                            <React.Fragment key={ind}>
                                {orderProduct.properties.map((property, index) => (
                                    <TableRow key={index}>
                                        <TableCell>{index + 1}</TableCell>

                                        <TableCell>
                                            <Box sx={{ maxWidth: 560 }}>
                                                <Typography variant="subtitle2">{orderProduct.product.name}</Typography>

                                                <Typography variant="body2" sx={{ color: 'text.secondary', direction: 'rtl' }} noWrap>
                                                    {(property.profile_type?.name || ' * ')}
                                                    {"-" + (property.coating_type || ' * ')}
                                                    {"-" + (property.cover_type?.name || ' * ')}
                                                    {"-" + (property.frame_type?.name || ' * ')}
                                                </Typography>
                                            </Box>
                                        </TableCell>

                                        <TableCell>
                                            {orderProduct.product.code}
                                        </TableCell>

                                        <TableCell>
                                            {property.quantity}
                                        </TableCell>

                                        <TableCell>
                                            {/* {property.dimension} */}
                                        </TableCell>

                                        <TableCell>
                                            {calculateProfileTotal(Number(property?.dimension?.width), property.quantity)}
                                        </TableCell>

                                        <TableCell align="right">
                                            {orderProduct.product.order_type === ProductOrderType.ready_to_use ?
                                                fCurrency(orderProduct.product.price) :
                                                fCurrency((calculateProfileTotal(Number(property?.dimension?.width), property.quantity) * property.profile_type.unit_price) / property.quantity)
                                            }
                                        </TableCell>

                                        {/* <TableCell align="right">{fCurrency(589 * 99)}</TableCell> */}
                                        <TableCell align="right">
                                            {orderProduct.product.order_type === ProductOrderType.ready_to_use ?
                                                fCurrency(property.quantity * orderProduct.product.price)
                                                :
                                                fCurrency(calculateProfileTotal(Number(property?.dimension?.width), property.quantity) * property.profile_type.unit_price)
                                            }
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </React.Fragment>
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
                            <TableCell></TableCell>
                        </TableRow>

                        {/* {invoice.items.map((row, index) => (
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

                                <TableCell></TableCell>
                                <TableCell></TableCell>
                                <TableCell></TableCell>

                                <TableCell>{row.quantity}</TableCell>

                                <TableCell align="right">{fCurrency(row.price)}</TableCell>

                                <TableCell align="right">{fCurrency(row.price * row.quantity)}</TableCell>
                            </TableRow>
                        ))} */}

                        {/* {renderTotal} */}
                    </TableBody>
                </Table>
            </Scrollbar>
        </TableContainer>
    );

    return (
        <Box p={2}>
            <Stack direction={'row'} justifyContent={'space-between'} borderBottom={'1px solid #D1D1D1'}>
                <Stack direction={'row'} spacing={2}>
                    <Typography variant="h4" sx={{ pb: 2, fontFamily: 'peyda-bold' }}>
                        {title}
                    </Typography>
                    {production_date && (
                        <Label color="info" fontFamily={'peyda-bold'} px={4} mt={0.75}>
                            تاریخ تحویل:
                            <Box pl={0.5}>{fToJamali(production_date)}</Box>
                        </Label>
                    )}
                </Stack>
                <SvgColor src="/assets/icons/orders/download-01.svg" sx={{ mr: 0.5 }} />
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
        </Box>
    )
}