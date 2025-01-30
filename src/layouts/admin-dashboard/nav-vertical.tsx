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
import SvgColor from 'src/components/svg-color';
import { useBooleanReturnType } from 'src/hooks/use-boolean';

// ----------------------------------------------------------------------

type Props = {
  dialog: useBooleanReturnType;
  openNav: boolean;
  onCloseNav: VoidFunction;
};

export default function NavVertical({ dialog, openNav, onCloseNav }: Props) {
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
        '& .simplebar-content': {
          height: 1,
          display: 'flex',
          flexDirection: 'column',
        },
      }}
    >
      <Box
        sx={{
          borderBottom: (theme) => `solid 1px ${theme.palette.divider}`,
          // height: 'fit-content'
          display: 'flex'
        }}
      >
        <Logo sx={{ ml: '20px', my: '24px' }} />
      </Box>

      <Box sx={{ py: 4, borderBottom: (theme) => `solid 1px ${theme.palette.divider}` }}>
        <Stack direction="row" spacing={0}>
          <Box>
            <Avatar sx={{ mx: 2, border: `solid 8px #F8F8F8`, width: 80, height: 80 }} src={''} />
          </Box>
          <Box>
            <Typography variant="body1">{admin?.fullName}</Typography>
            <Typography variant="body3" sx={{
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

      <Box sx={{ px: 2, mb: '24px', borderTop: (theme) => `solid 1px ${theme.palette.divider}`, pt: 4 }}>

        <Stack direction="row" spacing={0} mb={3} alignItems={'center'} onClick={() => dialog.onTrue()}>
          <SvgColor src='/assets/icons/admin-panel/settings-02.svg' color={"#727272"} sx={{ mr: 1 }} />
          <Typography variant='body3' color={"#727272"} sx={{ cursor: "pointer" }}>
            تنظیمات پروفایل
          </Typography>
        </Stack>

        <Stack direction="row" spacing={0} alignItems={'center'}>
          <SvgColor src='/assets/icons/admin-panel/log-out-01.svg' color={"#727272"} sx={{ mr: 1 }} />
          <Typography onClick={() => logout()} variant='body3' color={"#727272"} sx={{ cursor: "pointer" }}>
            خروج از حساب کاربری
          </Typography>
        </Stack>

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
