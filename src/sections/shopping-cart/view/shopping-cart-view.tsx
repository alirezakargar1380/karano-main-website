'use client';

import { Box, IconButton, MenuItem, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { CheckCartCard } from "src/components/cart";
import CustomPopover, { usePopover } from "src/components/custom-popover";
import { HowToSendDialog } from "src/components/dialogs";
import Iconify from "src/components/iconify";
import Image from "src/components/image";
import { BlueNotification } from "src/components/notification";
import SvgColor from "src/components/svg-color";
import { useBoolean } from "src/hooks/use-boolean";
import { useCheckoutContext } from "src/sections/checkout/context";

import ShoppingCartList from "../shopping-cart-list";
import { SuccessDialog } from "src/components/custom-dialog";

import { useRouter } from 'src/routes/hooks';
import { useGetCart } from "src/api/cart";

export default function ShoppingCartView() {
    const howToSendDialog = useBoolean();
    const succussDialog = useBoolean();

    const router = useRouter();

    const popover = usePopover();

    const checkout = useCheckoutContext();

    const { cart, cartEmpty } = useGetCart();

    return (
        <Box sx={{ width: 1 }}>

            <HowToSendDialog
                dialog={howToSendDialog}
                afterSubmit={succussDialog.onTrue}
            />

            <SuccessDialog
                open={succussDialog.value}
                onClose={() => {
                    succussDialog.onFalse()
                    checkout.onReset();
                    router.replace('/')
                }}
                content={"سبد خرید شما ثبت، و جهت بررسی به کارشناسان کارانو ارسال شد. \n نتیجه بررسی، از طریق پیامک برای شما ارسال خواهد شد. همچنین می‌توانید از طریق منوی پیگیری سفارش، وضعیت سفارش‌های خود را پیگیری کنید."}
            />

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

            {/* <ShoppingCartList type="cart" items={checkout.items} /> */}
            <ShoppingCartList type="cart" items={cart} />

            {/* {(checkout.items.length > 0) && ( */}
            {(cart.length > 0) && (
                <Box sx={{ py: 4 }}>
                    <CheckCartCard dialog={howToSendDialog}>
                        نتیجه بررسی سفارش شما بعد  از ارسال به کارشناسان کارانو، از طریق «پیام کوتاه» اعلام و پیش‌فاکتور صادر می‌شود.
                        <br />
                        همچنین همواره می‌توانید برای پیگیری وضعیت سفارش خود، به صفحه «پیگیری سفارش» در بالای صفحه مراجعه کنید.
                    </CheckCartCard>
                </Box>
            )}
        </Box>
    )
}