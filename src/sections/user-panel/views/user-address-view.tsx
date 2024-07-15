import { Box, IconButton, Stack, Typography } from "@mui/material";
import { useGetAddresses } from "src/api/address";
import Image from "src/components/image";
import { StyledRoundedWhiteButton } from "src/components/styles/props/rounded-white-button";
import SvgColor from "src/components/svg-color";

export default function UserAddressView() {

    const { addresses, addressesEmpty } = useGetAddresses();

    return (
        <Box sx={{
            border: (theme) => `1px solid #A9A9A9`,
            borderRadius: '16px',
            mb: 10
        }}>
            <Stack direction="row" justifyContent="space-between" spacing={1} sx={{
                mx: 2,
                my: 2,
                borderBottom: (theme) => `1px solid ${theme.palette.divider}`
            }}>
                <Typography variant="subtitle1" sx={{ fontFamily: 'peyda-bold' }}>
                    آدرس های ثبت شده
                </Typography>
                <StyledRoundedWhiteButton variant="outlined" sx={{ mb: 1, color: 'blue' }}>
                    آدرس جدید
                </StyledRoundedWhiteButton>
            </Stack>
            {addressesEmpty ?
                <Box sx={{ textAlign: 'center' }}>
                    <Image src="/assets/images/user-panel/Empty-State-address.png" />
                </Box>
                : null}
            { }
            <Box p={2}>
                {addresses.map((address, index) => (
                    <Stack justifyContent={'space-between'} py={2} alignItems={'start'} direction={'row'} key={index} borderBottom={(index !== addresses.length-1) ? (theme) => `1px solid ${theme.palette.divider}` : ''}>
                        <Stack spacing={1.5}>
                            <Stack direction={'row'} spacing={1}>
                                <Typography color={'text.secondary'}>آدرس پستی:</Typography>
                                <Typography>{address.address}</Typography>
                            </Stack>
                            <Stack direction={'row'} spacing={1}>
                                <Typography color={'text.secondary'}>استان:</Typography>
                                <Typography>{address.provice}</Typography>
                            </Stack>
                            <Stack direction={'row'} spacing={1}>
                                <Typography color={'text.secondary'}>شهر:</Typography>
                                <Typography>{address.city}</Typography>
                            </Stack>
                            <Stack direction={'row'} spacing={1}>
                                <Typography color={'text.secondary'}>کد پستی:</Typography>
                                <Typography>7899</Typography>
                            </Stack>
                        </Stack>
                        <IconButton
                            // onClick={popover.onOpen} 
                            sx={{ p: 0 }}
                        >
                            <SvgColor src="/assets/icons/cart/more-option.svg" />
                        </IconButton>
                    </Stack>
                ))}
            </Box>
        </Box>
    )
}