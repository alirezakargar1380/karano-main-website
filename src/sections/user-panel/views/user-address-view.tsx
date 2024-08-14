import { Box, IconButton, Stack, Typography } from "@mui/material";
import { useGetAddresses } from "src/api/address";
import { DialogWithButton } from "src/components/custom-dialog";
import Image from "src/components/image";
import { StyledRoundedWhiteButton } from "src/components/styles/props/rounded-white-button";
import SvgColor from "src/components/svg-color";
import { useBoolean } from "src/hooks/use-boolean";
import NewUserForm from "../new-address-form";
import AddressItem from "../address-item";
import { useCallback, useState } from "react";
import { IAddressItem } from "src/types/address";

export default function UserAddressView() {
    const [address, setAddress] = useState<IAddressItem>()
    const dialog = useBoolean();

    const { addresses, addressesEmpty } = useGetAddresses();

    const handleEditRow = useCallback((id: number) => {
        setAddress(addresses.find((add) => add.id === id))
        dialog.onTrue()
    }, [addresses])

    return (
        <Box sx={{
            border: (theme) => `1px solid #A9A9A9`,
            borderRadius: '16px',
            mb: 10
        }}>

            <DialogWithButton fullWith={false} dialog={dialog} width={960}>
                <Box p={2}>
                    <NewUserForm
                        currentAddress={address}
                    />
                </Box>
            </DialogWithButton>

            <Stack direction="row" justifyContent="space-between" spacing={1} sx={{
                mx: 2,
                my: 2,
                borderBottom: (theme) => `1px solid ${theme.palette.divider}`
            }}>
                <Typography variant="subtitle1" sx={{ fontFamily: 'peyda-bold', pt: 1 }}>
                    آدرس های ثبت شده
                </Typography>
                <StyledRoundedWhiteButton onClick={dialog.onTrue} variant="outlined" sx={{ mb: 2, color: '#0B7BA7', borderColor: "#0B7BA7!important" }}>
                    <SvgColor src="/assets/icons/user-panel/plus.svg" sx={{ mr: 0.75, width: 20 }} />
                    آدرس جدید
                </StyledRoundedWhiteButton>
            </Stack>
            {addressesEmpty ?
                <Box sx={{ textAlign: 'center' }}>
                    <Image src="/assets/images/user-panel/Empty-State-address.png" />
                </Box>
                : null}
            { }
            <Box px={2}>
                {addresses.map((address, index) => (
                    <AddressItem
                        row={address}
                        onEditRow={() => handleEditRow(address.id)}
                    />
                ))}
            </Box>
        </Box>
    )
}