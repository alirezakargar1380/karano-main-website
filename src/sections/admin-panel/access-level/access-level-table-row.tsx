import { IconButton, Stack, TableCell, TableRow } from "@mui/material";
import { ConfirmDialog } from "src/components/custom-dialog";
import Label from "src/components/label";
import { PrimaryButton } from "src/components/styles/buttons/primary";
import SvgColor from "src/components/svg-color";
import { useBoolean } from "src/hooks/use-boolean";
import { IAdmin } from "src/types/admin";
import { adminRoleTranslate } from "src/utils/admin-role";


interface Props {
    row: IAdmin;
    index: number;
    length: number;
    onEditRow: VoidFunction;
    onDeleteRow: VoidFunction;
}

export function AccessLevelTableRow({
    row,
    index,
    length,
    onDeleteRow,
    onEditRow,
}: Props) {
    const deleteDialog = useBoolean();

    return (
        <>
            <TableRow
                sx={{
                    ...((index === length - 1) && {
                        borderBottom: 'none'
                    }),
                }}
            >
                <TableCell>{index + 1}</TableCell>

                <TableCell>{row.fullName}</TableCell>

                <TableCell>
                    <Label variant="filled" color="blue">
                        {adminRoleTranslate(row.role)}
                    </Label>
                </TableCell>

                <TableCell>{row.username}</TableCell>
                <TableCell>**********</TableCell>
                <TableCell>{row.phone}</TableCell>

                <TableCell>
                    <Stack direction={'row'} justifyContent={'flex-end'}>
                        <IconButton color={'default'} onClick={() => onEditRow()}>
                            <SvgColor src='/assets/icons/cart/edit.svg' sx={{ width: 16, height: 16 }} />
                        </IconButton>
                        <IconButton color={'default'} onClick={() => {
                            deleteDialog.onTrue();
                        }}>
                            <SvgColor src='/assets/icons/cart/trash.svg' sx={{ width: 16, height: 16 }} />
                        </IconButton>
                    </Stack>
                </TableCell>


            </TableRow>
            <ConfirmDialog
                open={deleteDialog.value}
                color={'#F3AB28'}
                onClose={deleteDialog.onFalse}
                title="اطمینان از حذف"
                content={`آیا از حذف «${row?.fullName}» از عنوان «${adminRoleTranslate(`${row?.role}`)}» اطمینان دارید؟`}
                closeTitle="خیر"
                action={
                    <PrimaryButton size="medium" onClick={() => {
                        deleteDialog.onFalse();
                        onDeleteRow();
                    }}>
                        بله
                    </PrimaryButton>
                }
            />
        </>
    )

}