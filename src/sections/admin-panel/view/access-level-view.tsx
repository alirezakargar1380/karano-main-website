'use client'

import { Container, Grid, Stack, Typography, Box, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, IconButton } from "@mui/material";
import { PageTitle } from "../page-title";
import { AdminBreadcrumbs } from "src/components/custom-breadcrumbs";
import { paths } from "src/routes/paths";
import { StyledRoundedWhiteButton } from "src/components/styles/props/rounded-white-button";
import AccessLevel from "../access-level";
import Scrollbar from "src/components/scrollbar";
import Label from "src/components/label";
import { LoadingButton } from "@mui/lab";
import SvgColor from "src/components/svg-color";

export default function AccessLevelview() {
    return (
        <Container>
            <AdminBreadcrumbs
                links={[
                    { name: 'پنل کاربری ادمین', href: paths.admin_dashboard.root },
                    { name: 'مدیریت دسترسی ها' },
                ]}
                sx={{
                    mb: { xs: 3, md: 5 },
                }}
            />
            <PageTitle icon="/assets/icons/admin-panel/home-01.svg" title="مدیریت دسترسی ها" />
            <Box>
                <Box sx={{ mt: 3, bgcolor: 'white', borderRadius: '16px', border: '1px solid #E0E0E0', p: 2 }}>
                    <Stack
                        direction={'row'}
                        sx={{
                            mb: 3,
                            py: 2,
                            borderBottom: (theme) => `solid 1px ${theme.palette.divider}`
                        }}
                        justifyContent={"space-between"}
                    >
                        <Typography variant="h4" fontFamily={'peyda-bold'}>سطح دسترسی ها</Typography>

                        <StyledRoundedWhiteButton variant="outlined" sx={{ py: 0, px: 3 }}>جزئیات بیشتر</StyledRoundedWhiteButton>
                    </Stack>
                    <AccessLevel />
                </Box>
            </Box>
            <Box sx={{ mt: 3 }}>
                <Typography variant="h5" fontFamily={'peyda-bold'}>لیست ادمین ها</Typography>
            </Box>
            <Box>
                <TableContainer sx={{ overflow: 'unset', mt: 2 }}>
                    <Scrollbar>
                        <Table sx={{ minWidth: 960 }}>
                            <TableHead>
                                <TableRow>
                                    <TableCell width={40}></TableCell>

                                    <TableCell sx={{ typography: 'subtitle2' }}>نام و نام خانوادگی</TableCell>

                                    <TableCell>سطح دسترسی</TableCell>

                                    <TableCell>نام کاربری</TableCell>

                                    <TableCell>رمز عبور</TableCell>

                                    <TableCell>شماره موبایل</TableCell>

                                    <TableCell></TableCell>
                                </TableRow>
                            </TableHead>

                            <TableBody>
                                {[...Array(5)].map((row, index) => (
                                    <TableRow key={index}>
                                        <TableCell>{index + 1}</TableCell>

                                        <TableCell>عباس محمودی</TableCell>

                                        <TableCell>
                                            <Label variant="filled" color="info">
                                                مدیر فروش
                                            </Label>
                                        </TableCell>

                                        <TableCell>test_user</TableCell>
                                        <TableCell>55977418</TableCell>
                                        <TableCell>093764899999</TableCell>

                                        <TableCell>
                                            <Stack direction={'row'}>
                                                <IconButton color={'default'} onClick={() => { }}>
                                                    <SvgColor src='/assets/icons/cart/edit.svg' sx={{ width: 16, height: 16 }} />
                                                </IconButton>
                                                <IconButton color={'default'}>
                                                    <SvgColor src='/assets/icons/cart/trash.svg' sx={{ width: 16, height: 16 }} />
                                                </IconButton>
                                            </Stack>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </Scrollbar>
                </TableContainer>

            </Box>
        </Container>

    )
}