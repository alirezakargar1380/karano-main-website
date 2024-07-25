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
import { set } from "lodash";

interface Props {
    items: ICheckoutItem[]
    type: 'cart' | 'edit'
    canConfirm?: (can: boolean) => void
}

export default function ShoppingCartList({ items, type, canConfirm }: Props) {
    const checkout = useCheckoutContext()

    const [checkoutItems, setCheckoutItems] = useState<ICheckoutItem[]>(items);
    const [checkoutItem, setCheckoutItem] = useState<ICheckoutItem>();
    const [propertyId, setPropertyId] = useState<number>();
    const [property, setProperty] = useState<ICheckoutItemPropertyPrice>();
    const [list, setList] = useState<ICheckoutItemPropertyPrice[]>();

    const cartDialog = useBoolean();

    const { enqueueSnackbar } = useSnackbar();

    const handleEdit = useCallback((item: ICheckoutItem, property_ind?: number) => {
        setCheckoutItem(item);
        setList(item.properties);

        if (property_ind !== undefined) {
            const property = item.properties[property_ind];
            setPropertyId(property_ind);
            if (property)
                setProperty(property)
        }

        cartDialog.onTrue();
    }, [setCheckoutItem, setPropertyId, setPropertyId]);

    useEffect(() => {
        setCheckoutItems(items);
    }, [items, setList]);

    const handleUpdate = useCallback((data: ICheckoutItemPropertyPrice[]) => {
        try {
            if (type === 'edit') {
                // console.log(data)
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

    const handleRemoveCart = useCallback((itemId: number, itemIndex: number, propertyIndex: number) => {
        checkout.onDeleteCart(itemId, propertyIndex)
    }, []);

    const handleRemove = useCallback(async (propertyId: number) => {
        const p = checkoutItems.find((item) => item.properties.find((p) => p.id === propertyId))
        console.log(p)
        if (p?.properties.find((pp) => pp.status === IOrderProductPropertyStatus.approve && pp.id === propertyId))
            return enqueueSnackbar('این مورد تایید شده است، نمیتوانید حذف کنید', { variant: 'error' });

        await server_axios.delete(endpoints.orderProductProperties.delete(propertyId));
        let up = checkoutItems.map((item) => {
            item.properties = item.properties.filter((property) => property.id !== propertyId)
            return item
        });
        up = up.filter((item) => item.properties.length > 0)
        setCheckoutItems(up)
        if (!list?.length) return setList([]);
        if (list.length === 1) return setList([]);
        let newList = list.filter((p) => p.id !== propertyId);
        setList([...newList]);
    }, [list, checkoutItems]);

    const handleUpdateRow = useCallback(async (data: ICheckoutItemPropertyPrice[]) => {
        try {
            // OLD Code
            const updatedCheckoutItems = [...checkoutItems];
            let index = updatedCheckoutItems.findIndex((checkout) => checkout.id === checkoutItem?.id);
            updatedCheckoutItems[index].properties = [...data];
            // OLD Code

            // you have to check disabling of confirm button before update checkout item
            handleCanDelete();

            await new Promise((resolve) => setTimeout(resolve, 250));
            setCheckoutItems([...updatedCheckoutItems]);

            cartDialog.onFalse();
        } catch (error) {
            console.error(error);
        }
    }, [setCheckoutItems, checkoutItems, checkoutItem]);

    const handleCanDelete = () => {
        let can = false
        for (let i = 0; i < checkoutItems.length; i++) {
            const element = checkoutItems[i];
            for (let j = 0; j < element.properties.length; j++) {
                const p = element.properties[j];
                if (p.status === IOrderProductPropertyStatus.denied) can = true
            }
        }
        if (canConfirm) canConfirm(can)
    }

    useEffect(() => {
        handleCanDelete();
    }, []);

    return (
        <Box>
            {checkoutItem && (
                <CartDialog
                    dialog={cartDialog}
                    order_form_id={checkoutItem.order_form_id}
                    product_name={checkoutItem.name}
                    pId={checkoutItem.id}
                    listId={propertyId}
                    listData={list}
                    onAddCart={handleUpdate}
                    onDelete={(type === 'edit') ? handleRemove : undefined}
                    handleUpdateRow={(type === 'edit') ? handleUpdateRow : undefined}
                    currentData={property}
                    type={type}
                />
            )}
            {checkoutItems.map((item, index: number) => {
                const rdata = (
                    <Box textAlign={'right'} key={index}>
                        <Grid container spacing={2} sx={{ pt: 2 }}>
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
                                                    onDeleteRow={(type === "cart") ?
                                                        () => handleRemoveCart(item.id, index, ind) :
                                                        (property_price?.status !== IOrderProductPropertyStatus.approve) ?
                                                            () => handleRemove(property_price.id) : undefined
                                                    }
                                                    onEditRow={(item.order_type === ProductOrderType.custom_made && property_price?.status !== IOrderProductPropertyStatus.approve) ? () => handleEdit(item, ind) : undefined}
                                                    key={ind * 2}
                                                    row={{
                                                        rejection_reason: property_price?.rejection_reason,
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
                        {(type === 'edit') && (
                            <StyledRoundedWhiteButton variant="outlined" sx={{ mt: 2 }} onClick={() => handleEdit(item)}>
                                اصلاح / حذف کالا
                            </StyledRoundedWhiteButton>
                        )}
                    </Box>
                )

                if (type === 'cart')
                    return rdata

                if (type === 'edit' && item.order_type === ProductOrderType.custom_made)
                    return rdata;
                else
                    return null

            })}
        </Box>
    )
}