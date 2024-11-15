import { Box, IconButton, Stack, Typography } from "@mui/material";
import { useGetAddresses } from "src/api/address";
import { DialogWithButton } from "src/components/custom-dialog";
import Image from "src/components/image";
import { SecondaryButton } from "src/components/styles/buttons/secondary";
import SvgColor from "src/components/svg-color";
import { useBoolean } from "src/hooks/use-boolean";
import AddressItem from "../address-item";
import { useCallback, useEffect, useState } from "react";
import { IAddressItem } from "src/types/address";
import { endpoints, server_axios } from "src/utils/axios";
import { DeliveryAdressesNewEditForm } from "src/sections/order-tracking/delivery-addresses-new-edit-form";
import AddressEditDialog from "src/sections/order-tracking/address-edit-dialog";

export default function UserAddressView() {
    const [data, setData] = useState<IAddressItem[]>([])
    const [id, setId] = useState<number>()
    const [address, setAddress] = useState<IAddressItem>()
    const dialog = useBoolean();

    let { addresses, addressesEmpty, refresh } = useGetAddresses();

    useEffect(() => setData(addresses), [addresses])

    const handleEditRow = useCallback((id: number) => {
        setId(id)
        dialog.onTrue()
    }, [addresses])

    const handleDeleteRow = useCallback(async (id: number) => {
        await server_axios.delete(endpoints.addresses.delete(id))
        setData(data.filter((add) => add.id !== id))
    }, [data])

    return (
        <Box sx={{
            border: `1px solid #A9A9A9`,
            borderRadius: '16px',
            mb: 10
        }}>
            <AddressEditDialog id={id} dialog={dialog} afterAdd={refresh} />

            {/* <DialogWithButton fullWith={false} dialog={dialog} width={960}>
                <Typography variant="subtitle1" sx={{ fontFamily: 'peyda-bold', fontSize: 22, pt: 1, pb: 2, mb: '28px', borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}>
                    افزودن آدرس جدید
                </Typography>
                <DeliveryAdressesNewEditForm
                    id={id}
                    exit={() => {
                        dialog.onFalse()
                        setId(undefined)
                    }}
                />
            </DialogWithButton> */}

            <Stack direction="row" justifyContent="space-between" spacing={1} sx={{
                mx: '24px',
                pt: '24px',
                borderBottom: (theme) => `1px solid ${theme.palette.divider}`
            }}>
                <Typography variant="title2">
                    آدرس های ثبت شده
                </Typography>
                <SecondaryButton onClick={() => {
                    setAddress(undefined)
                    dialog.onTrue();
                }}
                    size="small"
                    variant="outlined"
                    sx={{ mb: 2, color: '#0B7BA7', borderColor: "#0B7BA7!important" }}
                    color="info"
                >
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
            <Box>
                {data.map((address, index) => (
                    <AddressItem
                        key={index}
                        row={address}
                        isLast={index === data.length - 1}
                        onEditRow={() => handleEditRow(address.id)}
                        onDeleteRow={() => handleDeleteRow(address.id)}
                    />
                ))}
            </Box>
        </Box>
    )
}