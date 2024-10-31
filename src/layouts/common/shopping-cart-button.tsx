import Button from '@mui/material/Button';
import { Theme, SxProps } from '@mui/material/styles';

import { RouterLink } from 'src/routes/components';

import { PATH_AFTER_LOGIN } from 'src/config-global';
import SvgColor from 'src/components/svg-color';
import Badge, { badgeClasses } from '@mui/material/Badge';
import Label from 'src/components/label';
import { Box, IconButton, Stack, Typography } from '@mui/material';
import { paths } from 'src/routes/paths';
import { useCheckoutContext } from 'src/sections/checkout/context';
import { useEffect } from 'react';
import CustomPopover, { usePopover } from 'src/components/custom-popover';
import { PrimaryButton } from 'src/components/styles/buttons/primary';
import ShoppingCartList from 'src/sections/shopping-cart/shopping-cart-list';

// ----------------------------------------------------------------------

type Props = {
    sx?: SxProps<Theme>;
};

export default function ShoppingCartButton({ sx }: Props) {
    const checkout = useCheckoutContext();

    const popover = usePopover();

    return (
        <>
            <Button onClick={popover.onOpen}
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
                            {checkout.totalItems}
                        </Label>
                    }
                >
                    <SvgColor src={`/assets/icons/header/shopping-cart-icon.svg`} sx={{ color: '#727272' }} />
                </Badge>
            </Button>
            <CustomPopover
                open={popover.open}
                arrow='top-right'
                transformOrigin={{
                    horizontal: 'left',
                    vertical: 'top',
                }}
                onClose={popover.onClose}
                sx={{ width: 304, mt: 6, mr: -5, p: '24px', height: 'fit-content', bgcolor: 'white' }}
            >
                <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'} borderBottom={'1px solid #D1D1D1'} pb={'16px'}>
                    <Box display={'flex'} alignItems={'center'} gap={'4px'}>
                        <Typography variant='title3'>سبد خرید</Typography>
                        <Typography variant='body3' color={'#2B2B2B'}>({checkout.totalItems} کالا)</Typography>
                    </Box>
                    <IconButton onClick={popover.onClose}>
                        <SvgColor src="/assets/icons/navbar/x-close.svg" sx={{ width: 16, height: 16 }} />
                    </IconButton>
                </Stack>
                <Box sx={{ pb: '16px', borderBottom: '1px solid #D1D1D1' }} display={'flex'}>
                    <ShoppingCartList type='cart' items={checkout.items} isMini />
                </Box>
                <Box sx={{ textAlign: 'right', mt: '16px' }}>
                    <PrimaryButton size='small' component={RouterLink} href={paths.shoppingCart}>
                        مشاهده سبد خرید
                    </PrimaryButton>
                </Box>

            </CustomPopover>
        </>

    );
}
