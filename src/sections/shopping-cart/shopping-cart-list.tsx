import { Grid, Stack, Table, TableBody, Typography } from "@mui/material";
import { Box } from "@mui/system";
import Image from "src/components/image";
import Scrollbar from "src/components/scrollbar";
import { StyledRoundedWhiteButton } from "src/components/styles/props/rounded-white-button";
import { TableHeadCustom } from "src/components/table";
import { ICheckoutItem, ICheckoutItemPropertyPrice } from "src/types/checkout";
import { ProductOrderType } from "src/types/product";
import CartTableRow from "../cart/cart-table-row";
import { useCallback, useEffect, useState } from "react";
import CartDialog from "src/components/cart/cart-dialog";
import { useCheckoutContext } from "../checkout/context";
import { useBoolean } from "src/hooks/use-boolean";

import { CartTableHead, ReadyProductCartTableHead } from "src/sections/cart/view/cart-dialog-view";
import { endpoints, server_axios } from "src/utils/axios";
import { IOrderProductPropertyStatus } from "src/types/order-products-property";

import { useSnackbar } from "src/components/snackbar";

interface Props {
    items: ICheckoutItem[]
    type: 'cart' | 'edit'
}

export default function ShoppingCartList({ items, type }: Props) {
    const checkout = useCheckoutContext()

    const [checkoutItems, setCheckoutItems] = useState<ICheckoutItem[]>(items);
    const [checkoutItem, setCheckoutItem] = useState<ICheckoutItem>();
    const [propertyId, setPropertyId] = useState<number>();
    const [property, setProperty] = useState<ICheckoutItemPropertyPrice>();
    const [list, setList] = useState<ICheckoutItemPropertyPrice[]>();

    const cartDialog = useBoolean();

    const { enqueueSnackbar } = useSnackbar();

    const handleEdit = useCallback((item: ICheckoutItem, property_ind: number) => {
        setCheckoutItem(item);
        const property = item.properties[property_ind];
        setPropertyId(property_ind);
        setList(item.properties);

        if (property)
            setProperty(property)

        cartDialog.onTrue();
    }, [setCheckoutItem, setPropertyId, setPropertyId]);

    useEffect(() => {
        setCheckoutItems(items);
    }, [items])

    const handleUpdate = useCallback((data: ICheckoutItemPropertyPrice[]) => {
        try {
            if (type === 'edit') {
                console.log(data)
            } else {
                if (!checkoutItem) return

                checkout.onAddToCart({
                    id: checkoutItem.id,
                    properties: data
                }, false)
            }
            cartDialog.onFalse();
        } catch (error) {
            console.error(error);
        }
    }, [checkoutItem]);

    const handleRemove = useCallback((itemId: number, itemIndex: number, propertyIndex: number) => {
        checkout.onDeleteCart(itemId, itemIndex, propertyIndex)
    }, []);

    const handleUpdateRow = useCallback((data: ICheckoutItemPropertyPrice) => {
        try {
            if (data.status === IOrderProductPropertyStatus.normal)
                return enqueueSnackbar('فقط امکان ویرایش موارد رد شده را دارید!');

            const updatedCheckoutItems = [...checkoutItems];
            const index = updatedCheckoutItems.findIndex((checkout) => checkout.id === checkoutItem?.id)
            const item = updatedCheckoutItems[index];
            const pIndex = item.properties.findIndex((property) => property.id === data.id)
            updatedCheckoutItems[index].properties[pIndex] = {
                ...data,
                // status: IOrderProductPropertyStatus.denied,
                status: IOrderProductPropertyStatus.edited
            };
            console.log(updatedCheckoutItems[index].properties[pIndex])
            setCheckoutItems(updatedCheckoutItems)

            server_axios.patch(endpoints.orderProductProperties.update(data.id), {
                ...data,
                // status: IOrderProductPropertyStatus.denied
                status: IOrderProductPropertyStatus.edited
            })
                .then(({ data }) => {
                    console.log(data)
                })
            cartDialog.onFalse();
        } catch (error) {
            console.error(error);
        }
    }, [setCheckoutItems, checkoutItem]);

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
                    handleUpdateRow={(type === 'edit') ? handleUpdateRow : undefined}
                    currentData={property}
                />
            )}
            {checkoutItems.map((item, index: number) => (
                <Grid container spacing={2} sx={{ py: 4 }} key={index}>
                    {item.coverUrl ? <Grid item sm={2} /> : null}
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
                                            onDeleteRow={() => handleRemove(item.id, index, ind)}
                                            onEditRow={(item.order_type === ProductOrderType.custom_made) ? () => handleEdit(item, ind) : undefined}
                                            key={ind * 2}
                                            row={{
                                                id: property_price?.id,
                                                status: property_price?.status,
                                                quality: property_price?.quantity,
                                                coating: property_price?.coating_type || '',
                                                dimensions: (property_price?.dimension) ? property_price?.dimension?.width + 'x' + property_price?.dimension?.height : '-',
                                                final_coating: property_price?.cover_type?.name,
                                                frame_type: property_price?.frame_type?.name,
                                                profile_type: property_price?.profile_type?.name,
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