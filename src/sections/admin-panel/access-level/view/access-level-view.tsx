'use client';

import { Container, Stack, Typography, Box, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, IconButton } from "@mui/material";
import { PageTitle } from "../../page-title";
import { SecondaryButton } from "src/components/styles/buttons/secondary";
import AccessLevel from "../../access-level";
import Scrollbar from "src/components/scrollbar";
import Label from "src/components/label";
import SvgColor from "src/components/svg-color";
import Iconify from "src/components/iconify";
import { useBoolean } from "src/hooks/use-boolean";
import _, { set } from "lodash";
import { IAdmin } from "src/types/admin";
import { endpoints, server_axios } from "src/utils/axios";
import { useGetAdmin, useGetAdmins } from "src/api/admin";
import { adminRoleTranslate } from "src/utils/admin-role";
import { AccessLevelNewEditView } from "../access-level-new-edit-view";
import { useEffect, useState } from "react";
import { DialogWithButton } from "src/components/custom-dialog";
import { AccessLevelTableRow } from "../access-level-table-row";

export default function AccessLevelview() {
    const [id, setId] = useState<number>();
    // const [admin, setAdmin] = useState<IAdmin>();

    const { admins } = useGetAdmins();

    const adminDialog = useBoolean();
    // const warningDialog = useBoolean();

    // const { admins } = useGetAdmins();
    const { admin, adminLoading } = useGetAdmin(id);

    // useEffect(() => {
    //     if (admin)
    //         server_axios.get(endpoints.admin.one(id))
    //             .then(({ data }) => setAdmin(data))
    // }, [id])


    return (
        <Box>

            <DialogWithButton dialog={adminDialog} fullWith={false} width={960}>
                <AccessLevelNewEditView adminDialog={adminDialog} currentData={id ? admin : undefined} />
            </DialogWithButton>

            <PageTitle icon="/assets/icons/admin-panel/home-01.svg" title="مدیریت دسترسی ها" />
            {/* <AccessLevelListView
                onAddAdmin={() => {
                    setId(undefined)
                    adminDialog.onTrue()
                }}
                onEditRow={(id: number) => {
                    setId(id)
                    adminDialog.onTrue();
                }}
            /> */}

            <Container sx={{ pl: '20px!important', ml: '0px!important' }}>
                <Box>
                    <Box sx={{
                        bgcolor: 'white',
                        borderRadius: '16px',
                        border: '1px solid #E0E0E0',
                        p: '24px',
                        boxShadow: '2px 2px 8px 0px #0000001A'
                    }}>
                        <Stack
                            direction={'row'}
                            sx={{
                                mb: 3,
                                pb: 2,
                                borderBottom: (theme) => `solid 1px ${theme.palette.divider}`
                            }}
                            justifyContent={"space-between"}
                        >
                            <Typography variant="h4" fontFamily={'peyda-bold'}>سطح دسترسی ها</Typography>

                            <SecondaryButton size="small" variant="outlined">
                                جزئیات بیشتر
                                <SvgColor src="/assets/icons/arrow/arrow-narrow-left.svg" sx={{ width: 16, height: 16, ml: 1 }} />
                            </SecondaryButton>
                        </Stack>
                        <AccessLevel />
                    </Box>
                </Box>
                <Box sx={{ mt: 3, display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="h5" fontFamily={'peyda-bold'}>لیست ادمین ها</Typography>
                    <SecondaryButton size="small" variant="outlined" sx={{ py: 0, px: 1, pr: 1.5 }} onClick={() => {
                        setId(undefined)
                        adminDialog.onTrue()
                    }}>
                        <Iconify icon="eva:plus-fill" width={16} height={16} sx={{ mr: 0.75 }} />
                        ادمین جدید
                    </SecondaryButton>
                </Box>
                <Box>
                    <TableContainer sx={{ overflow: 'unset', mt: 2, boxShadow: '2px 2px 8px 0px #0000001A', borderRadius: '12px', }}>
                        <Scrollbar>
                            <Table sx={{ minWidth: 960 }}>
                                <TableHead>
                                    <TableRow>
                                        <TableCell width={40} sx={{ borderTopLeftRadius: '12px' }}></TableCell>

                                        <TableCell>نام و نام خانوادگی</TableCell>

                                        <TableCell>سطح دسترسی</TableCell>

                                        <TableCell>نام کاربری</TableCell>

                                        <TableCell>رمز ورود</TableCell>

                                        <TableCell>شماره موبایل</TableCell>

                                        <TableCell sx={{ borderTopRightRadius: '12px' }}></TableCell>
                                    </TableRow>
                                </TableHead>

                                <TableBody>
                                    {admins.map((row, index) => (
                                        <AccessLevelTableRow
                                            row={row}
                                            index={index}
                                            length={admins.length}
                                            key={index}
                                            onEditRow={() => {
                                                setId(row.id)
                                                adminDialog.onTrue();
                                            }}
                                            onDeleteRow={() => {
                                            }}
                                        />
                                    ))}
                                </TableBody>
                            </Table>
                        </Scrollbar>
                    </TableContainer>
                </Box>
            </Container>
        </Box>
    )
}