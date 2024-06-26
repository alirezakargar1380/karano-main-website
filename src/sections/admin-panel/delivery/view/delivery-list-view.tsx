
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
import { StyledRoundedWhiteButton } from "src/components/styles/props/rounded-white-button";

export default function DeliveryListView() {
    const settings = useSettingsContext();

    const router = useRouter();

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

    return (
        <Container maxWidth={settings.themeStretch ? false : 'lg'}>
            <AdminBreadcrumbs
                links={[
                    { name: 'پنل کاربری ادمین', href: paths.admin_dashboard.root },
                    { name: 'مدیریت فروش' },
                ]}
                sx={{
                    mb: { xs: 3, md: 5 },
                }}
            />
            <Box>
                <PageTitle title="مدیریت ارسال" icon="/assets/icons/admin-panel/send-03.svg" />
            </Box>
            <FormProvider methods={methods} onSubmit={onSubmit}>
                <Stack sx={{ width: 1 }} direction={'row'} spacing={2}>
                    <Typography variant="h5" fontFamily={'peyda-bold'}>لیست سفارش</Typography>
                    <RHFMultiSelect
                        name="dsdf"
                        label="وضعیت تولید"
                        value="1"
                        options={[
                            {
                                label: '1',
                                value: '1'
                            },
                            {
                                label: '2',
                                value: '2'
                            },
                            {
                                label: '3',
                                value: '4'
                            }
                        ]}
                        checkbox
                        icon="/assets/icons/admin-panel/flag-01.svg"
                        sx={{
                            bgcolor: 'white',
                            borderRadius: '24px!important',
                            py: '0px !important',
                            '& .MuiOutlinedInput-input': {
                                py: 1,
                            },
                            '& .MuiInputBase-root': {
                                borderRadius: '24px!important',
                            },
                        }}
                    />
                    <RHFMultiSelect
                        name="dsdf"
                        label="تاریخ"
                        value="1"
                        options={[
                            {
                                label: 'فردا',
                                value: '1'
                            },
                            {
                                label: 'دو روز آینده',
                                value: '2'
                            },
                            {
                                label: 'یک هفته آینده',
                                value: '4'
                            }
                        ]}
                        icon="/assets/icons/admin-panel/calandar.svg"
                        sx={{
                            bgcolor: 'white',
                            borderRadius: '24px!important',
                            py: '0px !important',
                            '& .MuiOutlinedInput-input': {
                                py: 1,
                            },
                            '& .MuiInputBase-root': {
                                borderRadius: '24px!important',
                            },
                        }}
                    />
                </Stack>
            </FormProvider>

            <Box>
                <TableContainer sx={{ overflow: 'unset', mt: 2 }}>
                    <Scrollbar>
                        <Table sx={{ minWidth: 960, bgcolor: 'white' }}>
                            <TableHead>
                                <TableRow>
                                    <TableCell width={40}></TableCell>
                                    <TableCell sx={{ fontFamily: 'peyda-bold!important' }}>نام مشتری</TableCell>
                                    <TableCell sx={{ fontFamily: 'peyda-bold!important' }}>کد سفارش</TableCell>

                                    <TableCell sx={{ fontFamily: 'peyda-bold!important' }}>وضعیت سفارش</TableCell>



                                    <TableCell sx={{ fontFamily: 'peyda-bold!important' }}>تاریخ سفارش</TableCell>
                                    <TableCell sx={{ fontFamily: 'peyda-bold!important' }}>تاریخ تحویل</TableCell>

                                    <TableCell width={200}></TableCell>
                                </TableRow>
                            </TableHead>

                            <TableBody>
                                {[...Array(5)].map((row, index) => (
                                    <TableRow key={index}>
                                        <TableCell>{index + 1}</TableCell>

                                        <TableCell>علیرضا کارگر</TableCell>
                                        <TableCell>{23335}</TableCell>

                                        <TableCell>
                                            {(index !== 2) ? (
                                                <Label variant="outlined" sx={{ color: "#005878", borderColor: "#0B7BA7" }}>
                                                    در حال بررسی
                                                </Label>
                                            ) : (
                                                <Label variant="outlined" sx={{ color: "#096E35", borderColor: "#149B4A" }}>
                                                    آماده ارسال
                                                </Label>
                                            )}
                                        </TableCell>



                                        <TableCell>1409/01/01</TableCell>
                                        <TableCell>1409/01/01</TableCell>

                                        <TableCell>
                                            <LoadingButton
                                                variant="contained"
                                                sx={{ borderRadius: '28px', width: 1 }}
                                            // onClick={() => router.push(paths.admin_dashboard.saleManagement.details(1))}
                                            >
                                                مشاهده جزئیات
                                            </LoadingButton>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </Scrollbar>
                </TableContainer>
            </Box>
        </Container >
    )
}