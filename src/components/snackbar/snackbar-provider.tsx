'use client';

import { useEffect, useRef, useState } from 'react';
import { closeSnackbar, CustomContentProps, SnackbarProvider as NotistackProvider, SnackbarContent } from 'notistack';

import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';

import Iconify from '../iconify';
import { useSettingsContext } from '../settings';
import { StyledIcon, StyledNotistack } from './styles';
import SvgColor from '../svg-color';
import { Box, Button, CircularProgress, Typography } from '@mui/material';

// ----------------------------------------------------------------------

declare module 'notistack' {
  interface VariantOverrides {
    // removes the `warning` variant
    // warning: false;     
    // adds `myCustomVariant` variant      
    myCustomVariant: {
      onClick?: () => void
      showButton?: boolean
      showTimer?: boolean
      color: 'error' | 'info'
    }
    multiline: {
      onClick?: () => void
      showButton?: boolean
      showTimer?: boolean
      color: 'error' | 'info'
    }
    // // adds `reportComplete` variant and specifies the
    // // "extra" props it takes in options of `enqueueSnackbar`
    // reportComplete: {         
    //   allowDownload: boolean  
    // }
  }
}

const bgColor: any = {
  error: "#D12215",
  info: "#2B2B2B"
}

interface myCustomVariantProps extends CustomContentProps {
  allowDownload: boolean
}

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
      // preventDuplicate
      autoHideDuration={3000}
      TransitionComponent={isRTL ? Collapse : undefined}
      variant="info" // Set default variant
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
        myCustomVariant: (
          <></>
        ),
        multiline: (
          <></>
        ),
      }}
      Components={{
        default: StyledNotistack,
        info: StyledNotistack,
        success: StyledNotistack,
        warning: StyledNotistack,
        error: StyledNotistack,
        multiline: (props: myCustomVariantProps | any) => {
          const [count, setCount] = useState(10);
          useEffect(() => {
            const interval = setInterval(() => {
              setCount((prevCount) => {
                if (prevCount > 0) {
                  return prevCount - 1;
                }
                closeSnackbar(props.id);
                clearInterval(interval);
                return prevCount;
              });
            }, 1000);

            return () => clearInterval(interval);
          }, []);

          return (
            <SnackbarContent>
              <Box
                sx={{
                  bgcolor: bgColor[props.color],
                  color: 'white',
                  borderRadius: '16px',
                  display: 'flex',
                }}
              >
                <Box sx={{
                  py: 2,
                  px: 2,
                  display: 'flex',
                  alignItems: 'center',
                  // justifyContent: 'space-around',
                  maxWidth: '800px',
                }}>
                  {(props.showTimer) ? (
                    <Box sx={{ position: 'relative', display: 'inline-flex' }}>
                      <CircularProgress variant="determinate" value={count * 10} size={"lg"} sx={{ color: "#D1D1D1", width: 24 }} />
                      <Box
                        sx={{
                          top: 0,
                          left: 0,
                          bottom: 0,
                          right: 0,
                          position: 'absolute',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <Typography
                          variant="body1"
                          component="div"
                          mt={0.5}
                          color="#F8F8F8"
                          fontSize={12}
                        >
                          {count}
                        </Typography>
                      </Box>
                    </Box>
                  ) : (
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <SvgColor src="/assets/icons/notification/info-circle.svg" sx={{ width: 24, height: 24 }} />
                    </Box>
                  )}

                  <Box sx={{ maxWidth: 574, ml: '16px' }}>
                    <Typography fontSize={14} mr={'16px'} whiteSpace={'pre-line'}>{props.message}</Typography>
                  </Box>

                  {(props.showButton) && (
                    <Button
                      variant='outlined'
                      sx={{
                        borderRadius: '24px',
                        borderColor: '#F8F8F8',
                        textWrap: 'nowrap',
                        px: 2
                      }}
                      onClick={() => {
                        props.onClick()
                        closeSnackbar(props.id)
                      }}
                    >
                      خنثی کردن
                    </Button>
                  )}
                </Box>

                {(!props.showTimer) && (
                  <Box borderLeft={'1px solid #fff'} sx={{ display: 'flex', px: 2 }}>
                    <IconButton size="small" onClick={() => closeSnackbar(props.id)} sx={{ p: 0.5 }}>
                      <Iconify width={16} icon="mingcute:close-line" color={'#fff'} />
                    </IconButton>
                  </Box>
                )}
              </Box>
            </SnackbarContent>
          )
        },
        myCustomVariant: (props: myCustomVariantProps | any) => {
          const [count, setCount] = useState(10);
          useEffect(() => {
            const interval = setInterval(() => {
              setCount((prevCount) => {
                if (prevCount > 0) {
                  return prevCount - 1;
                }
                closeSnackbar(props.id);
                clearInterval(interval);
                return prevCount;
              });
            }, 1000);

            return () => clearInterval(interval);
          }, []);

          return (
            <SnackbarContent>
              <Box sx={{
                bgcolor: bgColor[props.color],
                display: 'flex',
                color: 'white',
                borderRadius: '16px',
                width: 1
              }}>
                <Box sx={{
                  py: 2,
                  px: 2,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 2
                }}>
                  {(props.showTimer) ? (
                    <Box sx={{ position: 'relative', display: 'inline-flex' }}>
                      <CircularProgress variant="determinate" value={count * 10} size={"lg"} sx={{ color: "#D1D1D1", width: 24 }} />
                      <Box
                        sx={{
                          top: 0,
                          left: 0,
                          bottom: 0,
                          right: 0,
                          position: 'absolute',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <Typography
                          variant="body1"
                          component="div"
                          mt={0.5}
                          color="#F8F8F8"
                          fontSize={12}
                        >
                          {count}
                        </Typography>
                      </Box>
                    </Box>
                  ) : (
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <SvgColor src="/assets/icons/notification/info-circle.svg" />
                    </Box>
                  )}

                  <Typography fontSize={14} mr={'16px'}>{props.message}</Typography>

                  {(props.showButton) && (
                    <Button
                      variant='outlined'
                      sx={{
                        borderRadius: '24px',
                        borderColor: '#F8F8F8',
                      }}
                      onClick={() => {
                        props.onClick()
                        closeSnackbar(props.id)
                      }}
                    >
                      خنثی کردن
                    </Button>
                  )}
                </Box>

                {(!props.showTimer) && (
                  <Box borderLeft={'1px solid #fff'} sx={{ display: 'flex', px: 2 }}>
                    <IconButton size="small" onClick={() => closeSnackbar(props.id)} sx={{ p: 0.5 }}>
                      <Iconify width={16} icon="mingcute:close-line" color={'#fff'} />
                    </IconButton>
                  </Box>
                )}
              </Box>
            </SnackbarContent>
          )
        }
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
