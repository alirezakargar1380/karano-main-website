import Button from '@mui/material/Button';
import { Theme, SxProps } from '@mui/material/styles';

import { RouterLink } from 'src/routes/components';

import { PATH_AFTER_LOGIN } from 'src/config-global';

// ----------------------------------------------------------------------

type Props = {
  sx?: SxProps<Theme>;
};

export default function PriceListButton({ sx }: Props) {
  return (
    <Button component={RouterLink} href={PATH_AFTER_LOGIN} variant="outlined"
      sx={{
        mr: 1,
        borderRadius: '24px',
        borderColor: "#D1D1D1",
        '&:hover': {
          borderColor: "#727272",
          backgroundColor: "transparent"
        },
        ...sx
      }}>
      دانلود لیست قیمت
    </Button>
  );
}
