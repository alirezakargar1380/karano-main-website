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

          // default
          // color: "#fff!important",
          // display: 'block',
          width: '16px',
          height: '16px',
          border: '2px solid #727272!important',
          float: 'left',
          // margin: '0 10px 0 0',
          position: 'relative',
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

          // '&$checked': {
          //   color: "#fff!important",
          // },
          '&:hover': {
            borderColor: "#000!important",
            background: '#fff!important',
          },
          '&.Mui-checked': {
            borderColor: "#000!important",
            background: '#000!important',
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
