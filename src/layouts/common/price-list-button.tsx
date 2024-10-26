import { Theme, SxProps } from '@mui/material/styles';

import { RouterLink } from 'src/routes/components';

import { SecondaryButton } from 'src/components/styles/buttons/secondary';

// ----------------------------------------------------------------------

type Props = {
  sx?: SxProps<Theme>;
};

export default function PriceListButton({ sx }: Props) {
  return (
    <SecondaryButton size='small' component={RouterLink} href={'/'} variant="outlined">
        دانلود لیست قیمت
    </SecondaryButton>
  );
}
