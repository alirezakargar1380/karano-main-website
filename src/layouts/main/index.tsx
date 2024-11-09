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
import { useGetCategories } from 'src/api/category';

// ----------------------------------------------------------------------

type Props = {
  children: React.ReactNode;
  header?: boolean;
  footer?: boolean;
};

export default function MainLayout({ children, header = true, footer = true }: Props) {
  const [showBanner, setShowBanner] = useState(false);
  const pathname = usePathname();
  const homePage = pathname === '/';
  const mdUp = useResponsive('up', 'md');

  const { categories, categoryLoading } = useGetCategories();

  navDesktopConfig[0].children[0].items = categories.map((category) => {
    return {
      id: category.id,
      title: category.name,
      path: ''
    }
  })

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: 1 }}>

      {(header) && (
        <Header toggleBanner={(v: boolean) => setShowBanner(v)} />
      )}

      {/* {(header) && (
        <Box sx={{ bgcolor: '#454545', height: '45px' }}>
          <Stack justifyContent={'center'} direction={'row'} alignItems={'center'} height={1}>
            <Typography variant={'caption2'} color={'#F8F8F8'} pr={'20px'}>
              متن بنر مورد نظر اینجا قرار می‌گیرد
            </Typography>
            <Box sx={{ borderLeft: '1px solid #F8F8F8', pl: '20px', height: '22.5px', display: 'flex', alignItems: 'center' }}>
              <IconButton sx={{ p: 0 }}
              // onClick={() => toggle()}
              >
                <SvgColor src="/assets/icons/navbar/x-close.svg" color={'#F8F8F8'} sx={{ width: 16, height: 16 }} />
              </IconButton>
            </Box>
          </Stack>
        </Box>
      )} */}

      <Container maxWidth={'xl'} sx={{}}>
        <Grid container>
          {(mdUp) ? (
            <Grid item xs={2} sm={1} md={1} />
          ) : null}

          <Grid item xs={!mdUp ? 12 : 10} sm={!mdUp ? 12 : 11} md={11} sx={{ px: '0px!important' }}>
            <Box
              component="main"
              sx={{
                flexGrow: 1,
                pt: 15,
                ...(!homePage && {
                  // pt: 1,
                }),
                // ...(showBanner && {
                //   mt: { xs: 8, md: 6 },
                // })
              }}
            >
              {children}
            </Box>

            {(footer) && (
              <Container maxWidth={'xl'}>
                <Footer />
              </Container>
            )}
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
