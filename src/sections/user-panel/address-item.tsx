import { IconButton, MenuItem, Stack, Typography } from "@mui/material";
import CustomPopover, { usePopover } from "src/components/custom-popover";
import SvgColor from "src/components/svg-color";
import { IAddressItem } from "src/types/address";

type Props = {
    row: IAddressItem
    onEditRow: () => void
}

export default function AddressItem({ row, onEditRow }: Props) {
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
            </CustomPopover>
            <Stack justifyContent={'space-between'} py={2} alignItems={'start'} direction={'row'} borderBottom={(theme) => `1px solid ${theme.palette.divider}`}>
                <Stack spacing={1.5}>
                    <Stack direction={'row'} spacing={1}>
                        <Typography color={'text.secondary'}>آدرس پستی:</Typography>
                        <Typography>{row.address}</Typography>
                    </Stack>
                    <Stack direction={'row'} spacing={1}>
                        <Typography color={'text.secondary'}>استان:</Typography>
                        <Typography>{row.provice}</Typography>
                    </Stack>
                    <Stack direction={'row'} spacing={1}>
                        <Typography color={'text.secondary'}>شهر:</Typography>
                        <Typography>{row.city}</Typography>
                    </Stack>
                    <Stack direction={'row'} spacing={1}>
                        <Typography color={'text.secondary'}>کد پستی:</Typography>
                        <Typography>7899</Typography>
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