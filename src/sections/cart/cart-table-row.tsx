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
import { IOrderProductPropertyStatus } from 'src/types/order-products-property';

// ----------------------------------------------------------------------

type Props = {
  row: ICartItem;
  selected?: boolean;
  onEditRow?: VoidFunction;
  onDeleteRow?: VoidFunction;
};

export default function CartTableRow({
  row,
  selected,
  onDeleteRow,
  onEditRow,
}: Props) {
  const {
    status,
    coating,
    dimensions,
    final_coating,
    frame_type,
    profile_type,
    quality
  } = row;

  const confirm = useBoolean();

  return (
    <>
      <TableRow hover sx={{
        ...(selected && {
          border: '2px solid #000'
        })
      }}>

        {(!!profile_type) && (
          <TableCell sx={{ display: 'flex', alignItems: 'center' }}>
            {profile_type}
            {(status === IOrderProductPropertyStatus.denied) && (
              <Label color='error' sx={{ ml: 1 }}>رد شده</Label>
            )}
            {(status === IOrderProductPropertyStatus.edited) && (
              <Label color='warning' sx={{ ml: 1 }}>اصلاح شده</Label>
            )}
          </TableCell>
        )}

        {(!!final_coating) && (
          <TableCell>
            {final_coating}
          </TableCell>
        )}

        {(!!frame_type) && (
          <TableCell>
            {frame_type}
          </TableCell>
        )}

        {(!!coating) && (
          <TableCell>
            {coating}
          </TableCell>
        )}

        <TableCell>
          {dimensions}
        </TableCell>

        <TableCell>
          {quality}
        </TableCell>

        <TableCell align="right">
          <Stack direction={'row'}>
            {(onEditRow) && (
              <IconButton color={'default'} onClick={onEditRow}>
                <SvgColor src='/assets/icons/cart/edit.svg' sx={{ width: 16, height: 16 }} />
              </IconButton>
            )}
            {(onDeleteRow) && (
              <IconButton color={'default'} onClick={confirm.onTrue}>
                <SvgColor src='/assets/icons/cart/trash.svg' sx={{ width: 16, height: 16 }} />
              </IconButton>
            )}
          </Stack>
          {/* <IconButton color={popover.open ? 'primary' : 'default'} onClick={popover.onOpen}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton> */}

        </TableCell>
      </TableRow>

      <ConfirmDialog
        open={confirm.value}
        onClose={confirm.onFalse}
        title="حذف آیتم از سبد خرید"
        content="آیا مطمئن هستید؟"
        action={
          <Button variant="contained" color="error" onClick={() => {
            if (onDeleteRow) onDeleteRow();
            confirm.onFalse();
          }}>
            تایید
          </Button>
        }
      />
    </>
  );
}
