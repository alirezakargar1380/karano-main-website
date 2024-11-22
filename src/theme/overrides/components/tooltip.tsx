import { Theme } from '@mui/material/styles';

// ----------------------------------------------------------------------

export function tooltip(theme: Theme) {
  const lightMode = theme.palette.mode === 'light';

  return {
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          ...theme.typography.caption2,
          padding: '8px',
          borderRadius: '8px',
          backgroundColor: "#2B2B2B",
        },
        arrow: {
          color: "#2B2B2B",
          left: '16px',
          transform: 'none!important',
          marginTop: '0px',
        },
      },
    },
  };
}
