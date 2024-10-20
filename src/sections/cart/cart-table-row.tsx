import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';

import { useBoolean } from 'src/hooks/use-boolean';
import Label from 'src/components/label';
import { ConfirmDialog, DialogWithButton } from 'src/components/custom-dialog';

import { ICartItem } from 'src/types/cart';
import SvgColor from '../../components/svg-color';
import { Stack, Tooltip, Typography } from '@mui/material';
import { IOrderProductPropertyStatus } from 'src/types/order-products-property';
import { LoadingButton } from '@mui/lab';

// ----------------------------------------------------------------------

type Props = {
  row: ICartItem;
  index?: number;
  indexEqual?: number;
  selected?: boolean;
  type?: 'cart' | 'edit' | 'view';
  isLastOne?: boolean;
  product_name?: string;
  onEditRow?: VoidFunction | undefined;
  onDeleteRow?: VoidFunction | undefined;
};

export default function CartTableRow({
  row,
  index,
  indexEqual,
  selected,
  type,
  isLastOne = false,
  product_name,
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
    quality,
    rejection_reason
  } = row;

  const confirm = useBoolean();
  const confirmLast = useBoolean();

  const rejectionDialog = useBoolean();

  return (
    <>
      <TableRow
        hover
        sx={{
          ...(selected && {
            border: '2px solid #000'
          })
        }}
      >

        {(!!profile_type) && (
          <TableCell sx={{ display: 'flex', alignItems: 'center' }}>
            {profile_type}
            {(type === 'edit') && (
              <>
                {(status === IOrderProductPropertyStatus.denied) && (
                  <Label color='error' className={index === indexEqual ? 'my-first-step' : ''} sx={{ ml: 1, px: 1 }}>رد شده</Label>
                )}
                {(status === IOrderProductPropertyStatus.edited) && (
                  <Label color='warning' sx={{ ml: 1, px: 1 }}>اصلاح شده</Label>
                )}
                {(status === IOrderProductPropertyStatus.approve) && (
                  <Label color='success' sx={{ ml: 1, px: 1 }}>تایید شده</Label>
                )}
              </>
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

        <TableCell sx={{}}>
          <Box sx={{ display: 'flex', alignItems: 'center', fontFamily: 'peyda-medium' }}>
            {quality}
            {(rejection_reason) && (
              <Box
                sx={{
                  ml: 1,
                  borderRadius: '50px',
                  border: '1px solid #D1D1D1',
                  fontSize: '0.75rem',
                  textWrap: 'nowrap',
                  pl: 1.5,
                  pr: 1.5,
                  display: 'flex',
                  alignItems: 'center',
                  py: 0.5,
                  cursor: 'pointer'
                }}
                className={(index === indexEqual && status === IOrderProductPropertyStatus.denied) ? 'reason' : ''}
                onClick={rejectionDialog.onTrue}
              >
                <SvgColor src='/assets/icons/admin-panel/info-circle.svg' sx={{ width: 16, height: 16, mr: 0.5 }} />
                <Box pt={0.25}>
                  مشاهده علت
                </Box>
              </Box>
            )}
          </Box>
        </TableCell>

        <TableCell align="right">
          <Stack direction={'row'}>
            {(onEditRow && status !== IOrderProductPropertyStatus.approve && type !== 'view') && (
              <Tooltip title="اصلاح کالا" arrow>
                <IconButton color={'default'} onClick={onEditRow} className={(index === indexEqual && status === IOrderProductPropertyStatus.denied) ? 'edit' : ''}>
                  <SvgColor src='/assets/icons/cart/edit.svg' sx={{ width: 16, height: 16 }} />
                </IconButton>
              </Tooltip>
            )}
            {(onDeleteRow && status !== IOrderProductPropertyStatus.approve && type !== 'view') && (
              <Tooltip title="حذف کالا" arrow>
                <IconButton
                  color={'default'}
                  onClick={() => {
                    (isLastOne) ? confirmLast.onTrue() : confirm.onTrue()
                  }}
                  className={(index === indexEqual && status === IOrderProductPropertyStatus.denied) ? 'del' : ''}
                  disabled={!!selected}
                >
                  <SvgColor src='/assets/icons/cart/trash.svg' sx={{ width: 16, height: 16 }} />
                </IconButton>
              </Tooltip>
            )}
          </Stack>
        </TableCell>
      </TableRow>

      <ConfirmDialog
        open={confirm.value}
        onClose={confirm.onFalse}
        title={(status === IOrderProductPropertyStatus.denied) ? "حذف کالا" : "حذف کالای ردشده"}
        content={(status === IOrderProductPropertyStatus.denied || status === IOrderProductPropertyStatus.edited) ? `آیا از حذف ${product_name} اطمینان دارید؟` : "آیا از حذف کالای مورد نظر اطمینان دارید؟"}
        action={
          <Button variant="outlined" color="error" sx={{ borderRadius: 20, px: 4 }} onClick={() => {
            if (onDeleteRow) onDeleteRow();
            confirm.onFalse();
          }}>
            حذف
          </Button>
        }
      />

      <ConfirmDialog
        open={confirmLast.value}
        onClose={confirmLast.onFalse}
        title="حذف آخرین کالای ردشده"
        content={`آیا از حذف  آخرین کالای ${product_name} اطمینان دارید؟\n با حذف آخرین کالا از پروفیل‌های ${product_name}، کل کالاهای این پروفیل حذف خواهند شد.`}
        action={
          <Button variant="outlined" color="error" sx={{ borderRadius: 20, px: 4 }} onClick={() => {
            if (onDeleteRow) onDeleteRow();
            confirmLast.onFalse();
          }}>
            حذف
          </Button>
        }
      />

      <DialogWithButton fullWith={true} dialog={rejectionDialog}>
        <Box p={3}>
          <Typography variant="h4" sx={{ width: 1, pb: 2, fontFamily: 'peyda-bold', borderBottom: '1px solid #D1D1D1' }}>
            علت رد ‌سفارش
          </Typography>
          <Typography variant='body2' py={3} color={"#727272"}>دلایل رد سفارش شما به همراه راه‌حل‌های احتمالی برای اصلاح سفارش را در متن زیر بیان شده است.</Typography>
          <Typography variant='body2' pt={3} fontFamily={'peyda-bold'}>
            توضیحات ادمین
          </Typography>
          <Box mt={2} bgcolor={"#F8F8F8"} border={'1px solid #E0E0E0'} borderRadius={'12px'} p={2}>
            <Typography variant='body2' color={"#727272"}>
              {rejection_reason}
            </Typography>
          </Box>
          <Box sx={{ textAlign: 'right', mt: 2 }}>
            <LoadingButton variant='contained' onClick={rejectionDialog.onFalse} sx={{ borderRadius: '50px' }}>متوجه شدم</LoadingButton>
          </Box>
        </Box>
      </DialogWithButton>

    </>
  );
}
