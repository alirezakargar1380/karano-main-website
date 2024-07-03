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
import { CartTableHead, ReadyProductCartTableHead } from "src/sections/cart/view/cart-dialog-view";
import { useCheckoutContext } from "src/sections/checkout/context";
import { ICheckoutItem, ICheckoutItemPropertyPrice } from "src/types/checkout";

import FormProvider from 'src/components/hook-form';
import { ProductOrderType } from "src/types/product";
import ShoppingCartList from "../shopping-cart-list";

export default function ShoppingCartView() {
    const howToSendDialog = useBoolean();
    
    const popover = usePopover();

    const checkout = useCheckoutContext();

    // console.log(checkout.items)

    return (
        <Container maxWidth={'xl'}>

            <HowToSendDialog dialog={howToSendDialog} />
            {/* {(checkoutItem) && (
                <CartDialog
                    dialog={cartDialog}
                    order_form_id={checkoutItem.order_form_id}
                    product_name={checkoutItem.name}
                    listId={propertyId}
                    listData={list}
                    onAddCart={handleUpdate}
                    currentData={property}
                />
            )} */}


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
            <ShoppingCartList type="cart" items={checkout.items} />
            <Box sx={{ py: 4 }}>
                <CheckCartCard dialog={howToSendDialog}>
                    نتیجه بررسی سفارش شما بعد  از ارسال به کارشناسان کارانو، از طریق «پیام کوتاه» اعلام و پیش‌فاکتور صادر می‌شود.
                    همچنین همواره می‌توانید برای پیگیری وضعیت سفارش خود، به صفحه «پیگیری سفارش» در بالای صفحه مراجعه کنید.
                </CheckCartCard>
            </Box>
        </Container>
    )
}