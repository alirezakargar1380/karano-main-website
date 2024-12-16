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
import { AccessLevelListView } from "./access-level-list-view";
import { useEffect, useState } from "react";
import { DialogWithButton } from "src/components/custom-dialog";

export default function AccessLevelview() {
    const [id, setId] = useState<number>();
    // const [admin, setAdmin] = useState<IAdmin>();

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
            <AccessLevelListView
                onAddAdmin={() => {
                    setId(undefined)
                    adminDialog.onTrue()
                }}
                onEditRow={(id: number) => {
                    setId(id)
                    adminDialog.onTrue();
                }}
            />
        </Box>
    )
}