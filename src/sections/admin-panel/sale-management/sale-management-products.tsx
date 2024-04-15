import { Box, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import Scrollbar from "src/components/scrollbar";




export default function SaleManagementProducts() {
    return (
        <Box border={(theme) => `1px solid ${theme.palette.divider}`} bgcolor={'#FFF'} width={1} borderRadius={'16px'}>
            <Stack direction={'column'} p={2} spacing={1.5} borderBottom={(theme) => `1px solid ${theme.palette.divider}`}>
                <Stack direction={'row'}>
                    <Box display={'flex'} width={'50%'}>
                        <Typography variant="h6" fontFamily={'peyda-bold'}>کد سفارش:</Typography>
                        <Typography variant="h6" fontFamily={'peyda-light'} sx={{ pl: 1 }}>
                            123456789
                        </Typography>
                    </Box>
                    <Box display={'flex'} width={'50%'}>
                        <Typography variant="h6" fontFamily={'peyda-bold'}>تعداد کالا :</Typography>
                        <Typography variant="h6" fontFamily={'peyda-light'} sx={{ pl: 1 }}>
                            20
                        </Typography>
                    </Box>
                </Stack>
                <Stack direction={'row'}>
                    <Box display={'flex'} width={'50%'}>
                        <Typography variant="h6" fontFamily={'peyda-bold'}>تاریخ ثب سفارش:</Typography>
                        <Typography variant="h6" fontFamily={'peyda-light'} sx={{ pl: 1 }}>
                            1402/02/01
                        </Typography>
                    </Box>
                    <Box display={'flex'} width={'50%'}>
                        <Typography variant="h6" fontFamily={'peyda-bold'}>
                            نام سفارش دهنده:
                        </Typography>
                        <Typography variant="h6" fontFamily={'peyda-light'} sx={{ pl: 1 }}>
                            لهراسب افروزنده
                        </Typography>
                    </Box>
                </Stack>
            </Stack>
            <SaleManagementProductItem />
        </Box>
    )
}

function SaleManagementProductItem() {
    return (
        <Stack p={3} spacing={2}>
            <Typography fontFamily={'peyda-bold'} variant="h4">
                درب کابینتی p-60
            </Typography>
            <TableContainer sx={{ overflow: 'unset', mt: 5 }}>
                <Scrollbar>
                    <Table sx={{
                        // minWidth: 960 
                    }}>
                        <TableHead>
                            <TableRow>

                                <TableCell sx={{ fontFamily: 'peyda-bold' }}>
                                    نوع پروفیل
                                </TableCell>

                                <TableCell sx={{ fontFamily: 'peyda-bold' }}>
                                    پوشش نهایی
                                </TableCell>

                                <TableCell sx={{ fontFamily: 'peyda-bold' }}>
                                    نوع قاب
                                </TableCell>

                                <TableCell sx={{ fontFamily: 'peyda-bold' }}>
                                    روکش گیری
                                </TableCell>
                                <TableCell sx={{ fontFamily: 'peyda-bold' }}>
                                    ابعاد
                                </TableCell>

                                <TableCell sx={{ fontFamily: 'peyda-bold' }}>
                                    تعداد
                                </TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {[...new Array(1)].map((data, index) => (
                                <TableRow key={index}>

                                    <TableCell>
                                        درب کابینتی
                                    </TableCell>

                                    <TableCell>
                                        روکش خام
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Scrollbar>
            </TableContainer>

        </Stack>
    )
}