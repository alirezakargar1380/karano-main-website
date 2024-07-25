import { MenuItem, Select, TableBody, TableCell, TableRow, TextField } from "@mui/material";
import { PDFDownloadLink } from "@react-pdf/renderer";
import Label from "src/components/label";
import ProductionPDF from "./production-pdf";
import { _invoices } from "src/_mock";
import { StyledRoundedWhiteButton } from "src/components/styles/props/rounded-white-button";
import { useCallback, useEffect, useState } from "react";
import { IOrderItem, OrderStatus } from "src/types/order";
import { endpoints, server_axios } from "src/utils/axios";
import { IUserTypes } from "src/types/user";

interface Props {
    row: IOrderItem
}

export function ProductionTableRow({ row }: Props) {

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
            <TableRow>
                <TableCell>{row.id}</TableCell>

                <TableCell>{row.order_number}</TableCell>

                <TableCell>
                    <Select fullWidth value={value} size="small"
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
                    {/* <Select >

                    </Select> */}
                </TableCell>

                <TableCell>{(row.user.user_type === IUserTypes.genuine) ? row.user.first_name + " " + row.user.last_name : row.user.company_name}</TableCell>

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