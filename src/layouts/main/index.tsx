import Box from '@mui/material/Box';

import { usePathname } from 'src/routes/hooks';

import Footer from './footer';
import Header from './header';
import { AppBar, Button, Container, Grid, IconButton, Stack, Typography } from '@mui/material';
import NavDesktopModern from './nav/desktop-modern';
import { navConfig, navDesktopConfig } from './config-navigation';
import SvgColor from 'src/components/svg-color';

// ----------------------------------------------------------------------

type Props = {
  children: React.ReactNode;
};

export default function MainLayout({ children }: Props) {
  const pathname = usePathname();

  const homePage = pathname === '/';

  return (
    <>
      <Box sx={{ bgcolor: '#454545', py: 2 }}>
        <Stack justifyContent={'center'} direction={'row'}>
          <Typography fontFamily={'peyda-regular'} color={'#F8F8F8'} sx={{ pt: 0.25 }}>
            متن بنر مورد نظر اینجا قرار می‌گیرد
          </Typography>
          <Box sx={{ borderLeft: '1px solid #F8F8F8', ml: 2, pl: 2, height: '50%' }}>
            <IconButton sx={{ p: 0 }}>
              <SvgColor src="/assets/icons/navbar/x-close.svg" color={'#F8F8F8'} sx={{ width: 16, height: 16 }} />
            </IconButton>
          </Box>
        </Stack>
      </Box>
      <Container maxWidth={'xl'}>
        <Box sx={{ display: 'flex', flexDirection: 'column', height: 1 }}>
          <Grid container>
            <Grid item xs={2} sm={1} md={1}>
              <AppBar position="sticky" sx={{
                pt: 3,
                pr: 3,
                width: '100%'
              }}>
                <NavDesktopModern data={navDesktopConfig} />
              </AppBar>
            </Grid>
            <Grid item xs={10} sm={11} md={11}>
              <Header />

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

              <Container maxWidth={'xl'}>
                <Footer />
              </Container>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </>

  );
}
