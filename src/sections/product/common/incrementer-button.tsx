import { forwardRef } from 'react';

import { alpha } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import Stack, { StackProps } from '@mui/material/Stack';

import Iconify from 'src/components/iconify';
import { RHFTextField } from 'src/components/hook-form';

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
      textAlign={'left'}
      justifyContent="space-between"
      sx={{
        // p: 0.5,
        width: 1,
        borderRadius: 1,
        typography: 'subtitle2',
        border: (theme) => `solid 1px ${alpha(theme.palette.grey[500], 0.2)}`,
        ...sx,
      }}
      {...other}
    >
      <Stack sx={{
        borderRight: (theme) => `solid 1px ${alpha(theme.palette.grey[500], 0.2)}`,
        py: 0.75,
        textAlign: 'center'
      }}>
        <IconButton
          size="small"
          onClick={onDecrease}
          disabled={disabledDecrease}
          sx={{ borderRadius: 0.75, p: 0, px: 1 }}
        >
          <Iconify icon="mingcute:up-line" width={16} />
        </IconButton>
        <IconButton
          size="small"
          onClick={onIncrease}
          disabled={disabledIncrease}
          sx={{ borderRadius: 0.75, p: 0 }}
        >
          <Iconify icon="mingcute:down-line" width={16} />
        </IconButton>
      </Stack>
      {/* <Stack sx={{ width: 1, pl: 2 }}>
        {quantity}
      </Stack> */}
      <RHFTextField name='quantity' type='number'
        sx={{
          width: 1,
          '& .MuiInputBase-root': { borderRadius: 0, borderTopRightRadius: '8px', borderBottomRightRadius: '8px' }
        }}
      />
    </Stack>
  )
);

export default IncrementerButton;
