import { LoadingButton } from "@mui/lab";
import { Box, Container, Stack, Table, TableBody, Typography } from "@mui/material";
import CartDialog from "src/components/cart/cart-dialog";
import { RHFRadioGroupTitleText } from "src/components/hook-form";
import FormProvider from "src/components/hook-form/form-provider";
import { BlueNotification, YellowNotification } from "src/components/notification";
import Scrollbar from "src/components/scrollbar";
import { StyledRoundedWhiteButton } from "src/components/styles/props/rounded-white-button";
import { TableHeadCustom } from "src/components/table";
import { useBoolean, useBooleanReturnType } from "src/hooks/use-boolean";
import CartTableRow from "src/sections/cart/cart-table-row";
import { CartTableHead } from "src/sections/cart/view/cart-dialog-view";
import { useForm } from "react-hook-form";
import { IOrderItem } from "src/types/order";
import { useEffect, useState } from "react";
import { ProductOrderType } from "src/types/product";
import { useGetOrderProducts } from "src/api/order-products";
import ShoppingCartList from "../shopping-cart/shopping-cart-list";
import { IOrderProductItem } from "src/types/order-products";
import { endpoints } from "src/utils/axios";


interface Props {
    orderProducts: IOrderProductItem[]
}

export default function CustomProductsOrderRejectionDialogView({
    orderProducts
}: Props) {
    const cartDialog = useBoolean();
    const [hasReady, setHasReady] = useState<boolean>(false);
    const [hasCustomize, setHasCustomize] = useState<boolean>(false);

    return (
        <>
            <Box sx={{ p: 4, bgcolor: 'white', borderRadius: '16px' }}>
                <Typography variant="h4" sx={{ width: 1, pb: 2, fontFamily: 'peyda-bold', borderBottom: '1px solid #D1D1D1' }}>
                    جزییات رد ‌سفارش
                </Typography>
                <Box>
                    <BlueNotification sx={{ my: 3 }}>
                        برای ثبت تغییرات کالاهای ناموجود،یکی از گزینه‌های «اصلاح سفارش»  یا «حذف کالاهای ردشده»  را انتخاب و سپس بر روی دکمه ثبت و ادامه کلیک کنید.
                    </BlueNotification>
                    <YellowNotification title="لیست کالاهای «سفارشی» دارای اصلاح" sx={{ my: 3 }}>
                        ادمین فروش اصلاحاتی برای این کالا ثبت کرده است. می‌توانید کالای مورد نظر را «اصلاح سفارش» یا «حذف کالاهای ردشده» کنید. در صورت اصلاح،  کالاهای مورد نظر بعد از اعمال اصلاحات و بررسی توسط ادمین، وضعیت‌شان در قسمت سبد خرید در بخش پروفایل، قابل مشاهده و پیگیری هستند.
                    </YellowNotification>
                </Box>

                <ShoppingCartList
                    items={orderProducts.map((op) => {
                        return {
                            // id: op.product.id,
                            // name: op.product.name,
                            ...op.product,
                            // coverUrl: endpoints.image.url(op.product.images.find((item) => item.main)?.name || ''),
                            need_to_assemble: op.need_to_assemble,
                            order_form_id: op.product.order_form_options.id,
                            subTotal: 0,
                            properties: op.properties.map((property) => {
                                return {
                                    // ...property,
                                    dimention: property.product_dimension,
                                    quantity: property.quantity,
                                    coating_type: property.coating_type,
                                    cover_type: property.cover_type,
                                    profile_type: property.profile_type,
                                    frame_type: property.frame_type,
                                }
                            }),
                        }
                    })}
                />

                <Stack sx={{ mt: 2 }} direction={'row'} spacing={1} justifyContent={'end'}>
                    <StyledRoundedWhiteButton variant='outlined' sx={{ px: 4 }}>انصراف</StyledRoundedWhiteButton>
                    <LoadingButton variant='contained' sx={{ borderRadius: '24px', px: 4 }}>
                        ثبت
                    </LoadingButton>
                </Stack>
            </Box>
        </>
    )
}