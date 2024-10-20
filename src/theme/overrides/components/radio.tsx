import { Theme } from '@mui/material/styles';

// ----------------------------------------------------------------------

export function radio(theme: Theme) {
  return {
    // CHECKBOX, RADIO, SWITCH
    MuiFormControlLabel: {
      styleOverrides: {
        label: {
          ...theme.typography.body2,
        },
      },
    },

    MuiRadio: {
      styleOverrides: {
        root: {
          svg: {
            display: 'none',
          },
          margin: theme.spacing(1),
          padding: '8px',
          width: '14px',
          height: '14px',
          border: '2px solid #727272!important',
          float: 'left',
          position: 'relative!important',
          background: '#fff',

          '&::after': {
            content: '""',
            position: 'absolute',
            left: '6px',
            right: '6px',
            top: '6px',
            bottom: '6px',
            background: 'white',
            borderRadius: '50%',
          },
          '&:hover': {
            borderColor: "#2B2B2B!important",
            background: '#fff!important',
          },
          '&.Mui-checked': {
            borderColor: "#2B2B2B!important",
            background: '#2B2B2B!important',
          },
          '&.Mui-disabled': {
            borderColor: "#E0E0E0!important",
          },
          '&.Mui-checked:hover': {
            borderColor: "#2B2B2B!important",
            background: '#2B2B2B!important',
          }
        },
      },
    },
  };
}
