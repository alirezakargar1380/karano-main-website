import Button from '@mui/material/Button';
import { Theme, SxProps } from '@mui/material/styles';

import { RouterLink } from 'src/routes/components';

import { PATH_AFTER_LOGIN } from 'src/config-global';
import SvgColor from 'src/components/svg-color';
import Badge, { badgeClasses } from '@mui/material/Badge';
import Label from 'src/components/label';
import { Typography } from '@mui/material';
import { paths } from 'src/routes/paths';
import { useCheckoutContext } from 'src/sections/checkout/context';
import { useEffect } from 'react';

// ----------------------------------------------------------------------

type Props = {
    sx?: SxProps<Theme>;
};

export default function ShoppingCartButton({ sx }: Props) {
    const checkout = useCheckoutContext();

    return (
        <Button component={RouterLink} href={paths.shoppingCart}
            sx={{
                ml: 1.7,
                p: 0,
                minWidth: 'fit-content',
                '&:hover': {},
                ...sx
            }}>
            <Badge
                sx={{
                    [`& .${badgeClasses.badge}`]: {
                        top: 0,
                        right: 24,
                    },
                }}
                badgeContent={
                    <Label sx={{
                        p: 0,
                        pt: 0.25,
                        backgroundColor: "#000",
                        color: 'white',
                        borderRadius: '100%',
                        minWidth: 20,
                        height: 20
                    }}>
                        {/* {checkout.totalItems} */}
                        {checkout.totalItems}
                    </Label>
                }
            >
                <SvgColor src={`/assets/icons/header/shopping-cart-icon.svg`} sx={{ color: '#727272' }} />
            </Badge>
        </Button>
    );
}
