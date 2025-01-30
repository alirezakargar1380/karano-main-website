import { Container, Stack, Typography, Box, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, IconButton } from "@mui/material";
import { PageTitle } from "../../page-title";
import { SecondaryButton } from "src/components/styles/buttons/secondary";
import AccessLevel from "../../access-level";
import Scrollbar from "src/components/scrollbar";
import Label from "src/components/label";
import SvgColor from "src/components/svg-color";
import Iconify from "src/components/iconify";
import { useBoolean } from "src/hooks/use-boolean";
import _ from "lodash";
import { IAdmin } from "src/types/admin";
import { endpoints, server_axios } from "src/utils/axios";
import { useGetAdmins } from "src/api/admin";
import { adminRoleTranslate } from "src/utils/admin-role";
import { AccessLevelNewEditView } from "../access-level-new-edit-view";
import { AccessLevelTableRow } from "../access-level-table-row";

export function AccessLevelListView({
    onEditRow,
    onAddAdmin
}: {
    onAddAdmin: () => void
    onEditRow: (id: number) => void
}) {
    const { admins } = useGetAdmins();

    // return (
        

    // )
}