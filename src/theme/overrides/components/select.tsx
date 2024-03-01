import { Theme } from '@mui/material/styles';

// ----------------------------------------------------------------------

export function select(theme: Theme) {
  return {
    MuiSelect: {
      styleOverrides: {
        select: {
          // padding: "8px 35px 8px 14px!important",
          border: 0
        },
        icon: {
          right: 10,
          width: 18,
          height: 18,
          top: 'calc(50% - 9px)',
        },
      },
    },
    MuiNativeSelect: {
      styleOverrides: {
        icon: {
          right: 10,
          width: 18,
          height: 18,
          top: 'calc(50% - 9px)',
        },
      },
    },
  };
}
