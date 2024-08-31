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
    type: 'cart' | 'edit' | 'view'
}

export default function ShoppingCartList({ items, type }: Props) {
    const checkout = useCheckoutContext();

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

    const handleRemoveCart = useCallback((itemId: number, propertyIndex: number) => {
        checkout.onDeleteCart(itemId, propertyIndex);
        enqueueSnackbar("کالای مورد نظر با موفقیت حذف شد.", {
            color: 'info',
            variant: 'myCustomVariant',
            showTimer: true,
            showButton: true
        })
    }, []);

    const handleRemove = useCallback(async (propertyId: number) => {
        const p = checkoutItems.find((item) => item.properties.find((p) => p.id === propertyId))
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

            await new Promise((resolve) => setTimeout(resolve, 250));
            setCheckoutItems([...updatedCheckoutItems]);

            cartDialog.onFalse();
        } catch (error) {
            console.error(error);
        }
    }, [setCheckoutItems, checkoutItems, checkoutItem]);

    const deleteRow = useCallback((item: ICheckoutItem, index: number, ppid: number, isLastOne?: boolean) => {
        if (type === 'cart') {
            handleRemoveCart(item.id, index)
        } else {
            handleRemove(ppid);
        }
        if (isLastOne) {
            enqueueSnackbar(`تمامی کالاهای پروفیل ${item.name} از لیست کالاهای شما با موفقیت حذف شدند.`, {
                color: 'info',
                variant: 'multiline',
                showTimer: true,
                showButton: true
            })
        } else {
            enqueueSnackbar('کالای مورد نظر با موفقیت حذف شد.', {
                color: 'info',
                variant: 'myCustomVariant',
                showTimer: true,
                showButton: true
            })
        }
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
                        <Grid container spacing={2} sx={{ pt: 4 }}>
                            {item.coverUrl ? <Grid item sm={2} /> : null}
                            {/* {(type === "")} */}
                            <Grid item sm={10}>
                                <Stack direction={'row'} spacing={2}>
                                    <Typography fontFamily={'peyda-bold'} sx={{ pt: 1 }}>{item.name}</Typography>
                                    {/* <StyledRoundedWhiteButton variant="outlined">مشاهده تاریخچه</StyledRoundedWhiteButton> */}
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
                                            {cartDialog.value === false && (
                                                <>
                                                    {item.properties?.map((property_price, ind: number) => (
                                                        <CartTableRow
                                                            key={ind * 2}
                                                            isLastOne={(item.properties.length === 1)}
                                                            product_name={item?.name || ''}
                                                            // onDeleteRow={(type === "cart") ?
                                                            //     () => handleRemoveCart(item.id, ind) :
                                                            //     (property_price?.status !== IOrderProductPropertyStatus.approve) ?
                                                            //         () => handleRemove(property_price.id) : undefined
                                                            // }
                                                            onDeleteRow={() => deleteRow(item, ind, property_price.id, (item.properties.length === 1))}
                                                            onEditRow={(item.order_type === ProductOrderType.custom_made && property_price?.status !== IOrderProductPropertyStatus.approve) ? () => handleEdit(item, ind) : undefined}
                                                            type={type}
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
                                                </>
                                            )}
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

                if (type === 'view')
                    return rdata

                if (type === 'edit' && item.order_type === ProductOrderType.custom_made)
                    return rdata;
                else
                    return null

            })}
        </Box>
    )
}