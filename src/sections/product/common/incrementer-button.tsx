import { forwardRef } from 'react';

import { alpha } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import Stack, { StackProps } from '@mui/material/Stack';

import Iconify from 'src/components/iconify';

// ----------------------------------------------------------------------

interface Props extends StackProps {
  name?: string;
  quantity: number;
  disabledIncrease?: boolean;
  disabledDecrease?: boolean;
  onIncrease: VoidFunction;
  onDecrease: VoidFunction;
}

const IncrementerButton = forwardRef<HTMLDivElement, Props>(
  ({ quantity, onIncrease, onDecrease, disabledIncrease, disabledDecrease, sx, ...other }, ref) => (
    <Stack
      ref={ref}
      flexShrink={0}
      direction="row"
      alignItems="center"
      textAlign={'center'}
      justifyContent="space-between"
      sx={{
        p: 0.5,
        width: 100,
        borderRadius: 1,
        typography: 'subtitle2',
        border: (theme) => `solid 1px ${alpha(theme.palette.grey[500], 0.2)}`,
        ...sx,
      }}
      {...other}
    >
      <Stack sx={{
        borderRight: (theme) => `solid 1px ${alpha(theme.palette.grey[500], 0.2)}`,
        pr: 0.5,
        textAlign: 'center'
      }}>
        <IconButton
          size="small"
          onClick={onDecrease}
          disabled={disabledDecrease}
          sx={{ borderRadius: 0.75 }}
        >
          <Iconify icon="eva:minus-fill" width={8} />
        </IconButton>
        <IconButton
          size="small"
          onClick={onIncrease}
          disabled={disabledIncrease}
          sx={{ borderRadius: 0.75 }}
        >
          <Iconify icon="mingcute:add-line" width={8} />
        </IconButton>
      </Stack>
      <Stack sx={{ width: 1 }}>
        {quantity}
      </Stack>
    </Stack>
  )
);

export default IncrementerButton;
