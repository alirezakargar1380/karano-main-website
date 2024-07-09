import { useState, useEffect, useCallback } from 'react';

import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';

import { usePathname } from 'src/routes/hooks';

import Logo from 'src/components/logo';
import SvgColor from 'src/components/svg-color';
import Scrollbar from 'src/components/scrollbar';

import NavList from './nav-list';
import { NavProps } from '../types';
import { Box, Button, Stack, Typography } from '@mui/material';
import { useResponsive } from 'src/hooks/use-responsive';

// ----------------------------------------------------------------------

export default function NavDesktopModern({ data }: NavProps) {
  const pathname = usePathname();

  const mdUp = useResponsive('up', 'md');

  const [openMenu, setOpenMenu] = useState(false);

  useEffect(() => {
    if (openMenu) {
      handleCloseMenu();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const handleOpenMenu = useCallback(() => {
    setOpenMenu(true);
  }, []);

  const handleCloseMenu = useCallback(() => {
    setOpenMenu(false);
  }, []);

  return (
    <>
      <IconButton onClick={handleOpenMenu} sx={{ position: 'fixed', '&:hover': { background: 'transparent' } }}>
        <Stack direction={'column'} justifyContent={'center'} textAlign={'center'}>
          <SvgColor src="/assets/icons/navbar/dots-grid.svg" sx={{ mx: 'auto', width: 32, height: 32 }} />
          <Typography fontFamily={'peyda-regular'} sx={{ pt: 0.25 }}>محصولات</Typography>
        </Stack>
      </IconButton>
      <Drawer
        open={openMenu}
        onClose={handleCloseMenu}
        PaperProps={{
          sx: {
            width: {
              xl: '30%',
              lg: '40%',
              md: '50%',
              sm: '60%',
              xs: '90%',
            },
            // width: mdUp ? '30%' : '80%',

            // height: '100%',
            overflow: 'hidden',
            bgcolor: 'transparent',
            backdropFilter: 'none',
            boxShadow: 'none',
          },
        }}
        ModalProps={{
          sx: {
            height: '100vh',
            bgcolor: 'transparent!important',
            '& .MuiDrawer-paper': {
              bgcolor: 'transparent!important',
              backdropFilter: 'none',
              boxShadow: 'none',
            }
          }
        }}
        hideBackdrop={true}
      >
        <Scrollbar>
          <Stack sx={{ width: 1 }} direction={'row'}>
            <Box sx={{ width: '80%', height: '100vh', pr: 2, bgcolor: 'white', boxShadow: '-2px 0px 20px 0px #00000040' }}>
              <Box sx={{ width: mdUp ? '80%' : '100%', ml: 'auto' }}>
                <Box sx={{ borderBottom: '1px solid #D1D1D1' }}>
                  <Logo sx={{ mx: 2.5, my: 3 }} />
                </Box>
                {data.map((list, index) => (
                  <NavList key={index} data={list} />
                ))}
              </Box>
            </Box>
            <Box sx={{ ml: 3, mt: 2, backdropFilter: 'none', background: 'transparent' }}>
              <IconButton onClick={handleCloseMenu} sx={{ bgcolor: 'white', borderRadius: '50%', border: '1px solid #D1D1D1', '&:hover': { background: '#F2F2F2' } }}>
                <SvgColor src="/assets/icons/navbar/x-close.svg" />
              </IconButton>
            </Box>
          </Stack>
        </Scrollbar>
      </Drawer>
    </>
  );
}
