import { Grid, Stack, Table, TableBody, Typography } from "@mui/material";
import { Box } from "@mui/system";
import Image from "src/components/image";
import Scrollbar from "src/components/scrollbar";
import { StyledRoundedWhiteButton } from "src/components/styles/props/rounded-white-button";
import { TableHeadCustom } from "src/components/table";
import { ICheckoutItem, ICheckoutItemPropertyPrice } from "src/types/checkout";
import { ProductOrderType } from "src/types/product";
import CartTableRow from "../cart/cart-table-row";
import { useCallback, useState } from "react";
import CartDialog from "src/components/cart/cart-dialog";
import { useCheckoutContext } from "../checkout/context";
import { useBoolean } from "src/hooks/use-boolean";

import { CartTableHead, ReadyProductCartTableHead } from "src/sections/cart/view/cart-dialog-view";


interface Props {
    items: ICheckoutItem[]
}

export default function ShoppingCartList({ items }: Props) {
    const checkout = useCheckoutContext()

    const [checkoutItem, setCheckoutItem] = useState<ICheckoutItem>();
    const [propertyId, setPropertyId] = useState<number>();
    const [property, setProperty] = useState<ICheckoutItemPropertyPrice>();
    const [list, setList] = useState<ICheckoutItemPropertyPrice[]>();

    const cartDialog = useBoolean();

    const handleEdit = useCallback((item: ICheckoutItem, property_ind: number) => {
        setCheckoutItem(item);
        const property = item.properties[property_ind];
        setPropertyId(property_ind);
        setList(item.properties);
        // setList(item.property_prices.map((prop) => { 
        //     return {
        //         ...prop,
        //         cover_type: prop.cover_type.name,
        //         profile_type: prop.profile_type.name,
        //         frame_type: prop.frame_type.name
        // }
        if (property)
            setProperty(property)

        cartDialog.onTrue();
    }, [setCheckoutItem]);

    const handleUpdate = useCallback((data: ICheckoutItemPropertyPrice[]) => {
        try {
            if (!checkoutItem) return

            checkout.onAddToCart({
                id: checkoutItem.id,
                properties: data
            }, false)

            console.log(data)
            cartDialog.onFalse();
        } catch (error) {
            console.error(error);
        }
    }, [checkoutItem]);

    return (
        <Box>
            {checkoutItem && (
                <CartDialog
                    dialog={cartDialog}
                    order_form_id={checkoutItem.order_form_id}
                    product_name={checkoutItem.name}
                    listId={propertyId}
                    listData={list}
                    onAddCart={handleUpdate}
                    currentData={property}
                />
            )}
            {items.map((item, index: number) => (
                <Grid container spacing={2} sx={{ py: 4 }} key={index}>
                    {item.coverUrl? <Grid item sm={2} /> : null}
                    <Grid item sm={10}>
                        <Stack direction={'row'} spacing={2}>
                            <Typography fontFamily={'peyda-bold'} sx={{ pt: 1 }}>{item.name}</Typography>
                            <StyledRoundedWhiteButton variant="outlined">مشاهده تاریخچه</StyledRoundedWhiteButton>
                        </Stack>
                    </Grid>
                    {(item.coverUrl) && (
                        <Grid item sm={2} sx={{ pt: 2 }}>
                            <Image src={item.coverUrl} sx={{ border: '1px solid #D1D1D1', borderRadius: '8px' }} />
                        </Grid>
                    )}
                    <Grid item sm={item.coverUrl ? 10 : 12} sx={{ pt: 2 }}>
                        <Scrollbar sx={{ maxHeight: 680 }}>
                            <Table size={'medium'} sx={{ minWidth: 780 }}>
                                <TableHeadCustom
                                    sx={{
                                        backgroundColor: '#F2F2F2'
                                    }}
                                    headLabel={(item.order_type === ProductOrderType.custom_made) ? CartTableHead : ReadyProductCartTableHead}
                                />

                                <TableBody>
                                    {item.properties?.map((property_price, ind: number) => (
                                        <CartTableRow
                                            onDeleteRow={() => { }}
                                            onEditRow={() => handleEdit(item, ind)}
                                            key={ind * 2}
                                            row={{
                                                quality: property_price?.quantity,
                                                coating: property_price?.coating_type || '',
                                                dimensions: (property_price?.dimention) ? property_price?.dimention?.width + 'x' + property_price?.dimention?.height : '-',
                                                final_coating: property_price?.cover_type?.name,
                                                frame_type: property_price?.frame_type?.name || '',
                                                profile_type: property_price?.profile_type?.name || '-',
                                            }}
                                        />
                                    ))}
                                </TableBody>
                            </Table>
                        </Scrollbar>
                    </Grid>
                </Grid>
            ))}
        </Box>
    )
}