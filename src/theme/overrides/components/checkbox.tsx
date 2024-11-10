import { Theme } from '@mui/material/styles';

// ----------------------------------------------------------------------

export function checkbox(theme: Theme) {
  return {
    MuiCheckbox: {
      styleOverrides: {
        root: {
          padding: theme.spacing(1),
          'svg': {
            fill: "#727272",
          },

          color: 'transparent!important',
          backgroundColor: 'transparent!important',

          '&.Mui-checked': {
            'svg': {
              fill: "#000",
            },
            '&:hover': {
              backgroundColor: 'transparent!important',
              'svg': {
                fill: "#555555"
              },
            },
            '&:active': {
              'svg path': {
                borderRadius: '4px',
                outline: "1px solid #A9A9A9"
              },
            },
          },

          '&:hover': {
            'svg': {
              fill: "#000"
            },
          },
          '&:active': {
            'svg': {
              fill: "#727272"
            },
          },


          // '& .MuiSvgIcon-root': { 
          //   fill: theme.palette.grey[400]
          // },


          // '&:active': {
          //   'svg path': {
          //     outline: '1px solid #A9A9A9',
          //     borderRadius: '4px'
          //   },
          // }
        },
      },
    },
  };
}
