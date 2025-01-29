'use client';

import { Box, Container, Table, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { useSettingsContext } from "src/components/settings";
import { PageTitle } from "../../page-title";
import Scrollbar from "src/components/scrollbar";
import { _invoices } from "src/_mock";
import { ProductionTableRow } from "../production-table-row";
import { useGetProductionOrders } from "src/api/orders";
import Filter from "../../filter";

export default function ProductionListView() {
    const settings = useSettingsContext();

    // const router = useRouter();

    const { orders } = useGetProductionOrders()

    // const schema = Yup.object().shape({
    // });

    // const methods = useForm({
    //     resolver: yupResolver<any>(schema),
    //     defaultValues: {},
    // });

    // const {
    //     reset,
    //     handleSubmit,
    //     watch,
    //     formState: { isSubmitting },
    // } = methods;

    // const values = watch();

    // const onSubmit = handleSubmit(async () => {
    //     try {
    //     } catch (error) {
    //         console.error(error);
    //         reset();
    //     }
    // });

    return (
        <Box>
            <Box>
                <PageTitle title="مدیریت تولید" icon="/assets/icons/admin-panel/loading-01.svg" />
            </Box>
            <Container maxWidth={settings.themeStretch ? false : 'lg'} sx={{ pl: '20px!important', ml: '0px!important' }}>
                <Filter />
                <Box>
                    <TableContainer sx={{ overflow: 'unset', mt: 2, boxShadow: '2px 2px 8px 0px #0000001A', borderRadius: '12px' }}>
                        <Scrollbar>
                            <Table sx={{ minWidth: 960 }}>
                                <TableHead>
                                    <TableRow>
                                        <TableCell width={40} sx={{ borderTopLeftRadius: '12px' }}></TableCell>

                                        <TableCell sx={{ fontFamily: 'peyda-bold!important' }}>کد سفارش</TableCell>

                                        <TableCell sx={{ fontFamily: 'peyda-bold!important' }}>وضعیت سفارش</TableCell>

                                        <TableCell sx={{ fontFamily: 'peyda-bold!important' }}>نام مشتری</TableCell>

                                        <TableCell sx={{ fontFamily: 'peyda-bold!important' }}>تاریخ تحویل</TableCell>

                                        <TableCell width={250} sx={{ borderTopRightRadius: '12px' }}></TableCell>
                                    </TableRow>
                                </TableHead>
                                {orders.map((order, ind) => (
                                    <ProductionTableRow isLast={(ind === orders.length - 1)} key={ind} row={order} />
                                ))}
                            </Table>
                        </Scrollbar>
                    </TableContainer>

                </Box>
            </Container>
        </Box>
    )
}