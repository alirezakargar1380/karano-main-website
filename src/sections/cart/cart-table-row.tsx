import { format } from 'date-fns';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import MenuItem from '@mui/material/MenuItem';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';
import ListItemText from '@mui/material/ListItemText';
import LinearProgress from '@mui/material/LinearProgress';

import { useBoolean } from 'src/hooks/use-boolean';

import { fCurrency } from 'src/utils/format-number';

import Label from 'src/components/label';
import Iconify from 'src/components/iconify';
import { ConfirmDialog } from 'src/components/custom-dialog';
import CustomPopover, { usePopover } from 'src/components/custom-popover';

import { IProductItem } from 'src/types/product';
import { ICartItem } from 'src/types/cart';
import SvgColor from '../../components/svg-color';
import { Stack } from '@mui/material';

// ----------------------------------------------------------------------

type Props = {
  row: ICartItem;
  onEditRow: VoidFunction;
  onDeleteRow: VoidFunction;
};

export default function CartTableRow({
  row,
  onDeleteRow,
  onEditRow,
}: Props) {
  const {
    coating,
    dimensions,
    final_coating,
    frame_type,
    profile_type,
    quality
  } = row;

  const confirm = useBoolean();

  const popover = usePopover();

  return (
    <>
      <TableRow hover>

        <TableCell sx={{ display: 'flex', alignItems: 'center' }}>
          {profile_type}
        </TableCell>

        <TableCell>
          {final_coating}
        </TableCell>

        <TableCell>
          {frame_type}
        </TableCell>

        <TableCell>
          {coating}
        </TableCell>

        <TableCell>
          {dimensions}
        </TableCell>

        <TableCell>
          {quality}
        </TableCell>

        {/* <TableCell sx={{ typography: 'caption', color: 'text.secondary' }}>
          <LinearProgress
            value={(available * 100) / quantity}
            variant="determinate"
            color={
              (inventoryType === 'out of stock' && 'error') ||
              (inventoryType === 'low stock' && 'warning') ||
              'success'
            }
            sx={{ mb: 1, height: 6, maxWidth: 80 }}
          />
          {!!available && available} {inventoryType}
        </TableCell>

        <TableCell>{fCurrency(price)}</TableCell>

        <TableCell>
          <Label variant="soft" color={(publish === 'published' && 'info') || 'default'}>
            {publish}
          </Label>
        </TableCell> */}

        <TableCell align="right">
          <Stack direction={'row'}>
            <IconButton color={popover.open ? 'primary' : 'default'}>
              <SvgColor src='/assets/icons/cart/edit.svg' sx={{ width: 16, height: 16 }} />
            </IconButton>
            <IconButton color={popover.open ? 'primary' : 'default'}>
              <SvgColor src='/assets/icons/cart/trash.svg' sx={{ width: 16, height: 16 }} />
            </IconButton>
          </Stack>
          {/* <IconButton color={popover.open ? 'primary' : 'default'} onClick={popover.onOpen}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton> */}

        </TableCell>
      </TableRow>

      <CustomPopover
        open={popover.open}
        onClose={popover.onClose}
        arrow="right-top"
        sx={{ width: 140 }}
      >

        <MenuItem
          onClick={() => {
            onEditRow();
            popover.onClose();
          }}
        >
          <Iconify icon="solar:pen-bold" />
          Edit
        </MenuItem>

        <MenuItem
          onClick={() => {
            confirm.onTrue();
            popover.onClose();
          }}
          sx={{ color: 'error.main' }}
        >
          <Iconify icon="solar:trash-bin-trash-bold" />
          Delete
        </MenuItem>
      </CustomPopover>

      <ConfirmDialog
        open={confirm.value}
        onClose={confirm.onFalse}
        title="Delete"
        content="Are you sure want to delete?"
        action={
          <Button variant="contained" color="error" onClick={onDeleteRow}>
            Delete
          </Button>
        }
      />
    </>
  );
}
