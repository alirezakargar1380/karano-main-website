'use client';

import { Box, Container, Grid, IconButton, Stack, Table, TableBody, Typography } from "@mui/material";
import { CheckCartCard } from "src/components/cart";
import { HowToSendDialog } from "src/components/dialogs";
import Image from "src/components/image";
import { BlueNotification } from "src/components/notification";
import Scrollbar from "src/components/scrollbar";
import { StyledRoundedWhiteButton } from "src/components/styles/props/rounded-white-button";
import SvgColor from "src/components/svg-color";
import { TableHeadCustom } from "src/components/table";
import { useBoolean } from "src/hooks/use-boolean";
import CartTableRow from "src/sections/cart/cart-table-row";
import { CartTableHead } from "src/sections/cart/view/cart-dialog-view";

export default function ShoppingCartView() {
    const howToSendDialog = useBoolean();
    return (
        <Container maxWidth={'xl'}>
            <HowToSendDialog dialog={howToSendDialog} />
            <Stack direction={'row'} justifyContent={'space-between'} sx={{ borderBottom: '1px solid #D1D1D1' }}>
                <Typography variant="h3" fontFamily={'peyda-bold'} sx={{ py: 2 }}>سبد خرید</Typography>
                <Stack sx={{ py: 2 }} direction={'row'}>
                    <IconButton>
                        <SvgColor src="/assets/icons/cart/factor-download.svg" />
                    </IconButton>
                    <IconButton>
                        <SvgColor src="/assets/icons/cart/more-option.svg" />
                    </IconButton>
                </Stack>
            </Stack>
            <Box sx={{ pt: 4 }}>
                <BlueNotification>
                    بعد از بررسی محصولاتی که به صورت سفارشی ثبت شده‌اند، می‌توانید پیش‌فاکتور خود را مشاهده کنید.
                </BlueNotification>
            </Box>
            <Box>
                <Grid container spacing={2} sx={{ py: 4 }}>
                    <Grid item sm={2} />
                    <Grid item sm={10}>
                        <Stack direction={'row'} spacing={2}>
                            <Typography fontFamily={'peyda-bold'} sx={{ pt: 1 }}>درب کابینتی - P60</Typography>
                            <StyledRoundedWhiteButton variant="outlined">مشاهده تاریخچه</StyledRoundedWhiteButton>
                        </Stack>
                    </Grid>
                    <Grid item sm={2} sx={{ pt: 2 }}>
                        <Image src='/img/product/product.png' sx={{ border: '1px solid #D1D1D1', borderRadius: '8px' }} />
                    </Grid>
                    <Grid item sm={10} sx={{ pt: 2 }}>
                        <Scrollbar sx={{ maxHeight: 680 }}>
                            <Table size={'medium'} sx={{ minWidth: 780 }}>
                                <TableHeadCustom
                                    sx={{
                                        backgroundColor: '#F2F2F2'
                                    }}
                                    headLabel={CartTableHead}
                                />

                                <TableBody>
                                    {[...Array(4)].map((data, index: number) => (
                                        <CartTableRow
                                            onDeleteRow={() => { }}
                                            onEditRow={() => { }}
                                            key={index}
                                            row={{
                                                quality: 11,
                                                coating: 'غیر جناقی',
                                                dimensions: '210*235',
                                                final_coating: 'روکش خام',
                                                frame_type: 'حجمی',
                                                profile_type: 'درب کابینتی',
                                            }}
                                        />
                                    ))}
                                </TableBody>
                            </Table>
                        </Scrollbar>
                    </Grid>
                </Grid>
                <Grid container spacing={2} sx={{ py: 4 }}>
                    <Grid item sm={2} />
                    <Grid item sm={10}>
                        <Stack direction={'row'} spacing={2}>
                            <Typography fontFamily={'peyda-bold'} sx={{ pt: 1 }}>درب کابینتی - P60</Typography>
                            <StyledRoundedWhiteButton variant="outlined">مشاهده تاریخچه</StyledRoundedWhiteButton>
                        </Stack>
                    </Grid>
                    <Grid item sm={2} sx={{ pt: 2 }}>
                        <Image src='/img/product/product.png' sx={{ border: '1px solid #D1D1D1', borderRadius: '8px' }} />
                    </Grid>
                    <Grid item sm={10} sx={{ pt: 2 }}>
                        <Scrollbar sx={{ maxHeight: 680 }}>
                            <Table size={'medium'} sx={{ minWidth: 780 }}>
                                <TableHeadCustom
                                    sx={{
                                        backgroundColor: '#F2F2F2'
                                    }}
                                    headLabel={CartTableHead}
                                />

                                <TableBody>
                                    {[...Array(4)].map((data, index: number) => (
                                        <CartTableRow
                                            onDeleteRow={() => { }}
                                            onEditRow={() => { }}
                                            key={index}
                                            row={{
                                                quality: 11,
                                                coating: 'غیر جناقی',
                                                dimensions: '210*235',
                                                final_coating: 'روکش خام',
                                                frame_type: 'حجمی',
                                                profile_type: 'درب کابینتی',
                                            }}
                                        />
                                    ))}
                                </TableBody>
                            </Table>
                        </Scrollbar>
                    </Grid>
                </Grid>
            </Box>
            <Box sx={{ py: 4 }}>
                <CheckCartCard dialog={howToSendDialog}>
                    نتیجه بررسی سفارش شما بعد  از ارسال به کارشناسان کارانو، از طریق «پیام کوتاه» اعلام و پیش‌فاکتور صادر می‌شود.
                    همچنین همواره می‌توانید برای پیگیری وضعیت سفارش خود، به صفحه «پیگیری سفارش» در بالای صفحه مراجعه کنید.
                </CheckCartCard>
            </Box>
        </Container>
    )
}