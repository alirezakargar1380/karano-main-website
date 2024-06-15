import Stack from '@mui/material/Stack';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { useTheme } from '@mui/material/styles';
import Container from '@mui/material/Container';
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
import HeaderShadow from '../common/header-shadow';
import SettingsButton from '../common/settings-button';
import PriceListButton from '../common/price-list-button';
import SearchButton from '../common/search-button';
import LikeButton from '../common/like-button';
import ShoppingCartButton from '../common/shopping-cart-button';
import { Box, Button, IconButton, Typography } from '@mui/material';
import SvgColor from 'src/components/svg-color';
import { useHandleBanner } from 'src/api/banner';
import { useEffect } from 'react';

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
        bgcolor: '#fff',
        height: {
          xs: HEADER.H_MOBILE,
          md: HEADER.H_DESKTOP,
        },
        transition: theme.transitions.create(['height'], {
          easing: theme.transitions.easing.easeInOut,
          duration: theme.transitions.duration.shorter,
        }),
        ...(offsetTop && {
          ...bgBlur({
            color: theme.palette.background.default,
          }),
          // height: {
          //   md: HEADER.H_DESKTOP_OFFSET,
          // },
        }),
      }}
    >{children}</Toolbar>
  )
}

export default function Header({ toggleBanner }: any) {

  const mdUp = useResponsive('up', 'md');

  const offsetTop = useOffSetTop(HEADER.H_DESKTOP);

  const { showBanner, toggle } = useHandleBanner();

  useEffect(() => {
    toggleBanner(showBanner)
  }, [showBanner])

  return (
    <>
      <Button onClick={() => toggle()} sx={{ position: 'absolute', zIndex: 10 }}>t</Button>
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
      <StyledToolbar>
        <Container maxWidth={'xl'} sx={{ height: 1, display: 'flex', alignItems: 'center', borderBottom: '1px solid #D1D1D1' }}>
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
            {mdUp && <LoginButton />}
            {mdUp && <PriceListButton />}

            {/* <SettingsButton
              sx={{
                ml: { xs: 1, md: 0 },
                mr: { md: 2 },
              }}
            /> */}
            {!mdUp && <NavMobile data={navDesktopConfig} />}
          </Stack>
        </Container>
      </StyledToolbar>

      {/* {offsetTop && <HeaderShadow />} */}
    </>
  );
}
