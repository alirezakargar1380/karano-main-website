import { LoadingButton } from "@mui/lab";
import { Box, Stack, Typography } from "@mui/material";
import { BlueNotification, YellowNotification } from "src/components/notification";
import { StyledRoundedWhiteButton } from "src/components/styles/props/rounded-white-button";
import { useBoolean } from "src/hooks/use-boolean";
import { useEffect, useState } from "react";
import ShoppingCartList from "../shopping-cart/shopping-cart-list";
import { IOrderProductItem } from "src/types/order-products";

import { useSnackbar } from "src/components/snackbar";

interface Props {
    orderProducts: IOrderProductItem[]
}

export default function OrderRejectionListView({
    orderProducts
}: Props) {
    const cartDialog = useBoolean();
    const [hasReady, setHasReady] = useState<boolean>(false);
    const [hasCustomize, setHasCustomize] = useState<boolean>(false);

    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
        const text = "یکی از سفارش‌های پروفیل درب کابینتی - P60  در وضعیت «ردشده» است. تغییرات مورد نظر را اعمال کنید و سپس بر روی دکمه ثبت نهایی کلیک کنید."
        enqueueSnackbar(text)
    }, []) 

    return (
        <>
            <Box sx={{ p: 3, bgcolor: 'white', borderRadius: '16px' }}>
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
                    type="edit"
                    items={orderProducts.map((op) => {
                        return {
                            ...op.product,
                            // coverUrl: endpoints.image.url(op.product.images.find((item) => item.main)?.name || ''),
                            need_to_assemble: op.need_to_assemble,
                            order_form_id: op.product.order_form_options.id,
                            subTotal: 0,
                            properties: op.properties.map((property) => {
                                return {
                                    ...property,
                                    id: property.id,
                                    status: property.status,
                                    dimension: property.dimension,
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