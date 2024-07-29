import Box from '@mui/material/Box';

import { usePathname } from 'src/routes/hooks';

import Footer from './footer';
import Header from './header';
import { AppBar, Button, Container, Grid, IconButton, Stack, Typography } from '@mui/material';
import NavDesktopModern from './nav/desktop-modern';
import { navConfig, navDesktopConfig } from './config-navigation';
import SvgColor from 'src/components/svg-color';
import { useResponsive } from 'src/hooks/use-responsive';
import { useHandleBanner } from 'src/api/banner';
import { useEffect, useState } from 'react';
import { useBoolean } from 'src/hooks/use-boolean';

// ----------------------------------------------------------------------

type Props = {
  children: React.ReactNode;
  header?: boolean;
};

export default function MainLayout({ children, header = true }: Props) {
  const [showBanner, setShowBanner] = useState(false);
  const pathname = usePathname();
  const homePage = pathname === '/';
  const mdUp = useResponsive('up', 'md');

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: 1 }}>

      {(header) && (
        <Box sx={{ bgcolor: '#454545', py: 2 }}>
          <Stack justifyContent={'center'} direction={'row'}>
            <Typography fontFamily={'peyda-regular'} color={'#F8F8F8'} sx={{ pt: 0.25 }}>
              متن بنر مورد نظر اینجا قرار می‌گیرد
            </Typography>
            <Box sx={{ borderLeft: '1px solid #F8F8F8', ml: 2, pl: 2, height: '50%' }}>
              <IconButton sx={{ p: 0 }}
              // onClick={() => toggle()}
              >
                <SvgColor src="/assets/icons/navbar/x-close.svg" color={'#F8F8F8'} sx={{ width: 16, height: 16 }} />
              </IconButton>
            </Box>
          </Stack>
        </Box>
      )}

      <Container maxWidth={'xl'} sx={{
        // pl: !mdUp ? 12 : '0px!important'
      }}>
        <Grid container>
          {(mdUp) ? (
            <Grid item xs={2} sm={1} md={1}>
              {(header) && (
                <AppBar position='sticky' sx={{
                  // pt: 8,
                  pt: 1,
                  // pr: 3,
                  // right: 0,
                  mx: 'auto',
                  width: '100%',
                  // ...(showBanner && {
                  //   pt: 16,
                  // })
                }}>
                  <NavDesktopModern data={navDesktopConfig} />
                </AppBar>
              )}
            </Grid>
          ) : null}

          <Grid item xs={!mdUp ? 12 : 10} sm={!mdUp ? 12 : 11} md={11} sx={{ px: '0px!important' }}>
            {(header) && (<Header toggleBanner={(v: boolean) => setShowBanner(v)} />)}
            <Box
              component="main"
              sx={{
                flexGrow: 1,
                // ...(!homePage && {
                //   pt: { xs: 8, md: 6 },
                // }),
                // ...(showBanner && {
                //   mt: { xs: 8, md: 6 },
                // })
              }}
            >
              {children}
            </Box>

            {/* <Container maxWidth={'xl'}>
                <Footer />
              </Container> */}
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
