import { Button, IconButton, MenuItem, Stack, Typography } from "@mui/material";
import { ConfirmDialog, WarningDialog } from "src/components/custom-dialog";
import CustomPopover, { usePopover } from "src/components/custom-popover";
import Iconify from "src/components/iconify";
import { SecondaryButton } from "src/components/styles/buttons/secondary";
import SvgColor from "src/components/svg-color";
import { useBoolean } from "src/hooks/use-boolean";
import { IAddressItem } from "src/types/address";

type Props = {
    row: IAddressItem
    isLast: boolean
    onEditRow: () => void
    onDeleteRow: () => void
}

export default function AddressItem({
    row,
    isLast,
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
                <MenuItem onClick={onEditRow} sx={{ typography: 'button2' }}>
                    <Iconify icon="solar:pen-bold" />
                    ویرایش
                </MenuItem>
                <MenuItem onClick={confirm.onTrue} sx={{ color: 'error.main', typography: 'button2' }}>
                    <Iconify icon="solar:trash-bin-trash-bold" />
                    حذف
                </MenuItem>
            </CustomPopover>

            <ConfirmDialog
                open={confirm.value}
                onClose={confirm.onFalse}
                color='#D12215'
                title="حذف آدرس"
                content="آیا از حذف آدرس مورد نظر اطمینان دارید؟"
                action={
                    <SecondaryButton size="medium" color="error" onClick={() => {
                        onDeleteRow()
                        confirm.onFalse()
                        popover.onClose()
                    }}>
                        حذف
                    </SecondaryButton>
                }
            />

            <Stack
                justifyContent={'space-between'}
                m={'24px'}
                alignItems={'start'}
                direction={'row'}
                sx={{
                    ...(!isLast && {
                        borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
                    })
                }}
            >
                <Stack spacing={1.5} pb={isLast ? 0 : '24px'}>
                    <Stack direction={'row'} spacing={1}>
                        <Typography variant="body2" color={'text.secondary'}>آدرس پستی:</Typography>
                        <Typography variant="title3">{row.address}</Typography>
                    </Stack>
                    <Stack direction={'row'} spacing={1}>
                        <Typography variant="body2" color={'text.secondary'}>استان:</Typography>
                        <Typography variant="title3">{row?.province?.name}</Typography>
                    </Stack>
                    <Stack direction={'row'} spacing={1}>
                        <Typography variant="body2" color={'text.secondary'}>شهر:</Typography>
                        <Typography variant="title3">{row.city?.name}</Typography>
                    </Stack>
                    <Stack direction={'row'} spacing={1}>
                        <Typography variant="body2" color={'text.secondary'}>کد پستی:</Typography>
                        <Typography variant="title3">{row.postal_code}</Typography>
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