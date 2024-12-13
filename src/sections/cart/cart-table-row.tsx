import Box from '@mui/material/Box';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';

import { useBoolean } from 'src/hooks/use-boolean';
import Label from 'src/components/label';
import { ConfirmDialog, DialogWithButton } from 'src/components/custom-dialog';

import { ECoatingTexture, ECoverEdgeTape, ICartItem } from 'src/types/cart';
import SvgColor from '../../components/svg-color';
import { Stack, Tooltip, Typography } from '@mui/material';
import { IOrderProductPropertyStatus } from 'src/types/order-products-property';
import { pxToRem } from 'src/theme/typography';
import { SecondaryButton } from 'src/components/styles/buttons/secondary';
import { PrimaryButton } from 'src/components/styles/buttons/primary';
import { EAlgorithm } from 'src/types/product';

// ----------------------------------------------------------------------

export function translateCoverEdgeTape(coverEdgeTape: ECoverEdgeTape) {
  switch (coverEdgeTape) {
    case ECoverEdgeTape.length_width:
      return '1 طول و 1 عرض';
    case ECoverEdgeTape.sides:
      return '4 طرف';
    default:
      return '';
  }
}

type Props = {
  row: ICartItem;
  index?: number;
  indexEqual?: number;
  selected?: boolean;
  algorithm?: EAlgorithm;
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
  algorithm,
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
    inlaid_flower,
    inlaid_flower_emty_space,
    cover_edge_tape,
    coating_texture,
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
          <TableCell sx={{ display: 'flex', alignItems: 'center', width: 180 }}>
            <Typography variant='body4'>{profile_type}</Typography>
            {(type === 'edit') && (
              <>
                {(status === IOrderProductPropertyStatus.denied) && (
                  <Label size='medium' variant='filled' color='red' className={index === indexEqual ? 'my-first-step' : ''} sx={{ ml: 1, px: pxToRem(8), py: pxToRem(2), borderRadius: '8px' }}>رد شده</Label>
                )}
                {(status === IOrderProductPropertyStatus.edited) && (
                  <Label size='medium' variant='filled' color='yellow' sx={{ ml: 1, px: 1 }}>اصلاح شده</Label>
                )}
                {(status === IOrderProductPropertyStatus.approve) && (
                  <Label size='medium' variant='filled' color='green' sx={{ ml: 1, px: 1 }}>تایید شده</Label>
                )}
              </>
            )}
          </TableCell>
        )}

        {(!!final_coating || algorithm === EAlgorithm.cabinet_door) && (
          <TableCell>
            <Typography variant='body4'>{final_coating || '-'}</Typography>
          </TableCell>
        )}

        {(inlaid_flower !== null) && (
          <TableCell>
            <Typography variant='body4'>{inlaid_flower ? 'دارد' : 'ندارد'}</Typography>
          </TableCell>
        )}

        {(inlaid_flower === false) && (
          <TableCell>
            <Typography variant='body4'>{inlaid_flower_emty_space + " سانتی متر"}</Typography>
          </TableCell>
        )}

        {(inlaid_flower === true) && (
          <TableCell>
            <Typography variant='body4'>-</Typography>
          </TableCell>
        )}

        {(!!cover_edge_tape) && (
          <TableCell>
            <Typography variant='body4'>
              {translateCoverEdgeTape(cover_edge_tape)}
            </Typography>
          </TableCell>
        )}

        {(!!coating_texture) && (
          <TableCell>
            <Typography variant='body4'>
              {(
                !coating_texture && '-' ||
                coating_texture === ECoatingTexture.right_vein && 'بلوط رگه راست' ||
                coating_texture === ECoatingTexture.wavy && 'بلوط موج دار' ||
                ''
              )}
            </Typography>
          </TableCell>
        )}

        {(!!frame_type) && (
          <TableCell>
            <Typography variant='body4'>{frame_type}</Typography>
          </TableCell>
        )}

        {(algorithm === EAlgorithm.cabinet_door) && (
          <TableCell>
            <Typography variant='body4'>{coating || '-'}</Typography>
          </TableCell>
        )}

        <TableCell>
          <Typography variant='body4'>{dimensions}</Typography>
        </TableCell>

        <TableCell sx={{}}>
          <Box sx={{ display: 'flex', alignItems: 'center', fontFamily: 'peyda-medium', gap: '8px' }}>
            <Typography variant='body4'>{quality}</Typography>
            {(rejection_reason) && (
              <SecondaryButton
                size='small'
                startIcon={(<SvgColor src='/assets/icons/admin-panel/info-circle.svg' sx={{ width: 16, height: 16, mb: 1 }} />)}
                sx={{ typography: 'caption2!important', py: 0, textWrap: 'nowrap', pl: 0.5, height: '24px' }}
                className={(index === indexEqual && status === IOrderProductPropertyStatus.denied) ? 'reason' : ''}
                onClick={rejectionDialog.onTrue}
              >
                مشاهده علت
              </SecondaryButton>
            )}
          </Box>
        </TableCell>

        <TableCell align="right" sx={{
          // pr: '16px',
          pr: 0,
          textAlign: '-webkit-right'
        }}>
          <Stack direction={'row'} width={'fit-content'}>
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
        color='#D12215'
        onClose={confirm.onFalse}
        title={(status === IOrderProductPropertyStatus.denied) ? "حذف کالای ردشده" : "حذف کالا"}
        content={(status === IOrderProductPropertyStatus.denied || status === IOrderProductPropertyStatus.edited) ? `آیا از حذف ${product_name} اطمینان دارید؟` : "آیا از حذف کالای مورد نظر اطمینان دارید؟"}
        action={
          <SecondaryButton size={'medium'} color="error" sx={{ borderRadius: 20, px: 4 }} onClick={() => {
            if (onDeleteRow) onDeleteRow();
            confirm.onFalse();
          }}>
            حذف
          </SecondaryButton>
        }
      />

      <ConfirmDialog
        open={confirmLast.value}
        color='#D12215'
        onClose={confirmLast.onFalse}
        title={(status === IOrderProductPropertyStatus.denied) ? "حذف آخرین کالای ردشده" : "حذف آخرین کالا"}
        content={`آیا از حذف  آخرین کالای ${product_name} اطمینان دارید؟\n با حذف آخرین کالا از پروفیل‌های ${product_name}، کل کالاهای این پروفیل حذف خواهند شد.`}
        action={
          <SecondaryButton size={'medium'} color="error" sx={{ borderRadius: 20, px: 4 }}
            onClick={() => {
              if (onDeleteRow) onDeleteRow();
              confirmLast.onFalse();
            }}>
            حذف
          </SecondaryButton>
        }
      />

      <DialogWithButton fullWith={true} dialog={rejectionDialog}>
        <Box>
          <Typography variant="title1" sx={{ width: 1, pb: 2, borderBottom: '1px solid #D1D1D1' }}>
            علت رد ‌سفارش
          </Typography>
          <Typography variant='body2' py={3} color={"#727272"}>دلایل رد سفارش شما به همراه راه‌حل‌های احتمالی برای اصلاح سفارش را در متن زیر بیان شده است.</Typography>
          <Typography variant='body4' pt={3} fontFamily={'peyda-bold'}>
            توضیحات ادمین
          </Typography>
          <Box mt={2} bgcolor={"#F8F8F8"} border={'1px solid #E0E0E0'} borderRadius={'12px'} p={2}>
            <Typography variant='body3' color={"#727272"}>
              {rejection_reason}
            </Typography>
          </Box>
          <Box sx={{ textAlign: 'right', mt: '24px' }}>
            <PrimaryButton size='medium' onClick={rejectionDialog.onFalse}>متوجه شدم</PrimaryButton>
          </Box>
        </Box>
      </DialogWithButton>

    </>
  );
}
