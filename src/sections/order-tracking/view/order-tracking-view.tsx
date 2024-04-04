"use client";

import { LoadingButton } from "@mui/lab";
import { Box, Grid, InputAdornment, Stack, Table, TableBody, TextField, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { DialogWithButton } from "src/components/custom-dialog";
import FormProvider, { RHFRadioGroupTitleText } from "src/components/hook-form";
import Iconify from "src/components/iconify";
import Image from "src/components/image";
import Label from "src/components/label";
import { BlueNotification, YellowNotification } from "src/components/notification";
import Scrollbar from "src/components/scrollbar";
import { StyledRoundedWhiteButton } from "src/components/styles/props/rounded-white-button";
import { TableHeadCustom } from "src/components/table";
import { useBoolean } from "src/hooks/use-boolean";
import CartTableRow from "src/sections/cart/cart-table-row";
import { CartTableHead } from "src/sections/cart/view/cart-dialog-view";

export default function OrderTrackingView() {

    const orderRejectingDialog = useBoolean();
    const cartDialog = useBoolean();

    const methods = useForm({
        // resolver: yupResolver(NewAddressSchema),
        defaultValues: {},
    });

    return (
        <Box>

            <DialogWithButton dialog={cartDialog} fullWith={true} title="سبد خرید">
                <Box sx={{ p: 4, bgcolor: 'white', borderRadius: '16px' }}>
                    <Typography variant="h4" sx={{ width: 1, pb: 2, fontFamily: 'peyda-bold', borderBottom: '1px solid #D1D1D1' }}>
                        سبد خرید
                    </Typography>
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
                    <Stack sx={{ mt: 2 }} direction={'row'} spacing={1} justifyContent={'end'}>
                        <StyledRoundedWhiteButton variant='outlined' sx={{ px: 4 }}>انصراف</StyledRoundedWhiteButton>
                        <LoadingButton variant='contained' sx={{ borderRadius: '24px', px: 4 }} >تایید</LoadingButton>
                    </Stack>
                </Box>
            </DialogWithButton>


            <DialogWithButton dialog={orderRejectingDialog} fullWith={true} title="جزئیات رد سفارش">
                <Box sx={{ p: 4, bgcolor: 'white', borderRadius: '16px' }}>
                    <Typography variant="h4" sx={{ width: 1, pb: 2, fontFamily: 'peyda-bold', borderBottom: '1px solid #D1D1D1' }}>
                        لیست کالاهای «آماده» ناموجود
                    </Typography>
                    <Box>
                        <YellowNotification title="لیست کالاهای «آماده» ناموجود" sx={{ my: 3 }}>
                            این کالاها در سبد خرید شما ناموجود هستند!
                        </YellowNotification>

                        {[...Array(2)].map((data, index: number) => (
                            <Box key={index} sx={{ mb: 2 }}>
                                <Stack direction={'row'} sx={{ pb: 1 }} spacing={2}>
                                    <Typography variant='h6' sx={{ pt: 1 }}>
                                        درب کابینتی - P60
                                    </Typography>
                                    <StyledRoundedWhiteButton variant="outlined">
                                        مشاهده تاریچه
                                    </StyledRoundedWhiteButton>
                                </Stack>
                                <Box>
                                    <Scrollbar sx={{ maxHeight: 680 }}>
                                        <Table size={'medium'} sx={{ minWidth: 780 }}>
                                            <TableHeadCustom
                                                sx={{
                                                    backgroundColor: '#F2F2F2'
                                                }}
                                                headLabel={CartTableHead}
                                            />
                                            <TableBody>
                                                {[...Array(1)].map((data, index: number) => (
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
                                </Box>
                            </Box>
                        ))}
                        <BlueNotification sx={{ mb: 3 }}>
                            برای ثبت تغییرات کالاهای ناموجود،یکی از گزینه‌های زیر را انتخاب کنید و سپس بر روی دکمه ثبت کلیک کنید.
                        </BlueNotification>
                        <FormProvider methods={methods}>
                            <RHFRadioGroupTitleText
                                row
                                name="addressType"
                                options={[
                                    {
                                        label: 'حذف کالاهای ناموجود از سبد خرید',
                                        text: 'کالاهایی که فعلا در انبار کارانو موجود نیستند، از سبد خرید شما حذف شده و پس از پرداخت بهای کالاهای باقیمانده، آن‌هارا تحویل خواهید گرفت.',
                                        value: '1'
                                    },
                                    {
                                        label: 'تحویل همه محصولات با زمان بیشتر',
                                        text: 'با انتخاب این گزینه شما بهای تمام کالاهای مورد نظر را باید پرداخت ‌کنید و برای تحویل آن‌ها زمان بیشتری را منتظر خواهید ‌ماند تا کالاهای ناموجود توسط کارانو، موجود شوند.',
                                        value: '2'
                                    },
                                    {
                                        label: 'انصراف از خرید',
                                        value: '3'
                                    },
                                ]}
                                sx={{ width: '100%' }}
                            />
                        </FormProvider>
                    </Box>
                    <Stack sx={{ mt: 2 }} direction={'row'} spacing={1} justifyContent={'end'}>
                        <StyledRoundedWhiteButton variant='outlined' sx={{ px: 4 }}>انصراف</StyledRoundedWhiteButton>
                        <LoadingButton variant='contained' sx={{ borderRadius: '24px', px: 4 }} >تایید</LoadingButton>
                    </Stack>
                </Box>
            </DialogWithButton>




            <Stack spacing={4}>
                <BlueNotification title='مهلت پرداخت'>
                    ما تنها برای ۴۸ ساعت می‌توانیم پیش‌فاکتورتان را فعال نگه داریم. در صورت عدم‌پرداخت، ناچار به بررسی مجدد سفارش‌تان هستیم.
                </BlueNotification>
                <TextField
                    placeholder="جست و جو"
                    variant="outlined"
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="end" sx={{ cursor: 'pointer', paddingRight: '16px' }}>
                                <Iconify icon={'material-symbols:search'} />
                            </InputAdornment>
                        ),
                        sx: {
                            borderRadius: '24px'
                        }
                    }}
                />
                <Box sx={{ bgcolor: '#F8F8F8', borderRadius: '16px', border: '1px solid #D1D1D1', padding: 4 }}>
                    <Stack direction={'row'} justifyContent={'space-between'} sx={{ borderBottom: '1px solid #D1D1D1', pb: 2 }}>
                        <Label color="error" fontFamily={'peyda-bold'}>وضعیت: رد شده</Label>
                        <StyledRoundedWhiteButton
                            variant="outlined"
                            onClick={() => { orderRejectingDialog.onTrue() }}
                        >
                            مشاهده جزئیات
                            <Iconify icon={'solar:arrow-left-linear'} sx={{ ml: 1 }} />
                        </StyledRoundedWhiteButton>
                    </Stack>
                    <Stack direction={'row'} justifyContent={'space-between'} sx={{ pt: 2 }}>
                        <Stack spacing={2} sx={{ width: 0.5 }}>
                            <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                                <Typography fontFamily={'peyda-bold'} sx={{ pr: 1 }}>شماره سفارش:</Typography>
                                <Typography fontFamily={'peyda-medium'}>
                                    15558476
                                </Typography>
                            </Box>
                            <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                                <Typography fontFamily={'peyda-bold'} sx={{ pr: 1 }}>
                                    تاریخ ثبت سفارش:
                                </Typography>
                                <Typography fontFamily={'peyda-medium'}>
                                    1402/02/01
                                </Typography>
                            </Box>
                        </Stack>
                        <Stack spacing={2} sx={{ width: 0.5 }}>
                            <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                                <Typography fontFamily={'peyda-bold'} sx={{ pr: 1 }}>
                                    تعداد کالا:
                                </Typography>
                                <Typography fontFamily={'peyda-medium'}>
                                    59
                                </Typography>
                            </Box>
                            <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                                <Typography fontFamily={'peyda-bold'} sx={{ pr: 1 }}>
                                    تاریخ تحویل:
                                </Typography>
                                <Typography fontFamily={'peyda-medium'}>
                                    1402/02/01
                                </Typography>
                            </Box>
                        </Stack>
                    </Stack>
                </Box>
                <Box sx={{ bgcolor: '#F8F8F8', borderRadius: '16px', border: '1px solid #D1D1D1', padding: 4 }}>
                    <Stack direction={'row'} justifyContent={'space-between'} sx={{ borderBottom: '1px solid #D1D1D1', pb: 2 }}>
                        <Label color="info" fontFamily={'peyda-bold'}>
                            وضعیت: درحال بررسی
                        </Label>
                        <StyledRoundedWhiteButton
                            onClick={() => { cartDialog.onTrue() }}
                            variant="outlined"
                        >
                            مشاهده سبد خرید
                            <Iconify icon={'solar:arrow-left-linear'} sx={{ ml: 1 }} />
                        </StyledRoundedWhiteButton>
                    </Stack>
                    <Stack direction={'row'} justifyContent={'space-between'} sx={{ pt: 2 }}>
                        <Stack spacing={2} sx={{ width: 0.5 }}>
                            <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                                <Typography fontFamily={'peyda-bold'} sx={{ pr: 1 }}>شماره سفارش:</Typography>
                                <Typography fontFamily={'peyda-medium'}>
                                    15558476
                                </Typography>
                            </Box>
                            <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                                <Typography fontFamily={'peyda-bold'} sx={{ pr: 1 }}>
                                    تاریخ ثبت سفارش:
                                </Typography>
                                <Typography fontFamily={'peyda-medium'}>
                                    1402/02/01
                                </Typography>
                            </Box>
                        </Stack>
                        <Stack spacing={2} sx={{ width: 0.5 }}>
                            <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                                <Typography fontFamily={'peyda-bold'} sx={{ pr: 1 }}>
                                    تعداد کالا:
                                </Typography>
                                <Typography fontFamily={'peyda-medium'}>
                                    59
                                </Typography>
                            </Box>
                            <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                                <Typography fontFamily={'peyda-bold'} sx={{ pr: 1 }}>
                                    تاریخ تحویل:
                                </Typography>
                                <Typography fontFamily={'peyda-medium'}>
                                    1402/02/01
                                </Typography>
                            </Box>
                        </Stack>
                    </Stack>
                </Box>
                <Box sx={{ bgcolor: '#F8F8F8', borderRadius: '16px', border: '1px solid #D1D1D1', padding: 4 }}>
                    <Stack direction={'row'} justifyContent={'space-between'} sx={{ borderBottom: '1px solid #D1D1D1', pb: 2 }}>
                        <Label color="success" fontFamily={'peyda-bold'}>وضعیت: تایید شده</Label>
                        <StyledRoundedWhiteButton
                            variant="outlined">
                            مشاهده پیش فاکتور
                            <Iconify icon={'solar:arrow-left-linear'} sx={{ ml: 1 }} />
                        </StyledRoundedWhiteButton>
                    </Stack>
                    <Stack direction={'row'} justifyContent={'space-between'} sx={{ pt: 2 }}>
                        <Stack spacing={2} sx={{ width: 0.5 }}>
                            <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                                <Typography fontFamily={'peyda-bold'} sx={{ pr: 1 }}>شماره سفارش:</Typography>
                                <Typography fontFamily={'peyda-medium'}>
                                    15558476
                                </Typography>
                            </Box>
                            <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                                <Typography fontFamily={'peyda-bold'} sx={{ pr: 1 }}>
                                    تاریخ ثبت سفارش:
                                </Typography>
                                <Typography fontFamily={'peyda-medium'}>
                                    1402/02/01
                                </Typography>
                            </Box>
                        </Stack>
                        <Stack spacing={2} sx={{ width: 0.5 }}>
                            <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                                <Typography fontFamily={'peyda-bold'} sx={{ pr: 1 }}>
                                    تعداد کالا:
                                </Typography>
                                <Typography fontFamily={'peyda-medium'}>
                                    59
                                </Typography>
                            </Box>
                            <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                                <Typography fontFamily={'peyda-bold'} sx={{ pr: 1 }}>
                                    تاریخ تحویل:
                                </Typography>
                                <Typography fontFamily={'peyda-medium'}>
                                    1402/02/01
                                </Typography>
                            </Box>
                        </Stack>
                    </Stack>
                </Box>
            </Stack>
        </Box>
    )
}