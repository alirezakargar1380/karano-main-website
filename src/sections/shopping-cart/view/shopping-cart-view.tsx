'use client';

import { Box, Container, Grid, IconButton, MenuItem, Stack, Table, TableBody, Typography } from "@mui/material";
import { useCallback, useState } from "react";
import { CheckCartCard } from "src/components/cart";
import CartDialog from "src/components/cart/cart-dialog";
import CustomPopover, { usePopover } from "src/components/custom-popover";
import { HowToSendDialog } from "src/components/dialogs";
import Iconify from "src/components/iconify";
import Image from "src/components/image";
import { BlueNotification } from "src/components/notification";
import Scrollbar from "src/components/scrollbar";
import { StyledRoundedWhiteButton } from "src/components/styles/props/rounded-white-button";
import SvgColor from "src/components/svg-color";
import { TableHeadCustom } from "src/components/table";
import { useBoolean } from "src/hooks/use-boolean";
import CartTableRow from "src/sections/cart/cart-table-row";
import { CartTableHead } from "src/sections/cart/view/cart-dialog-view";
import { useCheckoutContext } from "src/sections/checkout/context";
import { ICheckoutAddCustomMadeProductData, ICheckoutItem, ICheckoutItemPropertyPrice } from "src/types/checkout";

export default function ShoppingCartView() {
    const [checkoutItem, setCheckoutItem] = useState<ICheckoutItem>();
    const [propertyId, setPropertyId] = useState<number>();
    const [property, setProperty] = useState<ICheckoutItemPropertyPrice>();
    const [list, setList] = useState<ICheckoutItemPropertyPrice[]>();

    const howToSendDialog = useBoolean();
    const cartDialog = useBoolean();
    const popover = usePopover();

    const checkout = useCheckoutContext();

    const handleEdit = useCallback((item: ICheckoutItem, property_ind: number) => {
        setCheckoutItem(item);
        const property = item.property_prices[property_ind];
        setPropertyId(property_ind);
        setList(item.property_prices);
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
                property_prices: data
            }, false)

            console.log(data)
            cartDialog.onFalse();
        } catch (error) {
            console.error(error);
        }
    }, [checkoutItem]);

    return (
        <Container maxWidth={'xl'}>

            <HowToSendDialog dialog={howToSendDialog} />
            {(checkoutItem) && (
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


            <Stack direction={'row'} justifyContent={'space-between'} sx={{ borderBottom: '1px solid #D1D1D1' }}>
                <Typography variant="h3" fontFamily={'peyda-bold'} sx={{ py: 2 }}>سبد خرید</Typography>
                <Stack sx={{ py: 2 }} direction={'row'}>
                    <IconButton>
                        <SvgColor src="/assets/icons/cart/factor-download.svg" />
                    </IconButton>
                    <IconButton onClick={popover.onOpen} sx={{ width: 48, height: 48 }}>
                        <SvgColor src="/assets/icons/cart/more-option.svg" />
                    </IconButton>
                </Stack>
            </Stack>
            <CustomPopover
                open={popover.open}
                onClose={popover.onClose}
                arrow="top-center"
                sx={{ width: 140, mt: 3 }}
                hiddenArrow={true}
                // anchorOrigin={{
                //     vertical: 'bottom',
                //     horizontal: 'center',
                // }}
            >
                <MenuItem
                    onClick={() => {
                        checkout.onReset()
                        popover.onClose();
                    }}
                    sx={{ color: 'error.main' }}
                >
                    <Iconify icon="pixelarticons:notes-delete" />
                    حدف همه    
                </MenuItem>
            </CustomPopover>
            <Box sx={{ pt: 4 }}>
                <BlueNotification title='مشاهده پیش فاکتور'>
                    بعد از بررسی محصولاتی که به صورت سفارشی ثبت شده‌اند، می‌توانید پیش‌فاکتور خود را مشاهده کنید.
                </BlueNotification>
            </Box>
            <Box>
                {checkout.items.map((item, index: number) => (
                    <Grid container spacing={2} sx={{ py: 4 }} key={index}>
                        <Grid item sm={2} />
                        <Grid item sm={10}>
                            <Stack direction={'row'} spacing={2}>
                                <Typography fontFamily={'peyda-bold'} sx={{ pt: 1 }}>{item.name}</Typography>
                                <StyledRoundedWhiteButton variant="outlined">مشاهده تاریخچه</StyledRoundedWhiteButton>
                            </Stack>
                        </Grid>
                        <Grid item sm={2} sx={{ pt: 2 }}>
                            <Image src={item.coverUrl} sx={{ border: '1px solid #D1D1D1', borderRadius: '8px' }} />
                        </Grid>
                        <Grid item sm={10} sx={{ pt: 2 }}>
                            <Scrollbar sx={{ maxHeight: 680 }}>
                                <Table size={'medium'} sx={{ minWidth: 780 }}>
                                    <TableHeadCustom
                                        sx={{
                                            backgroundColor: '#F2F2F2'
                                        }}
                                        headLabel={CartTableHead}
                                    />

                                    <TableBody>
                                        {item.property_prices?.map((property_price, ind: number) => (
                                            <CartTableRow
                                                onDeleteRow={() => { }}
                                                onEditRow={() => handleEdit(item, ind)}
                                                key={ind * 2}
                                                row={{
                                                    quality: property_price?.quantity,
                                                    coating: property_price?.coating_type || '-',
                                                    dimensions: property_price?.dimention?.width + 'x' + property_price?.dimention?.height,
                                                    final_coating: property_price?.cover_type?.name,
                                                    frame_type: property_price?.frame_type?.name || '-',
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
            <Box sx={{ py: 4 }}>
                <CheckCartCard dialog={howToSendDialog}>
                    نتیجه بررسی سفارش شما بعد  از ارسال به کارشناسان کارانو، از طریق «پیام کوتاه» اعلام و پیش‌فاکتور صادر می‌شود.
                    همچنین همواره می‌توانید برای پیگیری وضعیت سفارش خود، به صفحه «پیگیری سفارش» در بالای صفحه مراجعه کنید.
                </CheckCartCard>
            </Box>
        </Container>
    )
}