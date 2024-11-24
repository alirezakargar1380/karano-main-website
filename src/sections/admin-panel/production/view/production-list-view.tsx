'use client';

import { Box, Container, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { AdminBreadcrumbs } from "src/components/custom-breadcrumbs";
import { useSettingsContext } from "src/components/settings";
import { paths } from "src/routes/paths";
import { PageTitle } from "../../page-title";
import Scrollbar from "src/components/scrollbar";
import Label from "src/components/label";
import { LoadingButton } from "@mui/lab";
import { useRouter } from 'src/routes/hooks';
import FormProvider, { RHFMultiSelect } from "src/components/hook-form";
import { useForm } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from 'yup';
import { SecondaryButton } from "src/components/styles/buttons/secondary";
import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";
import ProductionPDF from "../production-pdf";
import { _invoices } from "src/_mock";
import { ProductionTableRow } from "../production-table-row";
import { useEffect, useState } from "react";
import { useGetProductionOrders } from "src/api/orders";
import { OrderStatus } from "src/types/order";
import Filter from "../../filter";

export default function ProductionListView() {
    const settings = useSettingsContext();

    const router = useRouter();

    const { orders } = useGetProductionOrders()

    const schema = Yup.object().shape({
    });

    const methods = useForm({
        resolver: yupResolver<any>(schema),
        defaultValues: {},
    });

    const {
        reset,
        handleSubmit,
        watch,
        formState: { isSubmitting },
    } = methods;

    const values = watch();

    const onSubmit = handleSubmit(async () => {
        try {
        } catch (error) {
            console.error(error);
            reset();
        }
    });

    const [isClient, setIsClient] = useState(false)

    useEffect(() => {
        setIsClient(true)
    }, [])

    return (
        <Box>
            <Box>
                <PageTitle title="مدیریت تولید" icon="/assets/icons/admin-panel/loading-01.svg" />
            </Box>
            <Container maxWidth={settings.themeStretch ? false : 'lg'} sx={{ pl: '20px!important', ml: '0px!important' }}>
                <Filter />
                <Box>
                    <TableContainer sx={{ overflow: 'unset', mt: 2 }}>
                        <Scrollbar>
                            <Table sx={{ minWidth: 960, bgcolor: 'white' }}>
                                <TableHead>
                                    <TableRow>
                                        <TableCell width={40}></TableCell>

                                        <TableCell sx={{ fontFamily: 'peyda-bold!important' }}>کد سفارش</TableCell>

                                        <TableCell sx={{ fontFamily: 'peyda-bold!important' }}>وضعیت سفارش</TableCell>

                                        <TableCell sx={{ fontFamily: 'peyda-bold!important' }}>نام مشتری</TableCell>

                                        <TableCell sx={{ fontFamily: 'peyda-bold!important' }}>تاریخ تحویل</TableCell>

                                        <TableCell width={250}></TableCell>
                                    </TableRow>
                                </TableHead>
                                {orders.map((order, ind) => (
                                    <ProductionTableRow key={ind} row={order} />
                                ))}
                            </Table>
                        </Scrollbar>
                    </TableContainer>

                </Box>

                {/* {isClient && (
                <PDFViewer width="100%" height="100%" style={{ border: 'none' }}>
                    <ProductionPDF invoice={_invoices[0]} currentStatus={'production'} />
                </PDFViewer>
            )} */}
            </Container>
        </Box>
    )
}