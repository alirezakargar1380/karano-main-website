import Box from '@mui/material/Box';

import { usePathname } from 'src/routes/hooks';

import Footer from './footer';
import Header from './header';
import { AppBar, Button, Container, Grid } from '@mui/material';
import NavDesktopModern from './nav/desktop-modern';
import { navConfig, navDesktopConfig } from './config-navigation';

// ----------------------------------------------------------------------

type Props = {
  children: React.ReactNode;
};

export default function MainLayout({ children }: Props) {
  const pathname = usePathname();

  const homePage = pathname === '/';

  return (
    <Container maxWidth={'xl'}>
      <Box sx={{ display: 'flex', flexDirection: 'column', height: 1 }}>
        <Grid container>
          <Grid item sm={1}>
            <AppBar position="sticky" sx={{ p: 3 }}>
              <NavDesktopModern data={navDesktopConfig} />
            </AppBar>
          </Grid>
          <Grid item sm={11}>
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
  );
}
