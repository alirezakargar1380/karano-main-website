import { menuItemClasses } from '@mui/material/MenuItem';
import Popover, { PopoverOrigin } from '@mui/material/Popover';

import { getPosition } from './utils';
import { StyledArrow } from './styles';
import { MenuPopoverProps } from './types';

// ----------------------------------------------------------------------

export default function OrderTrackingPopover({
  open,
  children,
  arrow = 'top-right',
  hiddenArrow,
  sx,
  ...other
}: MenuPopoverProps) {
  const { style, anchorOrigin, transformOrigin } = getPosition(arrow);

  return (
    <Popover
      open={Boolean(open)}
      anchorEl={open}
      anchorOrigin={anchorOrigin as PopoverOrigin}
      transformOrigin={transformOrigin as PopoverOrigin}
      sx={{
        mt: -3,
        bgcolor: "transparent",
      }}
      slotProps={{
        paper: {
          sx: {
            // width: 'auto',
            overflow: 'inherit',
            background: "#2B2B2B",
            color: "#F8F8F8",
            borderRadius: '16px',
            border: 'none',
            ...style,
            [`& .${menuItemClasses.root}`]: {
              '& svg': {
                mr: 2,
                flexShrink: 0,
              },
            },
            ...sx,
          },
        },
      }}
      {...other}
    >
      {!hiddenArrow && <StyledArrow arrow={arrow} sx={{ bgcolor: "#2B2B2B" }} />}

      {children}
    </Popover>
  );
}
