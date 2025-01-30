import { Button, MenuItem, Select, TableBody, TableCell, TableRow, TextField } from "@mui/material";
import { BlobProvider, PDFDownloadLink } from "@react-pdf/renderer";
import Label from "src/components/label";
import ProductionPDF from "./production-pdf";
import { _invoices } from "src/_mock";
import { SecondaryButton } from "src/components/styles/buttons/secondary";
import { useCallback, useEffect, useState } from "react";
import { IProductionOrderItem, OrderStatus } from "src/types/order";
import { endpoints, server_axios } from "src/utils/axios";
import { IUserTypes } from "src/types/user";
import SvgColor from "src/components/svg-color";
import { EFrameCore } from "src/types/product";
import { translateCoatingTexture, translateCoverEdgeTape } from "src/sections/cart/cart-table-row";
import { toFarsiNumber } from "src/utils/change-case";
import { fToJamali } from "src/utils/format-time";

interface Props {
    row: IProductionOrderItem
    isLast: boolean
}

export function ProductionTableRow({ row, isLast }: Props) {

    const [isClient, setIsClient] = useState(false)
    const [value, setValue] = useState(row.status)

    useEffect(() => {
        setIsClient(true)
    }, []);

    const handleChangeProductionStatus = useCallback(async (e: any) => {
        setValue(e.target.value);
        await server_axios.patch(endpoints.orders.update(row.id), {
            status: e.target.value
        });
    }, [])

    return (
        <TableBody>
            <TableRow sx={{
                ...(isLast && {
                    borderBottom: 'none'
                }),
            }}>
                <TableCell>{row.id}</TableCell>

                <TableCell>{toFarsiNumber(row.order_number)}</TableCell>

                <TableCell>
                    <Select
                        fullWidth
                        value={value}
                        size="small"
                        sx={{
                            ...((value === OrderStatus.production) ? {
                                bgcolor: "#DCF9FF",
                                color: "#005878!important",
                                borderRadius: '24px',
                                border: '1px solid #86D8F8!important',
                            } : {
                                bgcolor: "#E0FFEB",
                                color: "#096E35!important",
                                borderRadius: '24px',
                                border: '1px solid #8EEFB4!important',
                            }),
                            height: '29px',
                            width: 'fit-content',
                            p: 0,
                            typography: 'body4',
                            '& fieldset': {
                                border: 'none'
                            }
                        }}
                        variant="outlined"
                        onChange={handleChangeProductionStatus}>
                        <MenuItem value={OrderStatus.production}>
                            درحال تولید
                        </MenuItem>
                        <MenuItem value={OrderStatus.produced}>
                            تولید شده
                        </MenuItem>
                    </Select>
                </TableCell>

                <TableCell>{(row.user.user_type === IUserTypes.genuine) ? row.user.first_name + " " + row.user.last_name : row.user.company_name}</TableCell>

                <TableCell>{fToJamali(row.production_date)}</TableCell>

                <TableCell>
                    {(isClient) && (
                        <PDFDownloadLink
                            document={
                                <ProductionPDF
                                    invoice={{
                                        ..._invoices[0],
                                        items: row.products,
                                        invoiceNumber: fToJamali(row.production_date)
                                    }}
                                    currentStatus={row.order_number}
                                />
                            }
                            fileName={`${row.order_number}.pdf`}
                            style={{ textDecoration: 'none' }}
                        >
                            {({ blob, url, loading, error }) => url && (
                                <SecondaryButton size="small" sx={{ color: "black" }} onClick={() => {
                                    window.open(url, "_blank")
                                }}>
                                    <SvgColor src="/assets/icons/orders/download-01.svg" sx={{ mr: 0.5 }} />
                                    دانلود فرم سفارش ساخت
                                </SecondaryButton>
                            )}
                        </PDFDownloadLink>
                    )}
                </TableCell>
            </TableRow>
        </TableBody>
    )
}