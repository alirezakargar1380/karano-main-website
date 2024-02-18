import Button from '@mui/material/Button';
import { Theme, SxProps } from '@mui/material/styles';

import { RouterLink } from 'src/routes/components';

import { PATH_AFTER_LOGIN } from 'src/config-global';
import { IconButton } from '@mui/material';
import SvgColor from 'src/components/svg-color';

// ----------------------------------------------------------------------

type Props = {
    sx?: SxProps<Theme>;
};

export default function SearchButton({ sx }: Props) {
    return (
        <Button component={RouterLink} href={PATH_AFTER_LOGIN}
            sx={{
                p: 0,
                minWidth: 'fit-content',
                '&:hover': {},
                ...sx
            }}>
            <SvgColor src={`/assets/icons/header/search-icon.svg`} sx={{ color: '#727272' }} />
        </Button>
    );
}
