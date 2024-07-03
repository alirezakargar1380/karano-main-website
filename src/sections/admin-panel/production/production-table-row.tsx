import { TableBody, TableCell, TableRow } from "@mui/material";
import { PDFDownloadLink } from "@react-pdf/renderer";
import Label from "src/components/label";
import ProductionPDF from "./production-pdf";
import { _invoices } from "src/_mock";
import { StyledRoundedWhiteButton } from "src/components/styles/props/rounded-white-button";
import { useEffect, useState } from "react";
import { IOrderItem } from "src/types/order";

interface Props {
    row: IOrderItem
}

export function ProductionTableRow({ row }: Props) {

    const [isClient, setIsClient] = useState(false)

    useEffect(() => {
        setIsClient(true)
    }, [])

    return (
        <TableBody>
            <TableRow>
                <TableCell>{row.id}</TableCell>

                <TableCell>{row.order_number}</TableCell>

                <TableCell>
                    <Label variant="filled" color="info">
                        در حال بررسی
                    </Label>
                </TableCell>

                <TableCell>{row.user.first_name + " " + row.user.last_name}</TableCell>

                <TableCell>1409/01/01</TableCell>

                <TableCell>
                    {isClient ?
                        <PDFDownloadLink
                            document={<ProductionPDF invoice={{
                                ..._invoices[0],
                                items: row.order_products.map((op) => {
                                    return op.properties.map((opp) => {
                                        return {
                                            id: op.id,
                                            title: op.product.name,
                                            price: op.product.price,
                                            total: op.product.price * opp.quantity,
                                            service: '*** - ***',
                                            quantity: opp.quantity,
                                            description: opp.dimension ? opp.dimension.width + "*" + opp.dimension.height : '***'
                                        }
                                    })
                                }).reduce((acc, current) => acc.concat(current), [])
                            }} currentStatus={'production'} />}
                            fileName={`${row.order_number}.pdf`}
                            style={{ textDecoration: 'none' }}
                        >
                            {({ loading }) => (
                                <StyledRoundedWhiteButton
                                    variant="outlined"
                                    sx={{ borderRadius: '28px', width: 1 }}
                                >
                                    دانلود فرم سفارش ساخت
                                </StyledRoundedWhiteButton>
                            )}
                            {/* {({ loading }) => (
                            <Tooltip title="Download">
                                <IconButton>
                                    {loading ? (
                                        <CircularProgress size={24} color="inherit" />
                                    ) : (
                                        <Iconify icon="eva:cloud-download-fill" />
                                    )}
                                </IconButton>
                            </Tooltip>
                        )} */}
                        </PDFDownloadLink>
                        : null}
                </TableCell>
            </TableRow>
        </TableBody>
    )
}