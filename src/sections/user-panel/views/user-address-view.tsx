import { Box, IconButton, Stack, Typography } from "@mui/material";
import { useGetAddresses } from "src/api/address";
import { DialogWithButton } from "src/components/custom-dialog";
import Image from "src/components/image";
import { SecondaryButton } from "src/components/styles/buttons/secondary";
import SvgColor from "src/components/svg-color";
import { useBoolean } from "src/hooks/use-boolean";
import NewUserForm from "../new-address-form";
import AddressItem from "../address-item";
import { useCallback, useEffect, useState } from "react";
import { IAddressItem } from "src/types/address";
import { endpoints, server_axios } from "src/utils/axios";

export default function UserAddressView() {
    const [data, setData] = useState<IAddressItem[]>([])
    const [address, setAddress] = useState<IAddressItem>()
    const dialog = useBoolean();

    let { addresses, addressesEmpty } = useGetAddresses();

    useEffect(() => setData(addresses), [addresses])

    const handleEditRow = useCallback((id: number) => {
        setAddress(addresses.find((add) => add.id === id))
        dialog.onTrue()
    }, [addresses])

    const handleDeleteRow = useCallback(async (id: number) => {
        await server_axios.delete(endpoints.addresses.delete(id))
        setData(data.filter((add) => add.id !== id))
    }, [data])

    const handleAddAddress = useCallback(async (address: IAddressItem) => {
        let newData = [...data];
        newData.push(address)
        setData(newData)
    }, [data])

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
                        dialog={dialog}
                        onNewAddress={(add) => handleAddAddress(add)}
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
                <SecondaryButton onClick={() => {
                    setAddress(undefined)
                    dialog.onTrue();
                }} variant="outlined" sx={{ mb: 2, color: '#0B7BA7', borderColor: "#0B7BA7!important" }}>
                    <SvgColor src="/assets/icons/user-panel/plus.svg" sx={{ mr: 0.75, width: 20 }} />
                    آدرس جدید
                </SecondaryButton>
            </Stack>
            {(addressesEmpty || !data.length) ?
                <Box sx={{ textAlign: 'center' }}>
                    <Image src="/assets/images/user-panel/Empty-State-address.png" />
                </Box>
                : null}
            { }
            <Box px={2}>
                {data.map((address, index) => (
                    <AddressItem
                        row={address}
                        onEditRow={() => handleEditRow(address.id)}
                        onDeleteRow={() => handleDeleteRow(address.id)}
                    />
                ))}
            </Box>
        </Box>
    )
}