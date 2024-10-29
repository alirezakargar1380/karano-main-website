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
          width: '16px',
          height: '16px',
          border: '2px solid #727272!important',
          float: 'left',
          position: 'relative',
          background: '#fff',
          padding: '8px',
          '&::after': {
            content: '""',
            position: 'absolute',
            left: '5px',
            right: '5px',
            top: '5px',
            bottom: '5px',
            background: 'white',
            borderRadius: '50%',
          },

          // '&$checked': {
          //   color: "#fff!important",
          // },
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
          // '&:hover'
          // checked: {
          //   color: "#fff!important",
          // }
        },
      },
    },
  };
}
