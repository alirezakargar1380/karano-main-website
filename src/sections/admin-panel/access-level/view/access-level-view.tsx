'use client'

import { Container, Grid, Stack, Typography, Box, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, IconButton, MenuItem, Checkbox, ListItemText } from "@mui/material";
import { PageTitle } from "../../page-title";
import { AdminBreadcrumbs } from "src/components/custom-breadcrumbs";
import { paths } from "src/routes/paths";
import { StyledRoundedWhiteButton } from "src/components/styles/props/rounded-white-button";
import AccessLevel from "../../access-level";
import Scrollbar from "src/components/scrollbar";
import Label from "src/components/label";
import { LoadingButton } from "@mui/lab";
import SvgColor from "src/components/svg-color";
import Iconify from "src/components/iconify";
import { useBoolean } from "src/hooks/use-boolean";
import { DialogWithButton } from "src/components/custom-dialog";
import FormProvider, { RHFSelect, RHFTitleTextField } from "src/components/hook-form";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from "yup";
import _ from "lodash";
import { EAdminRole } from "src/types/admin";
import { endpoints, server_axios } from "src/utils/axios";
import { useGetAdmins } from "src/api/admin";

export default function AccessLevelview() {
    const adminDialog = useBoolean();

    const { admins } = useGetAdmins();

    // const FormSchema = Yup.object().shape({
    //     fullName: Yup.string()
    //         .required('Full name is required')
    //         .min(6, 'Mininum 6 characters')
    //         .max(32, 'Maximum 32 characters')
    // });

    const defaultValues = {
        fullName: '',
        username: '',
        password: '',
        phone: '',
        role: EAdminRole.delivery,
    }

    const methods = useForm({
        // resolver: yupResolver(FormSchema),
        defaultValues,
    });

    const {
        watch,
        reset,
        control,
        setValue,
        handleSubmit,
        formState: { isSubmitting },
    } = methods;

    const values = watch();

    const onSubmit = handleSubmit(async (data) => {
        try {
            console.log(data)
            server_axios.post(endpoints.auth.admin.create, data);
            adminDialog.onFalse();
            console.info('DATA', data);
        } catch (error) {
            console.error(error);
        }
    });

    return (
        <>
            <DialogWithButton dialog={adminDialog} fullWith={false}>
                <Box p={2}>
                    <FormProvider methods={methods} onSubmit={onSubmit}>
                        <Typography variant="h4" fontFamily={'peyda-bold'} sx={{ borderBottom: (theme) => `solid 1px ${theme.palette.divider}`, pb: 2 }}>
                            افزودن ادمین جدید
                        </Typography>

                        <Typography variant="body2" fontFamily={'peyda-bold'} py={3} color={'text.secondary'}>
                            اطلاعات ادمین مورد نظر خود را وارد کنید.
                        </Typography>

                        <Box
                            columnGap={2}
                            rowGap={3}
                            display="grid"
                            gridTemplateColumns={{
                                xs: 'repeat(1, 1fr)',
                                md: 'repeat(2, 1fr)',
                            }}
                        >
                            <RHFTitleTextField custom_label="نام و نام خانوادگی" name="fullName" placeholder="افزودن محتوا" />
                            <Box>
                                <Typography fontFamily={'peyda-bold'} sx={{ pb: 0.5, pl: 0.75 }}>
                                    سطح دسترسی
                                </Typography>
                                <RHFSelect name="role" placeholder="افزودن محتوا">
                                    {_.values(EAdminRole).map((value, index) => (
                                        <MenuItem value={value} key={index}>
                                            <Checkbox
                                                checked={(values.role === value)}
                                            />
                                            <ListItemText primary={
                                                (value === EAdminRole.adminstrator && "سوپر ادمین") || 
                                                (value === EAdminRole.delivery && "مدیر ارسال") || 
                                                (value === EAdminRole.production && "مدیر ارسال") || 
                                                (value === EAdminRole.sale && "مدیر فروش") || 
                                                (value === EAdminRole.storage && "مدیر انبار") || 
                                                ""
                                            }
                                            />
                                        </MenuItem>
                                    ))}

                                </RHFSelect>
                            </Box>
                            <RHFTitleTextField custom_label="نام کاربری" name="username" placeholder="افزودن محتوا" />
                            <RHFTitleTextField custom_label="پسورد" name="password" placeholder="افزودن محتوا" />
                            <RHFTitleTextField custom_label="شماره تماس" name="phone" placeholder="افزودن محتوا" />
                        </Box>

                        <Stack direction={'row'} justifyContent={'end'} mt={2}>
                            <Stack direction={'row'} spacing={2}>
                                <StyledRoundedWhiteButton variant='outlined' sx={{ px: 2 }} onClick={adminDialog.onFalse}>
                                    انصراف
                                </StyledRoundedWhiteButton>
                                <LoadingButton
                                    variant='contained'
                                    sx={{ borderRadius: '24px', px: 3 }}
                                    type="submit"
                                >
                                    افزودن
                                </LoadingButton>
                            </Stack>
                        </Stack>

                    </FormProvider>
                </Box>
            </DialogWithButton>
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
                <Box sx={{ mt: 3, display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="h5" fontFamily={'peyda-bold'}>لیست ادمین ها</Typography>
                    <StyledRoundedWhiteButton variant="outlined" sx={{ py: 0, px: 3 }} onClick={() => adminDialog.onTrue()}>
                        <Iconify icon="eva:plus-fill" width={14} height={14} sx={{ mr: 1 }} />
                        افزودن ادمین
                    </StyledRoundedWhiteButton>
                </Box>
                <Box>
                    <TableContainer sx={{ overflow: 'unset', mt: 2 }}>
                        <Scrollbar>
                            <Table sx={{ minWidth: 960, bgcolor: 'white' }}>
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
                                    {admins.map((row, index) => (
                                        <TableRow key={index}>
                                            <TableCell>{index + 1}</TableCell>

                                            <TableCell>{row.fullName}</TableCell>

                                            <TableCell>
                                                <Label variant="filled" color="info">
                                                    {row.role}
                                                </Label>
                                            </TableCell>

                                            <TableCell>{row.username}</TableCell>
                                            <TableCell>**********</TableCell>
                                            <TableCell>{row.phone}</TableCell>

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
        </>
    )
}