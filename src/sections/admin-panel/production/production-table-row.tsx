import { Button, MenuItem, Select, TableBody, TableCell, TableRow, TextField } from "@mui/material";
import { BlobProvider, PDFDownloadLink } from "@react-pdf/renderer";
import Label from "src/components/label";
import ProductionPDF from "./production-pdf";
import { _invoices } from "src/_mock";
import { SecondaryButton } from "src/components/styles/buttons/secondary";
import { useCallback, useEffect, useState } from "react";
import { IOrderItem, OrderStatus } from "src/types/order";
import { endpoints, server_axios } from "src/utils/axios";
import { IUserTypes } from "src/types/user";
import SvgColor from "src/components/svg-color";
import { EFrameCore } from "src/types/product";
import { ECoatingTexture } from "src/types/cart";
import { translateCoverEdgeTape } from "src/sections/cart/cart-table-row";

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
                    {(isClient) && (
                        <PDFDownloadLink
                            document={
                                <ProductionPDF
                                    invoice={{
                                        ..._invoices[0],
                                        items: row.order_products.map((op) => {
                                            const data = op.properties.map((p) => {
                                                return {
                                                    id: p.id,
                                                    title: op.product.name,
                                                    code: op.product.code.code,
                                                    cover_type: p?.cover_type?.name || '-',
                                                    coating_type: p?.coating_type || '-',
                                                    frame_type: p?.frame_type?.name || '-',
                                                    profile_type: p?.profile_type?.name || '-',
                                                    raised_rim: p?.raised_rim?.name + p?.raised_rim?.code || '-',
                                                    cover_edge_tape: translateCoverEdgeTape(p?.cover_edge_tape) || '-',
                                                    frame_width: p?.frame_width ? p.frame_width + " سانتی متر" : '-',
                                                    frame_core: p?.frame_core === EFrameCore.mdf && 'ترکیب چوب و ام دی اف'
                                                        || p?.frame_core === EFrameCore.ply && 'پلای وود'
                                                        || '-',
                                                    coating_texture: p?.coating_texture === ECoatingTexture.right_vein && 'بلوط رگه راست' ||
                                                        p?.coating_texture === ECoatingTexture.wavy && 'بلوط موج دار' ||
                                                        '-',
                                                    price: "111",
                                                    total: "598",
                                                    service: "",
                                                    quantity: "69",
                                                    description: p.dimension && p.dimension.length + "x" + p.dimension.width
                                                }
                                            })
                                            return data
                                        })[0]
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