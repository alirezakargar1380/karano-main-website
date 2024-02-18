import Button from '@mui/material/Button';
import { Theme, SxProps } from '@mui/material/styles';

import { RouterLink } from 'src/routes/components';

import { PATH_AFTER_LOGIN } from 'src/config-global';
import { StyledCalendar } from 'src/sections/calendar/styles';
import { StyledRoundedWhiteButton } from 'src/components/styles/props/rounded-white-button';

// ----------------------------------------------------------------------

type Props = {
  sx?: SxProps<Theme>;
};

export default function PriceListButton({ sx }: Props) {
  return (
    <StyledRoundedWhiteButton component={RouterLink} href={'/'} variant="outlined">
      دانلود لیست قیمت
    </StyledRoundedWhiteButton>
  );
}
