'use client';

import { Box, Button, Checkbox, FormControlLabel, Stack, Typography } from "@mui/material";
import Iconify from "src/components/iconify";
import { GrayNotification } from "src/components/notification";
import FormProvider, {
    RHFSelect,
    RHFEditor,
    RHFUpload,
    RHFTitleTextField,
    RHFSwitch,
    RHFTextField,
    RHFMultiSelect,
    RHFAutocomplete,
    RHFMultiCheckbox,
    RHFCheckbox,
} from 'src/components/hook-form';
import { useForm } from "react-hook-form";
import { LoadingButton } from "@mui/lab";
import { useBoolean, useBooleanReturnType } from "src/hooks/use-boolean";
import { endpoints, server_axios } from "src/utils/axios";
import { IOrderItem, OrderStatus } from "src/types/order";
import { IOrderProductItem } from "src/types/order-products";
import InvoiceDialog from "./common/invoice-dialog";
import { useSnackbar } from 'src/components/snackbar';
import { ConfirmDialog, WarningDialog } from "src/components/custom-dialog";
import IncrementerButton from "src/sections/product/common/incrementer-button";

import { useRouter } from 'src/routes/hooks';
import { paths } from "src/routes/paths";
import { useCallback, useEffect } from "react";
import { IOrderProductPropertyStatus } from "src/types/order-products-property";
import { ProductOrderType } from "src/types/product";

import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { PrimaryButton } from "src/components/styles/buttons/primary";
import { fCurrency } from "src/utils/format-number";
import { useGetOrder } from "src/api/orders";
import { toFarsiNumber } from "src/utils/change-case";
import { el } from "date-fns/locale";

interface Props {
    invoiceDialog: useBooleanReturnType
    sendToUser: boolean
    hasCustomMade: boolean
    orderId: number
    // order: IOrderItem
    orderProducts: IOrderProductItem[]
}

export default function SaleManagementPayment({
    invoiceDialog,
    sendToUser,
    orderId,
    hasCustomMade,
    orderProducts,
    // order,
}: Props) {
    const router = useRouter();

    const { order } = useGetOrder(`${orderId}`);

    const timeReminder = useBoolean();

    const schema = Yup.object().shape({
        need_prepayment: Yup.boolean(),
        prepayment: Yup.number().when('need_prepayment', {
            is: true,
            then: (schema) => schema.required('پر کردن این فیلد اجباری‌ست.').typeError('پر کردن این فیلد اجباری‌ست.'),
            otherwise: (schema) => schema.typeError('پر کردن این فیلد اجباری‌ست.')
        }),
    });

    const defaultValues = {
        need_prepayment: order.need_prepayment,
        prepayment: order.prepayment || 0,
        discount_percentage: order?.discount_percentage || 0,
        production_days: order.production_days || 1,
    }

    const methods = useForm({
        resolver: yupResolver<any>(schema),
        defaultValues,
    });

    const { enqueueSnackbar } = useSnackbar();

    const {
        reset,
        watch,
        setValue,
        handleSubmit,
        formState: { isSubmitting },
    } = methods;

    const values = watch();

    useEffect(() => {
        reset(defaultValues)
    }, [order, orderId])

    useEffect(() => {
        if (values.need_prepayment) {
            setValue('prepayment', 0)
        }
    }, [values.need_prepayment])

    const onSubmit = handleSubmit(async (data) => {
        try {
            if (sendToUser) {
                await server_axios.patch(endpoints.orders.update(orderId), {
                    status: OrderStatus.failed
                })
                router.push(paths.admin_dashboard.saleManagement.root)
            } else {
                const op = await server_axios.get(endpoints.orderProducts.one(orderId))
                    .then(({ data }) => data)

                const find = op.find((item: any) => item.properties.find((op: any) => op.status !== IOrderProductPropertyStatus.approve && item.product.order_type === ProductOrderType.custom_made))
                if (find)
                    return enqueueSnackbar("ابتدا وضعیت «تایید»‌یا «عدم تایید» تمام سفارش‌ها را مشخص کنید. سپس بر روی دکمه «تایید نهایی» کلیک کنید.")

                await handleUpdate();

                invoiceDialog.onTrue();
            }
        } catch (error) {
            console.error(error);
        }
    });

    const handleUpdate = () => {
        try {
            return server_axios.patch(endpoints.orders.update(orderId), {
                ...values,
                // status: OrderStatus.accepted
            })
        } catch (error) {
            console.error(error);
        }
    }

    const handleFinalApprove = useCallback(async () => {
        timeReminder.onFalse();
        await server_axios.patch(endpoints.orders.update(orderId), {
            // ...values,
            status: OrderStatus.accepted
        })
        router.push(paths.admin_dashboard.saleManagement.root)
        // const op = await server_axios.get(endpoints.orderProducts.one(orderId))
        //     .then(({ data }) => data)

        // const find = op.find((item: any) => item.properties.find((op: any) => op.status !== IOrderProductPropertyStatus.approve && item.product.order_type === ProductOrderType.custom_made))
        // if (find)
        //     return enqueueSnackbar("ابتدا وضعیت «تایید»‌یا «عدم تایید» تمام سفارش‌ها را مشخص کنید. سپس بر روی دکمه «تایید نهایی» کلیک کنید.")

        // invoiceDialog.onTrue()
    }, [values]);

    return (
        <FormProvider methods={methods} onSubmit={onSubmit}>

            <ConfirmDialog
                open={timeReminder.value}
                onClose={timeReminder.onFalse}
                title="اطمینان از تایید سفارش"
                content="آیا از تایید تمام کالاهای این سفارش مطمئن هستید؟"
                action={
                    <PrimaryButton size="medium" onClick={() => handleFinalApprove()}>
                        بله
                    </PrimaryButton>
                }
            />

            <InvoiceDialog
                title={hasCustomMade ? 'مشاهده پیش فاکتور' : 'مشاهده فاکتور'}
                dialog={invoiceDialog}
                production_date={order.production_date}
                orderId={orderId}
                submitHandler={() => {
                    invoiceDialog.onFalse();
                    timeReminder.onTrue();
                }}
            />

            <Box sx={{
                background: '#FFFFFF',
                border: 'solid 1px #D1D1D1',
                borderRadius: '12px',
                boxShadow: '2px 2px 8px 0px #0000001A'
            }}>
                <Box sx={{
                    borderBottom: (theme) => `solid 1px ${theme.palette.divider}`,
                    py: '32px',
                    pl: '24px',
                }}>
                    <Typography variant="title3">
                        تعداد کارهای درحال تولید: {
                            toFarsiNumber(
                                orderProducts.reduce((acc, item) => {
                                    if (item.product.order_type === ProductOrderType.custom_made) {
                                        return acc + item.properties.reduce((ac, it) => ac + it.quantity, 0)
                                    } else {
                                        return 0
                                    }
                                }, 0)
                            )
                        }
                    </Typography>
                </Box>
                <Stack p={'24px'} spacing={'16px'}>
                    <GrayNotification>
                        با توجه به اطلاعات واحد تولید، زمان حدودی تولید  را تعیین کنید.
                    </GrayNotification>
                    <Stack direction={'row'} spacing={1} sx={{ bgcolor: '#DCF9FF', borderRadius: '8px', p: 2, border: 'solid 1px #0B7BA7' }}>
                        <Typography variant="body1">مبلغ کل سفارش:</Typography>
                        <Typography variant="body1">
                            {order.total ? toFarsiNumber(fCurrency(order.total)) : 0}
                        </Typography>
                        <Typography variant="body1" pl={1}>
                            ریال
                        </Typography>
                    </Stack>
                    <RHFCheckbox name="need_prepayment" label="عدم نیاز به پیش‌پرداخت" />
                    <RHFTitleTextField
                        custom_label="مبلغ پیش‌پرداخت"
                        name="prepayment"
                        disabled={!!values.need_prepayment}
                        placeholder="افزودن محتوا"
                        helperText={toFarsiNumber(fCurrency(values.prepayment || 0))}
                        sx={{
                            '& input': { textAlign: 'center!important' }
                        }}
                        InputProps={{
                            endAdornment: (<Typography variant="body1" color={"#727272"} px={1}>ریال</Typography>)
                        }}
                    />
                    <Box>
                        <Typography variant="subtitle1" fontFamily={'peyda-bold'} sx={{
                            width: 1, pt: 1, pb: 1
                        }}>
                            تخمین زمان تولید (روز)
                        </Typography>
                        <IncrementerButton
                            name="production_days"
                            onDecrease={() => setValue('production_days', values.production_days ? values.production_days + 1 : 1)}
                            onIncrease={() => {
                                if (values.production_days != 1)
                                    setValue('production_days', values.production_days ? values.production_days - 1 : 1)
                            }}
                        />
                    </Box>
                    <RHFTitleTextField
                        custom_label="تخفیف (اختیاری)"
                        name="discount_percentage"
                        placeholder="افزودن محتوا"
                        helperText={'تخفیف مورد نظر از کل مبلغ ‌فاکتور کسر می‌شود.'}
                        helperTextIconColor="#1A9FD6"
                        // helperText={toFarsiNumber(fCurrency(values.prepayment || 0))}
                        sx={{
                            '& input': { textAlign: 'center!important' }
                        }}
                        InputProps={{
                            endAdornment: (<Typography variant="body1" color={"#727272"} px={1}>درصد</Typography>)
                        }}
                    />
                </Stack>
                <Box borderTop={(theme) => `solid 1px ${theme.palette.divider}`} sx={{ p: '24px', mt: 1 }}>
                    {sendToUser ? (
                        <PrimaryButton size="medium" type="submit" sx={{ width: 1 }}>
                            ارسال برای مشتری
                        </PrimaryButton>
                    ) : (
                        <PrimaryButton size="medium" type="submit" sx={{ width: 1 }}>
                            تایید نهایی
                        </PrimaryButton>
                    )}
                </Box>
            </Box>
        </FormProvider>
    )
}