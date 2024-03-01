import Button from '@mui/material/Button';
import { Theme, SxProps } from '@mui/material/styles';

import { RouterLink } from 'src/routes/components';

import { PATH_AFTER_LOGIN } from 'src/config-global';
import { Box, IconButton, MenuItem, Stack, Typography } from '@mui/material';
import SvgColor from 'src/components/svg-color';
import CustomPopover, { usePopover } from 'src/components/custom-popover';
import { paths } from 'src/routes/paths';

// ----------------------------------------------------------------------

type Props = {
  sx?: SxProps<Theme>;
};

export default function LoginButton({ sx }: Props) {
  const popover = usePopover();

  // if user was not login
  return (
    <Button
      component={RouterLink}
      href={paths.auth.phone.login}
      sx={{
        mr: 1,
        borderRadius: '24px',
        '&:hover': {
          backgroundColor: '#F2F2F2'
        },
        ...(popover.open && {
          border: '1px solid #000',
          backgroundColor: '#F2F2F2'
        }),
        ...sx
      }}
    >
      <SvgColor
        src={`/assets/icons/auth/login-signup.svg`}
        sx={{ width: 24, height: 24, mr: 1 }}
      />
      ثبت نام / ورود
    </Button>
  )

  return (
    <>
      <Button
        // component={RouterLink}
        // href={PATH_AFTER_LOGIN} sx={{
        //   mr: 1,
        //   borderRadius: '24px',
        //   '&:hover': {
        //     backgroundColor: "#F2F2F2"
        //   },
        //   ...sx
        // }}
        onClick={popover.onOpen}
        sx={{
          mr: 1,
          borderRadius: '24px',
          '&:hover': {
            backgroundColor: '#F2F2F2'
          },
          ...(popover.open && {
            border: '1px solid #000',
            backgroundColor: '#F2F2F2'
          }),
          ...sx
        }}
      >
        <SvgColor
          src={`/assets/icons/auth/login-signup.svg`}
          sx={{ width: 24, height: 24, mr: 1 }}
        />
        ثبت نام / ورود
      </Button>

      <CustomPopover open={popover.open} hiddenArrow onClose={popover.onClose} sx={{ width: 200, p: 0, mt: 4 }}>
        <Box sx={{ p: 2, pb: 1.5, borderBottom: '1px solid #D1D1D1' }}>
          <Typography variant="subtitle2" noWrap>
            Alireza Kargar
          </Typography>
        </Box>

        {/* <Divider sx={{ borderStyle: 'dashed' }} /> */}

        {/* <Stack sx={{ p: 1 }}>
          {OPTIONS.map((option) => (
            <MenuItem key={option.label} onClick={() => handleClickItem(option.linkTo)}>
              {option.label}
            </MenuItem>
          ))}
        </Stack> */}

        {/* <Divider sx={{ borderStyle: 'dashed' }} /> */}

        <MenuItem
          // onClick={handleLogout}
          sx={{ m: 1, fontWeight: 'fontWeightBold', color: 'error.main' }}
        >
          Logout
        </MenuItem>
      </CustomPopover>
    </>
  );
}
