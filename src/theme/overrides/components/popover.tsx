import { Theme } from '@mui/material/styles';
import { listClasses } from '@mui/material/List';

import { paper } from '../../css';

// ----------------------------------------------------------------------

export function popover(theme: Theme) {
  return {
    MuiPopover: {
      styleOverrides: {
        root: {
          // border: '10px solid red',
        },
        paper: {
          ...paper({ theme, dropdown: true }),
          border: '1px solid #D1D1D1',
          [`& .${listClasses.root}`]: {
            paddingTop: 0,
            paddingBottom: 0,
          },
        },
      },
    },
  };
}
