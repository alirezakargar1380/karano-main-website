import { MaterialDesignContent } from 'notistack';

import { alpha, styled } from '@mui/material/styles';

// ----------------------------------------------------------------------

export const StyledNotistack = styled(MaterialDesignContent)(({ theme }) => {
  const lightMode = theme.palette.mode === 'dark';

  return {
    marginTop: '60px!important',
    // paddingTop: '0px',
    '& #notistack-snackbar': {
      ...theme.typography.subtitle2,
      // padding: 0,
      flexGrow: 1,
      borderRight: '1px solid #fff',
      marginRight: '22px',
      color: '#fff',
      padding: theme.spacing(1, 2, 1, 0),
    },
    '&.notistack-MuiContent': {
      color: theme.palette.text.primary,
      boxShadow: theme.customShadows.z8,
      borderRadius: theme.shape.borderRadius,
      padding: theme.spacing(0, 0.5, 0, 0.5),
      // backgroundColor: theme.palette.background.paper,
      backgroundColor: '#000',
      display: 'flex',
      flexWrap: 'nowrap',
      // display: 'block',
      maxWidth: '550px',
    },
    '&.notistack-MuiContent-default': {
      padding: theme.spacing(1, 1, 1, 1),
      color: lightMode ? theme.palette.common.white : theme.palette.grey[800],
      backgroundColor: lightMode ? theme.palette.grey[800] : theme.palette.common.white,
      // backgroundColor: '#000'
    },
    '&.notistack-MuiContent-info': {
      backgroundColor: '#2B2B2B'
    },
    '&.notistack-MuiContent-success': {
      backgroundColor: '#2B2B2B'
    },
    '&.notistack-MuiContent-warning': {
      backgroundColor: '#2B2B2B'
    },
    '&.notistack-MuiContent-error': {
      backgroundColor: '#D12215'
    },
  };
});

// ----------------------------------------------------------------------

type StyledIconProps = {
  color: 'info' | 'success' | 'warning' | 'error';
};

export const StyledIcon = styled('span')<StyledIconProps>(({ color, theme }) => ({
  width: 44,
  height: 44,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  // margin: theme.spacing(1.5, 1, 1.5, 1),
  // paddingLeft: '0px!important',
  // color: theme.palette[color].main,
  color: "#fff",
  borderRadius: theme.shape.borderRadius,
  // backgroundColor: alpha(theme.palette[color].main, 0.16),
}));
