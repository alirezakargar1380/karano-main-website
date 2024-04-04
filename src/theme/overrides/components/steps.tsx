import { Theme } from '@mui/material/styles';

// ----------------------------------------------------------------------

export function steps(theme: Theme) {
  return {
    MuiStepIcon: {
      color: '#000!important',
      styleOverrides: {
        root: {
          '&.Mui-active': {
            color: '#000!important',
          }
          // color: '#000!important',
        },
      }
    }
  };
}
