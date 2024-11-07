import { Button, IconButton, MenuItem, Stack, Typography } from "@mui/material";
import { WarningDialog } from "src/components/custom-dialog";
import CustomPopover, { usePopover } from "src/components/custom-popover";
import SvgColor from "src/components/svg-color";
import { useBoolean } from "src/hooks/use-boolean";
import { IAddressItem } from "src/types/address";

type Props = {
    row: IAddressItem
    onEditRow: () => void
    onDeleteRow: () => void
}

export default function AddressItem({
    row,
    onEditRow,
    onDeleteRow
}: Props) {
    const confirm = useBoolean();
    const popover = usePopover();

    return (
        <>
            <CustomPopover
                open={popover.open}
                onClose={popover.onClose}
                arrow="top-center"
                sx={{ width: 140, mt: 3 }}
                hiddenArrow={true}
            >
                <MenuItem onClick={onEditRow}>ویرایش</MenuItem>
                <MenuItem onClick={confirm.onTrue}>حذف</MenuItem>
            </CustomPopover>

            <WarningDialog
                open={confirm.value}
                onClose={confirm.onFalse}
                title="حذف آدرس"
                content="آیا از حذف آدرس مورد نظر اطمینان دارید؟"
                action={
                    <Button variant="contained" color="error" onClick={() => {
                        onDeleteRow()
                        confirm.onFalse()
                        popover.onClose()
                    }}>
                        حذف
                    </Button>
                }
            />

            <Stack justifyContent={'space-between'} py={2} alignItems={'start'} direction={'row'} borderBottom={(theme) => `1px solid ${theme.palette.divider}`}>
                <Stack spacing={1.5}>
                    <Stack direction={'row'} spacing={1}>
                        <Typography color={'text.secondary'}>آدرس پستی:</Typography>
                        <Typography>{row.address}</Typography>
                    </Stack>
                    <Stack direction={'row'} spacing={1}>
                        <Typography color={'text.secondary'}>استان:</Typography>
                        <Typography>{row?.province?.name}</Typography>
                    </Stack>
                    <Stack direction={'row'} spacing={1}>
                        <Typography color={'text.secondary'}>شهر:</Typography>
                        <Typography>{row.city?.name}</Typography>
                    </Stack>
                    <Stack direction={'row'} spacing={1}>
                        <Typography color={'text.secondary'}>کد پستی:</Typography>
                        <Typography>{row.postal_code}</Typography>
                    </Stack>
                </Stack>
                <IconButton
                    onClick={popover.onOpen}
                    sx={{ p: 0 }}
                >
                    <SvgColor src="/assets/icons/cart/more-option.svg" />
                </IconButton>
            </Stack>
        </>

    )
} 