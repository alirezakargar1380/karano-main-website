'use client';

import { useRef } from 'react';
import { closeSnackbar, SnackbarProvider as NotistackProvider } from 'notistack';

import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';

import Iconify from '../iconify';
import { useSettingsContext } from '../settings';
import { StyledIcon, StyledNotistack } from './styles';
import SvgColor from '../svg-color';
import { Box } from '@mui/material';

// ----------------------------------------------------------------------

type Props = {
  children: React.ReactNode;
};

export default function SnackbarProvider({ children }: Props) {
  const settings = useSettingsContext();

  const isRTL = settings.themeDirection === 'rtl';

  const notistackRef = useRef<any>(null);

  return (
    <NotistackProvider
      ref={notistackRef}
      maxSnack={5}
      preventDuplicate
      autoHideDuration={3000}
      TransitionComponent={isRTL ? Collapse : undefined}
      variant="success" // Set default variant
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      iconVariant={{
        info: (
          <StyledIcon color="info">
            <SvgColor src="/assets/icons/notification/alert-circle.svg" />
          </StyledIcon>
        ),
        success: (
          <StyledIcon color="success">
            <SvgColor src="/assets/icons/notification/alert-circle.svg" />
          </StyledIcon>
        ),
        warning: (
          <StyledIcon color="warning">
            <SvgColor src="/assets/icons/notification/alert-circle.svg" />
          </StyledIcon>
        ),
        error: (
          <StyledIcon color="error">
            <SvgColor src="/assets/icons/notification/alert-circle.svg" />
          </StyledIcon>
        ),
      }}
      Components={{
        default: StyledNotistack,
        info: StyledNotistack,
        success: StyledNotistack,
        warning: StyledNotistack,
        error: StyledNotistack,
      }}
      // with close as default
      action={(snackbarId) => (
        <IconButton size="small" onClick={() => closeSnackbar(snackbarId)} sx={{ p: 0.5 }}>
          <Iconify width={16} icon="mingcute:close-line" color={'#fff'} />
        </IconButton>
      )}
    >
      <Box>
        {children}
      </Box>
    </NotistackProvider>
  );
}
