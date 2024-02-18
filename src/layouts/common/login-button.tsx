import Button from '@mui/material/Button';
import { Theme, SxProps } from '@mui/material/styles';

import { RouterLink } from 'src/routes/components';

import { PATH_AFTER_LOGIN } from 'src/config-global';
import { IconButton, Stack } from '@mui/material';
import SvgColor from 'src/components/svg-color';

// ----------------------------------------------------------------------

type Props = {
  sx?: SxProps<Theme>;
};

export default function LoginButton({ sx }: Props) {
  return (
    <Button component={RouterLink} href={PATH_AFTER_LOGIN} sx={{
      mr: 1,
      borderRadius: '24px',
      '&:hover': {
        backgroundColor: "#F2F2F2"
      },
      ...sx
    }}
    >
      <SvgColor
        src={`/assets/icons/auth/login-signup.svg`}
        sx={{ width: 24, height: 24, mr: 1 }}
      />
      ثبت نام / ورود
    </Button>
  );
}
