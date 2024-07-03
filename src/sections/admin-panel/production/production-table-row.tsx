import { TableBody, TableCell, TableRow } from "@mui/material";
import { PDFDownloadLink } from "@react-pdf/renderer";
import Label from "src/components/label";
import ProductionPDF from "./production-pdf";
import { _invoices } from "src/_mock";
import { StyledRoundedWhiteButton } from "src/components/styles/props/rounded-white-button";
import { useEffect, useState } from "react";

export function ProductionTableRow() {

    const [isClient, setIsClient] = useState(false)

    useEffect(() => {
        setIsClient(true)
    }, [])

    return (
        <TableBody>
            {[...Array(5)].map((row, index) => (
                <TableRow key={index}>
                    <TableCell>{index + 1}</TableCell>

                    <TableCell>{23335}</TableCell>

                    <TableCell>
                        <Label variant="filled" color="info">
                            در حال بررسی
                        </Label>
                    </TableCell>

                    <TableCell>علیرضا کارگر</TableCell>

                    <TableCell>1409/01/01</TableCell>

                    <TableCell>
                        {isClient ?
                            <PDFDownloadLink
                                document={<ProductionPDF invoice={_invoices[0]} currentStatus={'production'} />}
                                fileName={'131313-559984-as588981.pdf'}
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
            ))}
        </TableBody>
    )
}