import Box from '@mui/material/Box';

import { usePathname } from 'src/routes/hooks';

import Footer from './footer';
import Header from './header';
import { AppBar, Button, Container, Grid, IconButton, Stack, Typography } from '@mui/material';
import NavDesktopModern from './nav/desktop-modern';
import { navConfig, navDesktopConfig } from './config-navigation';
import SvgColor from 'src/components/svg-color';
import { useResponsive } from 'src/hooks/use-responsive';

// ----------------------------------------------------------------------

type Props = {
  children: React.ReactNode;
};

export default function MainLayout({ children }: Props) {
  const pathname = usePathname();

  const homePage = pathname === '/';
  const mdUp = useResponsive('up', 'md');

  return (
    <>
      <Box sx={{ display: 'flex', flexDirection: 'column', height: 1 }}>
        <Grid container>
          {mdUp ? (
            <Grid item xs={2} sm={1} md={1}>
              <AppBar position="sticky" sx={{
                pt: 3,
                pr: 3,
                width: '100%'
              }}>
                <NavDesktopModern data={navDesktopConfig} />
              </AppBar>
            </Grid>
          ) : null}

          <Grid item xs={!mdUp ? 12 : 10} sm={!mdUp ? 12 : 11} md={11} sx={{ px: '0px!important' }}>
            <Container maxWidth={'xl'}>
              <Header />
            </Container>

            <Box
              component="main"
              sx={{
                flexGrow: 1,
                ...(!homePage && {
                  pt: { xs: 8, md: 10 },
                }),
              }}
            >

              {children}
            </Box>

            {/* <Container maxWidth={'xl'}>
                <Footer />
              </Container> */}
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
