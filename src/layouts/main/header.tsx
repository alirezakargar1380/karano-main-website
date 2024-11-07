import Stack from '@mui/material/Stack';
import Toolbar from '@mui/material/Toolbar';
import { useTheme } from '@mui/material/styles';
import Badge, { badgeClasses } from '@mui/material/Badge';

import { useOffSetTop } from 'src/hooks/use-off-set-top';
import { useResponsive } from 'src/hooks/use-responsive';

import { bgBlur } from 'src/theme/css';

import Logo from 'src/components/logo';

import NavMobile from './nav/mobile';
import NavDesktop from './nav/desktop';
import { HEADER } from '../config-layout';
import { navConfig, navDesktopConfig } from './config-navigation';
import LoginButton from '../common/login-button';
import PriceListButton from '../common/price-list-button';
import SearchButton from '../common/search-button';
import LikeButton from '../common/like-button';
import ShoppingCartButton from '../common/shopping-cart-button';
import { AppBar, Box, Container, Grid, IconButton, Typography } from '@mui/material';
import { useHandleBanner } from 'src/api/banner';
import { useEffect } from 'react';
import { useGetCategories } from 'src/api/category';
import NavDesktopModern from './nav/desktop-modern';

import useDetectScroll from '@smakss/react-scroll-direction';
import SvgColor from 'src/components/svg-color';

// ----------------------------------------------------------------------
type Props = {
  children: React.ReactNode;
};

function StyledToolbar({ children }: Props) {
  const theme = useTheme();

  const mdUp = useResponsive('up', 'md');

  const offsetTop = useOffSetTop(HEADER.H_DESKTOP);


  return (
    <Toolbar
      disableGutters
      sx={{
        bgcolor: 'transparent',
        // height: {
        //   xs: HEADER.H_MOBILE,
        //   md: HEADER.H_DESKTOP,
        // },
        height: '76px',
        transition: theme.transitions.create(['height'], {
          easing: theme.transitions.easing.easeInOut,
          duration: theme.transitions.duration.shorter,
        }),
        ...(offsetTop && {
          borderBottom: 'none',
          // ...bgBlur({
          //   color: theme.palette.background.default,
          // }),
          // height: {
          //   md: HEADER.H_DESKTOP_OFFSET,
          // },
        }),
      }}
    >{children}</Toolbar>
  )
}

export default function Header({ toggleBanner }: any) {
  const theme = useTheme();

  const mdUp = useResponsive('up', 'md');

  const offsetTop = useOffSetTop(HEADER.H_DESKTOP);

  const { scrollDir } = useDetectScroll();

  const { categories, categoryLoading } = useGetCategories();

  navDesktopConfig[0].children[0].items = categories.map((category) => {
    return {
      id: category.id,
      title: category.name,
      path: ''
    }
  })

  const { showBanner, toggle } = useHandleBanner();

  useEffect(() => {
    toggleBanner(showBanner)
  }, [showBanner])

  return (
    <AppBar sx={{
      bgcolor: '#fff',
      // transition: theme.transitions.create(['all'], {
      //   easing: theme.transitions.easing.easeInOut,
      //   duration: theme.transitions.duration.shorter,
      // }),
      ...((scrollDir === 'down') && {
        bgcolor: '#ffffff00',
      }),
    }}>
      <Box sx={{ bgcolor: '#454545', height: '45px', width: 1 }}>
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
      <Container maxWidth={'xl'}>
        <Grid container>
          <Grid item md={1}>
            <Box width={1} textAlign={'center'} pt={1}>
              <NavDesktopModern data={navDesktopConfig} />
            </Box>
          </Grid>
          <Grid item md={11} sx={{
            // px: '0px!important'
          }}>
            <StyledToolbar>
              <Box sx={{
                height: 1,
                display: 'flex',
                alignItems: 'center',
                opacity: 1,
                transition: theme.transitions.create(['border', 'opacity'], {
                  easing: theme.transitions.easing.easeInOut,
                  duration: theme.transitions.duration.shorter,
                }),
                ...(!(scrollDir === 'down') ? {
                  borderBottom: '1px solid #D1D1D1',
                } : {
                  opacity: 0
                }),
                width: 1
              }}>
                <Badge
                  sx={{
                    [`& .${badgeClasses.badge}`]: {
                      top: 8,
                      right: -16,
                    },
                  }}
                // badgeContent={
                //   <Link
                //     href={paths.changelog}
                //     target="_blank"
                //     rel="noopener"
                //     underline="none"
                //     sx={{ ml: 1 }}
                //   >
                //     <Label color="info" sx={{ textTransform: 'unset', height: 22, px: 0.5 }}>
                //       v5.6.0
                //     </Label>
                //   </Link>
                // }
                >
                  <Logo />
                </Badge>

                {/* <Box sx={{ flexGrow: 1 }} /> */}

                {mdUp && <NavDesktop data={navConfig} />}

                <Stack alignItems="center" direction={{ xs: 'row', md: 'row-reverse' }} sx={{ ml: 'auto' }} spacing={0.7}>
                  {/* <Button variant="contained" target="_blank" rel="noopener" href={paths.minimalUI}>
              Purchase Now
            </Button> */}


                  {mdUp && <ShoppingCartButton />}
                  {mdUp && <LikeButton />}
                  {mdUp && <SearchButton />}
                  {/* {mdUp && */}
                  <LoginButton />
                  {/* } */}
                  {mdUp && <PriceListButton />}

                  {/* <SettingsButton
              sx={{
                ml: { xs: 1, md: 0 },
                mr: { md: 2 },
              }}
            /> */}
                  {!mdUp && <NavMobile data={navDesktopConfig} />}
                </Stack>
              </Box>
            </StyledToolbar>
          </Grid>
        </Grid>

      </Container>
      {/* <Button onClick={() => toggle()} sx={{ position: 'absolute', zIndex: 10 }}>t</Button> */}
      {/* {showBanner ? (
        <Box sx={{ bgcolor: '#454545', py: 2 }}>
          <Stack justifyContent={'center'} direction={'row'}>
            <Typography fontFamily={'peyda-regular'} color={'#F8F8F8'} sx={{ pt: 0.25 }}>
              متن بنر مورد نظر اینجا قرار می‌گیرد
            </Typography>
            <Box sx={{ borderLeft: '1px solid #F8F8F8', ml: 2, pl: 2, height: '50%' }}>
              <IconButton sx={{ p: 0 }} onClick={() => toggle()}>
                <SvgColor src="/assets/icons/navbar/x-close.svg" color={'#F8F8F8'} sx={{ width: 16, height: 16 }} />
              </IconButton>
            </Box>
          </Stack>
        </Box>
      ) : null} */}

      {/* {offsetTop && <HeaderShadow />} */}
    </AppBar>
  );
}
