import { LoadingButton } from "@mui/lab";
import { Box, DialogActions, DialogContent, DialogTitle, Stack, Typography } from "@mui/material";
import { BlueNotification, YellowNotification } from "src/components/notification";
import { StyledRoundedWhiteButton } from "src/components/styles/props/rounded-white-button";
import { useBoolean, useBooleanReturnType } from "src/hooks/use-boolean";
import React, { useEffect, useState } from "react";
import ShoppingCartList from "../shopping-cart/shopping-cart-list";
import { IOrderProductItem } from "src/types/order-products";

import { useSnackbar } from "src/components/snackbar";
import { IOrderProductPropertyStatus } from "src/types/order-products-property";
import { endpoints, server_axios } from "src/utils/axios";
import { DefaultDialog, ReminderDialog } from "src/components/custom-dialog";
import Scrollbar from "src/components/scrollbar";
import { OrderStatus } from "src/types/order";
import { useShowOneTime } from "src/hooks/use-show-one-time";

interface Props {
    orderProducts: IOrderProductItem[]
    dialog: useBooleanReturnType
    orderId: number
    order_number?: string
}

export default function OrderRejectionListView({
    orderProducts,
    dialog,
    orderId,
    order_number
}: Props) {
    const [edited, setEdited] = useState<boolean>(false);
    const {
        show,
        toggle
    } = useShowOneTime("rejection-reminder")

    const reminderDialog = useBoolean();
    const confirm = useBoolean();
    const cancel = useBoolean();

    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
        if (!show) reminderDialog.onTrue();
        else reminderDialog.onFalse();
    }, [show])

    const handleUpdateOrder = async () => {
        if (!edited) return enqueueSnackbar('تعدادی از سفارش‌های شما توسط مدیریت فروش،در وضعیت «ردشده» قرار گرفته‌اند.\n ابتدا تغییرات مورد نظر را اعمال کنید و سپس بر روی دکمه «ثبت نهایی اصلاحات» کلیک کنید.', {
            variant: 'multiline',
            color: 'error'
        })

        const op: IOrderProductItem[] = await server_axios.get(endpoints.orderProducts.one(orderId)).then(({ data }) => data);

        let isOnlyOne = false
        op.forEach((element) => {
            let found = 0;
            element.properties.forEach((property) => {
                if (property.status === IOrderProductPropertyStatus.denied) {
                    found += 1;
                }
            });
            if (found === 1) {
                isOnlyOne = true
            }
        });

        if (isOnlyOne) {
            const find = op.find((item: any) => {
                if (item.properties.find((property: any) => property.status === IOrderProductPropertyStatus.denied)) return item
            })
            enqueueSnackbar(`یکی از سفارش‌های پروفیل ${find?.product.name} در وضعیت «ردشده» است.\n ابتدا تغییرات مورد نظر را اعمال کنید. سپس بر روی دکمه «ثبت نهایی اصلاحات» کلیک کنید.`, {
                variant: "multiline",
                color: "error"
            })
            return
        } else {
            if (op.find((item: any) => item.properties.find((property: any) => property.status === IOrderProductPropertyStatus.denied))) {
                const text = "تعدادی از سفارش‌های شما توسط مدیریت فروش،در وضعیت «ردشده» قرار گرفته‌اند. \n ابتدا تغییرات مورد نظر را اعمال کنید و سپس بر روی دکمه «ثبت نهایی اصلاحات» کلیک کنید."
                enqueueSnackbar(text, {
                    variant: "multiline",
                    color: "error"
                })
                return
            }
        }

        confirm.onTrue();
    }

    const confirmOrder = async () => {
        await server_axios.patch(endpoints.orders.update(orderId), {
            status: OrderStatus.edited
        })
        reminderDialog.onFalse();
        dialog.onFalse();
        enqueueSnackbar(`اصلاح شفارش با کد ${order_number} با موفقیت انجام شد. \n بعد از بررسی توسط مدیر فروش، وضعیت سفارش شما از طریق منوی «پیگیری سفارش»، قابل پیگیری و بررسی ست.`, {
            variant: 'multiline',
            color: 'info'
        })
    }

    return (
        <React.Fragment>

            <DefaultDialog
                onClose={cancel.onFalse}
                title={'انصراف از ثبت نهایی اصلاحات'}
                open={cancel.value}
                content={'شما در حال انصراف از ثبت نهایی اصلاحات کالاهای ردشده  هستید.  تمام اطلاعات کالاهای رده‌شده‌ای که  اصلاح و حذف کرده‌اید، ذخیره می‌شوند. آیا مایل به ادامه انصراف هستید؟'}
                closeTitle="خیر"
                action={
                    <LoadingButton variant="contained"
                        onClick={() => {
                            cancel.onFalse();
                            dialog.onFalse();
                            enqueueSnackbar(`با انصراف از ثبت نهایی اصلاحات، شفارش شما با کد ${order_number} در وضعیت «ردشده» باقی می‌ماند.  `, {
                                variant: 'multiline',
                                color: 'info'
                            })
                        }}
                        sx={{
                            borderRadius: '50px',
                            px: 5
                        }}>
                        بله
                    </LoadingButton>
                }
            />

            <DefaultDialog
                onClose={confirm.onFalse}
                title='ثبت نهایی اصلاحات'
                open={confirm.value}
                content={'آیا از ثبت نهایی تمامی تغییرات و اصلاحات کالاهای ردشده اطمینان دارید؟'}
                closeTitle="خیر"
                action={
                    <LoadingButton variant="contained" onClick={confirmOrder} sx={{
                        borderRadius: '50px',
                        px: 5
                    }}>
                        بله
                    </LoadingButton>
                }
            />

            <ReminderDialog
                color="#727272"
                // onClose={reminderDialog.onFalse}
                title='یادآوری'
                open={reminderDialog.value}
                content={'تعدادی از کالاهای شما رد شده‌اند؛ شما می‌بایست آن‌ها را اصلاح یا حذف کنید.'}
                action={
                    <LoadingButton variant="contained" onClick={() => {
                        reminderDialog.onFalse();
                        toggle();
                    }} sx={{
                        borderRadius: '50px',
                        px: 2
                    }}>
                        متوجه شدم
                    </LoadingButton>
                }
            />

            <Box sx={{ px: 6, bgcolor: 'white', borderRadius: '16px' }}>
                <DialogTitle variant="h4" sx={{ width: 1, px: 0, fontFamily: 'peyda-bold', borderBottom: '1px solid #D1D1D1' }}>
                    جزییات رد ‌سفارش
                </DialogTitle>
            </Box>

            <DialogContent>
                <Scrollbar>
                    <Box sx={{ p: 3, bgcolor: 'white', borderRadius: '16px' }}>
                        <Box>
                            <YellowNotification title="لیست کالاهای «سفارشی» ناموجود" sx={{ my: 3 }}>
                                ادمین فروش تعدادی / تمامی کالاهای شما را رد کرده  و علت‌های کالاهای ردشده را ثبت کرده است. می‌توانید کالا / کالاهای ردشده را اصلاح یا حذف کنید. در صورت اصلاح و سپس بررسی  توسط ادمین فروش، وضعیت‌ کالاهای سفارش شما در  سبد خرید در بخش پروفایل و همچنین از طریق منوی «پیگیری سفارش» قابل مشاهده و پیگیری هستند.
                            </YellowNotification>
                            <BlueNotification sx={{ mb: 3 }}>
                                برای تغییرات کالاهای «ردشده»، دکمه «اصلاح / حذف کالا»  را انتخاب و سپس بعد از اعمال تمامی تغییرات،بر روی دکمه «ثبت تغییرات» کلیک کنید. همچنین می‌توانید با کلیک بر روی آیکون «اصلاح» و «حذف»، تغییرات مورد نظر خود را اعمال کنید. در آخر  برای ثبت نهایی تغییرات، بر روی دکمه «ثبت نهایی اصلاحات» کلیک کنید.
                            </BlueNotification>
                        </Box>

                        <ShoppingCartList
                            type="edit"
                            items={orderProducts}
                            afterUpdate={() => setEdited(true)}
                        />
                    </Box>
                </Scrollbar>
            </DialogContent>
            <DialogActions>
                <Stack direction={'row'} spacing={1} justifyContent={'end'}>
                    <StyledRoundedWhiteButton variant='outlined' sx={{ px: 4 }} onClick={cancel.onTrue}>انصراف</StyledRoundedWhiteButton>
                    <LoadingButton variant='contained' sx={{ borderRadius: '24px', px: 4 }} onClick={handleUpdateOrder}>
                        ثبت نهایی اصلاحات
                    </LoadingButton>
                </Stack>
            </DialogActions>
        </React.Fragment>
    )
}