import Button from '@mui/material/Button';
import { Theme, SxProps } from '@mui/material/styles';

import { RouterLink } from 'src/routes/components';

import { PATH_AFTER_LOGIN } from 'src/config-global';
import { IconButton } from '@mui/material';
import SvgColor from 'src/components/svg-color';
import { paths } from 'src/routes/paths';

// ----------------------------------------------------------------------

type Props = {
    sx?: SxProps<Theme>;
};

export default function LikeButton({ sx }: Props) {
    return (
        <Button component={RouterLink} href={paths.user_dashboard.root + `?tab=favorites`}
            sx={{
                ml: 1.7,
                p: 0,
                minWidth: 'fit-content',
                '&:hover': {},
                ...sx
            }}>
            <SvgColor src={`/assets/icons/header/like-icon.svg`} sx={{ color: '#727272' }} />
        </Button>
    );
}
