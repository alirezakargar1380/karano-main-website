import { Grid, IconButton, Stack, Table, TableBody, Typography } from "@mui/material";
import { Box } from "@mui/system";
import Image from "src/components/image";
import Scrollbar from "src/components/scrollbar";
import { SecondaryButton } from "src/components/styles/buttons/secondary";
import { TableHeadCustom } from "src/components/table";
import { ICheckoutItem, ICheckoutItemPropertyPrice } from "src/types/checkout";
import { ProductOrderType } from "src/types/product";
import CartTableRow from "../cart/cart-table-row";
import { useCallback, useEffect, useState } from "react";
import CartDialog from "src/components/cart/cart-dialog";
import { useBoolean } from "src/hooks/use-boolean";

import { CartTableHead, getHeadLabel, ReadyProductCartTableHead } from "src/sections/cart/view/cart-dialog-view";
import { endpoints, server_axios } from "src/utils/axios";
import { IOrderProductPropertyStatus } from "src/types/order-products-property";

import { SnackbarKey, useSnackbar } from "src/components/snackbar";
import SvgColor from "src/components/svg-color";

interface Props {
    orderId?: number;
    items: ICheckoutItem[]
    type: 'cart' | 'edit' | 'view'
    isMini?: boolean
    afterUpdate?: (wasLastOne?: boolean) => void
    onRefresh?: () => void
}

export default function ShoppingCartList({ items, type, isMini, afterUpdate, orderId, onRefresh }: Props) {
    const [checkoutItems, setCheckoutItems] = useState<ICheckoutItem[]>(items);
    const [checkoutItem, setCheckoutItem] = useState<ICheckoutItem>();
    const [propertyId, setPropertyId] = useState<number>();
    const [property, setProperty] = useState<ICheckoutItemPropertyPrice>();
    const [snackbar, setSnackbar] = useState<SnackbarKey[]>([]);

    const cartDialog = useBoolean();

    const { enqueueSnackbar, closeSnackbar } = useSnackbar();

    const handleEdit = useCallback((item: ICheckoutItem, property_ind?: number) => {
        setCheckoutItem(item);

        if (property_ind !== undefined) {
            const property = item.properties[property_ind];
            setPropertyId(property_ind);
            if (property)
                setProperty(property)
        }

        cartDialog.onTrue();
        if (afterUpdate) afterUpdate();
    }, []);

    useEffect(() => {
        setCheckoutItems(items);
    }, [items, items.length]);

    const handleAddCart = useCallback((data: ICheckoutItemPropertyPrice[]) => {
        try {
            /**
             *  REFACTOR
             */
            if (type === 'edit') {
            } else {
                // if (!checkoutItem) return

                // checkout.onAddToCart({
                //     id: checkoutItem.id,
                //     properties: data
                // }, false)
            }
            cartDialog.onFalse();
            if (afterUpdate) afterUpdate();
        } catch (error) {
            console.error(error);
        }
    }, [checkoutItem]);

    const handleUpdateRow = useCallback(async (data: ICheckoutItemPropertyPrice[]) => {
        try {
            const updatedCheckoutItems = [...checkoutItems];
            let index = updatedCheckoutItems.findIndex((checkout) => checkout.id === checkoutItem?.id);
            updatedCheckoutItems[index].properties = [...data];

            await new Promise((resolve) => setTimeout(resolve, 250));
            setCheckoutItems([...updatedCheckoutItems]);

            cartDialog.onFalse();
            if (afterUpdate) afterUpdate();
        } catch (error) {
            console.error(error);
        }
    }, [setCheckoutItems, checkoutItems, checkoutItem]);

    const deleteRow = useCallback((ppid: number, isLastOne = false) => {
        // ====================== OLD VERSION =====================
        // let newItems = [...checkoutItems];
        // newItems = newItems.map(((item) => {
        //     item.properties = item.properties.filter((property) => property.id !== ppid);
        //     return item;
        // }));
        // newItems = newItems.filter((item) => item.properties.length > 0);
        // setCheckoutItems(newItems);
        // ====================== OLD VERSION =====================

        setCheckoutItems(prevItems => {
            const newItems = prevItems.map(currentItem => {
                currentItem.properties = currentItem.properties.filter(property => property.id !== ppid);
                return currentItem;
            }).filter(updatedItem => updatedItem.properties.length > 0);

            return newItems;
        });

        // if (afterUpdate) afterUpdate((newItems.length === 0));
        if (afterUpdate) afterUpdate(isLastOne);

    }, [orderId, type]);

    const handleDeleteSnackbar = useCallback((name: string, ppid: number, isLastOne = false) => {
        if (isLastOne && type === 'edit') {
            enqueueSnackbar(
                `تمامی کالاهای پروفیل ${name} با موفقیت حذف شدند.\nهمچنین وضعیت سفارش شما به «حذف‌شده» تغییر داده شد.`,
                {
                    variant: 'multiline',
                    color: 'info',
                }
            );
            setSnackbar(prevSnackbar => {
                prevSnackbar?.forEach((id) => closeSnackbar(id))
                return []
            });
        } else if (!isLastOne) {
            const esId: SnackbarKey = enqueueSnackbar('کالای مورد نظر با موفقیت حذف شد.', {
                color: 'info',
                variant: 'myCustomVariant',
                showTimer: true,
                showButton: true,
                autoHideDuration: 10 * 1000,
                onClick: async () => {
                    await server_axios.patch(endpoints.orderProductProperties.cancel_delete(ppid))
                    if (onRefresh) onRefresh();
                }
            })

            setSnackbar(prevSnackbar => [...prevSnackbar, esId]);
        }
    }, [])

    const deleteHandler = (item: ICheckoutItem, ppid: number, ppLength: number) => {
        server_axios.delete(endpoints.orderProductProperties.delete(ppid) + (orderId ? `?order_id=${orderId}` : ''))
            .then(() => {
                deleteRow(ppid, (ppLength === 1))
                handleDeleteSnackbar(item?.product?.name, ppid, (ppLength === 1))
            })
    }

    const Cart = (checkoutItem) && (
        <CartDialog
            dialog={cartDialog}
            order_form_id={checkoutItem.product.order_form_options.id}
            product_name={checkoutItem.product.name}
            order_type={checkoutItem.product.order_type}
            algorithm={checkoutItem.product.algorithm}
            listId={propertyId}
            listData={checkoutItem.properties}
            onAddCart={handleAddCart}
            onDelete={(ppid: number) => deleteHandler(checkoutItem, ppid, checkoutItem.properties.length)}
            handleUpdateRow={handleUpdateRow}
            currentData={property}
            type={type}
        />
    )

    if (isMini) {
        return (
            <Box>
                {Cart}
                {checkoutItems.map((item, index: number) => (
                    <Box display={'flex'} gap={'12px'} mt={'12px'} key={index}>
                        <Image src={endpoints.image.url(item.product.images.find((img) => img.main)?.name || '')} sx={{ width: 80, height: 80, border: '1px solid #D1D1D1', borderRadius: '8px' }} />
                        <Box>
                            <Typography variant="body3">{item.product.name}</Typography>
                            <Typography variant="caption2">{'نوع پروفیل: ' + 'درب کمدی'}</Typography>
                            <Stack width={1} mt={'8px'} direction={'row'}>
                                <IconButton
                                    sx={{ width: 'fit-content' }}
                                    color={'default'}
                                    onClick={() => handleEdit(item)}
                                >
                                    <SvgColor src='/assets/icons/cart/edit.svg' sx={{ width: 16, height: 16 }} />
                                </IconButton>
                                {/* <IconButton
                                    sx={{ width: 'fit-content' }}
                                    color={'default'}
                                    onClick={() => { }}
                                >
                                    <SvgColor src='/assets/icons/cart/trash.svg' sx={{ width: 16, height: 16 }} />
                                </IconButton> */}
                            </Stack>
                        </Box>
                    </Box>
                ))}
            </Box>
        )
    }

    return (
        <Box>
            {Cart}
            {checkoutItems.map((item, index: number) => (
                <Box textAlign={'right'} key={index} mt={'40px'}>
                    <Grid container spacing={2}>
                        {(type !== 'edit') ? <Grid item sm={2} /> : null}
                        <Grid item sm={10}>
                            <Stack direction={'row'} spacing={2}>
                                <Typography fontFamily={'peyda-bold'} variant="title2" sx={{ pt: 1 }}>{item.product.name}</Typography>
                            </Stack>
                        </Grid>
                        {((type !== 'edit')) && (
                            <Grid item sm={2} sx={{ pt: 2 }}>
                                <Image src={endpoints.image.url(item.product.images.find((img) => img.main)?.name || '')} sx={{ height: 120, width: 120, border: '1px solid #D1D1D1', borderRadius: '8px' }} />
                            </Grid>
                        )}
                        <Grid item sm={(type !== 'edit') ? 10 : 12} sx={{ pt: 2 }}>
                            <Scrollbar sx={{ maxHeight: 680 }}>
                                <Table size={'medium'} sx={{ minWidth: 780 }}>
                                    <TableHeadCustom
                                        sx={{
                                            backgroundColor: '#F2F2F2'
                                        }}
                                        // call from func
                                        headLabel={getHeadLabel(item.product.algorithm, item.product.order_type)}
                                    />
                                    <TableBody>
                                        {cartDialog.value === false && (
                                            <>
                                                {item.properties?.map((property_price, ind: number) => (
                                                    <CartTableRow
                                                        key={ind}
                                                        algorithm={item.product.algorithm}
                                                        isLastOne={(item.properties.length === 1)}
                                                        product_name={item?.product?.name || ''}
                                                        onDeleteRow={() => deleteHandler(item, property_price.id, item.properties.length)}
                                                        onEditRow={(property_price?.status !== IOrderProductPropertyStatus.approve) ? () => handleEdit(item, ind) : undefined}
                                                        order_type={item.product.order_type}
                                                        type={type}
                                                        row={{
                                                            ...property_price,
                                                            rejection_reason: property_price?.rejection_reason,
                                                            id: property_price?.id,
                                                            status: property_price?.status,
                                                            quality: property_price?.quantity,
                                                            coating: property_price?.coating_type || '',
                                                            dimensions: (property_price?.dimension) ? property_price?.dimension?.length + 'x' + property_price?.dimension?.width : '-',
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
                        <SecondaryButton variant="outlined" sx={{ mt: 2 }} onClick={() => handleEdit(item)}>
                            <Typography variant="button1" fontFamily={'peyda-regular'}>اصلاح / حذف کالا</Typography>
                        </SecondaryButton>
                    )}
                </Box>
            ))}
        </Box>
    )
}