import { useEffect } from 'react';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Drawer from '@mui/material/Drawer';

import { usePathname } from 'src/routes/hooks';

import { useResponsive } from 'src/hooks/use-responsive';
import { useMockedUser } from 'src/hooks/use-mocked-user';

import Logo from 'src/components/logo';
import Scrollbar from 'src/components/scrollbar';
import { NavSectionVertical } from 'src/components/admin-panel-nav-section';

import { NAV } from '../config-layout';
import { useNavData } from './config-navigation';
import { Avatar, Typography } from '@mui/material';
import { useAuthContext } from 'src/auth/hooks';
import { EAdminRole } from 'src/types/admin';
import { adminRoleTranslate } from 'src/utils/admin-role';
import NavToggleButton from '../common/nav-toggle-button';

// ----------------------------------------------------------------------

type Props = {
  openNav: boolean;
  onCloseNav: VoidFunction;
};

export default function NavVertical({ openNav, onCloseNav }: Props) {
  const { admin, logout } = useAuthContext();

  const pathname = usePathname();

  // const lgUp = true;
  const lgUp = useResponsive('up', 'lg');

  const navData = useNavData();

  useEffect(() => {
    if (openNav) {
      onCloseNav();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const renderContent = (
    <Scrollbar
      sx={{
        height: 1,
        // width: 320,
        '& .simplebar-content': {
          height: 1,
          display: 'flex',
          flexDirection: 'column',
        },
      }}
    >
      <Box sx={{ mx: 2, borderBottom: (theme) => `solid 1px ${theme.palette.divider}` }}>
        <Logo sx={{ mt: 3, ml: 0, mb: 3 }} />
      </Box>

      <Box sx={{ mx: 2, py: 4, borderBottom: (theme) => `solid 1px ${theme.palette.divider}` }}>
        <Stack direction="row" spacing={0} sx={{}}>
          <Box sx={{}}>
            <Avatar sx={{ mx: 2, border: `solid 8px #F8F8F8`, width: 80, height: 80 }} src={''} />
          </Box>
          <Box>
            <Typography variant="h6">{admin?.fullName}</Typography>
            <Typography variant="body2" sx={{
              bgcolor: '#F2F2F2', borderRadius: '8px', px: 1, mt: 1
            }}>
              دسترسی:
              {adminRoleTranslate(admin?.role || '')}
            </Typography>
          </Box>
        </Stack>
      </Box>

      <NavSectionVertical
        data={navData}
        slotProps={{
          currentRole: admin?.role,
          gap: 16
        }}
      />

      <Box sx={{ flexGrow: 1 }} />

      <Box sx={{ mx: 2, borderTop: (theme) => `solid 1px ${theme.palette.divider}`, pt: 4 }}>
        {/* <Logo sx={{ mt: 3, ml: 0, mb: 3 }} /> */}
        <Typography  variant='body1' fontFamily={'peyda-bold'} mb={3} color={"#727272"} sx={{ cursor: "pointer" }}>تنظیمات پروفایل</Typography>
        {/* <br /> */}
        <Typography onClick={() => logout()} variant='body1' fontFamily={'peyda-bold'} mb={3} color={"#727272"} sx={{ cursor: "pointer" }}>خروج از حساب کاربری</Typography>
      </Box>

    </Scrollbar>
  );

  return (
    <Box
      sx={{
        flexShrink: { lg: 0 },
        width: { lg: NAV.W_VERTICAL },
      }}
    >
      {/* <NavToggleButton /> */}

      {lgUp ? (
        <Stack
          sx={{
            height: 1,
            position: 'fixed',
            width: NAV.W_VERTICAL,
            borderRight: (theme) => `solid 1px ${theme.palette.divider}`,
          }}
        >
          {renderContent}
        </Stack>
      ) : (
        <Drawer
          open={openNav}
          onClose={onCloseNav}
          PaperProps={{
            sx: {
              width: NAV.W_VERTICAL,
            },
          }}
        >
          {renderContent}
        </Drawer>
      )}
    </Box>
  );
}
