import { Theme, SxProps } from '@mui/material/styles';

import { RouterLink } from 'src/routes/components';

import { SecondaryButton } from 'src/components/styles/buttons/secondary';
import { paths } from 'src/routes/paths';

// ----------------------------------------------------------------------

type Props = {
  sx?: SxProps<Theme>;
};

export default function PriceListButton({ sx }: Props) {
  return (
    <SecondaryButton size='small' component={RouterLink} href={paths.priceList} variant="outlined">
        دانلود لیست قیمت
    </SecondaryButton>
  );
}
