import { Box, Button, Stack, SvgIcon, Typography } from "@mui/material"
import { useCallback } from "react"
import Iconify from "src/components/iconify"
import Label from "src/components/label"
import { SecondaryButton } from "src/components/styles/buttons/secondary"
import SvgColor from "src/components/svg-color"
import { IOrderItem, OrderStatus } from "src/types/order"
import { fDateTime, fToJamali } from "src/utils/format-time"

import { useSnackbar } from 'src/components/snackbar';
import { toFarsiNumber } from "src/utils/change-case"
import { pxToRem } from "src/theme/typography"

interface Props {
    order: IOrderItem
    handleMoreBtn: (id: number, status: OrderStatus) => void
}

export default function TrackingOrderItem({ order, handleMoreBtn }: Props) {

    const { enqueueSnackbar } = useSnackbar();

    const handleDownloadFactor = useCallback(async () => {
        enqueueSnackbar('فاکتور نهایی سفارش شما با موفقیت دانلود شد.', {
            variant: 'myCustomVariant',
            color: 'info'
        })
    }, []);

    return (
        <Box sx={{ bgcolor: '#F8F8F8', borderRadius: '16px', border: '1px solid #D1D1D1', px: pxToRem(24), pt: pxToRem(24) }}>
            <Stack direction={'row'} justifyContent={'space-between'} sx={{ borderBottom: '1px solid #D1D1D1', pb: pxToRem(16) }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Label
                        sx={{
                            px: pxToRem(8),
                            py: pxToRem(2),
                            borderRadius: '8px',
                        }}
                        variant={order.status === OrderStatus.produced ? "outlined": "filled"}
                        color={
                            ((order.status === OrderStatus.pending
                                || order.status === OrderStatus.ready_to_send
                                || order.status === OrderStatus.preparing
                                || order.status === OrderStatus.produced
                                || order.status === OrderStatus.production) && 'blue') ||
                            ((order.status === OrderStatus.failed || order.status === OrderStatus.removed)
                                && 'red') ||
                            ((
                                order.status === OrderStatus.accepted ||
                                order.status === OrderStatus.posted ||
                                order.status === OrderStatus.ready_to_send
                            ) && 'green') ||
                            (order.status === OrderStatus.edited && 'yellow') ||
                            'default'
                        } fontFamily={'peyda-bold'}>
                        <Typography variant={'body3'}>
                            {' وضعیت: '}
                            {
                                (order.status === OrderStatus.posted && 'ارسال شده') ||
                                (order.status === OrderStatus.edited && 'اصلاح شده') ||
                                (order.status === OrderStatus.pending && 'در حال بررسی') ||
                                (order.status === OrderStatus.failed && 'رد شده') ||
                                (order.status === OrderStatus.production && 'در حال تولید') ||
                                (order.status === OrderStatus.produced && 'در انتظار پرداخت نهایی') ||
                                (order.status === OrderStatus.ready_to_send && 'آماده ارسال') ||
                                (order.status === OrderStatus.accepted && 'تایید شده') ||
                                (order.status === OrderStatus.removed && 'حذف شده') ||
                                (order.status === OrderStatus.preparing && 'در حال آماده سازی')
                            }
                        </Typography>
                    </Label>
                </Box>

                <Stack direction={'row'} spacing={1}>
                    {order.status === OrderStatus.produced && (
                        <Button
                            sx={{ color: "#0B7BA7", fontFamily: "peyda-bold" }}
                            onClick={handleDownloadFactor}
                        >
                            <SvgColor src="/assets/icons/orders/download-01.svg" sx={{ mr: 0.5 }} />
                            دانلود فاکتور نهایی
                        </Button>
                    )}
                    <SecondaryButton
                        variant="outlined"
                        onClick={() => {
                            handleMoreBtn(+order.id, order.status)
                        }}
                        sx={{
                            py: pxToRem(4),
                            px: pxToRem(16),
                            ...(order.status === OrderStatus.removed && {
                                display: 'none'
                            })
                        }}
                    >
                        <Typography variant="button1" sx={{ fontFamily: "peyda-bold" }}>
                            {
                                ((order.status === OrderStatus.pending
                                    || order.status === OrderStatus.edited
                                    || order.status === OrderStatus.ready_to_send
                                    || order.status === OrderStatus.production
                                    || order.status === OrderStatus.preparing
                                    || order.status === OrderStatus.posted) && 'مشاهده سبد خرید') ||
                                ((order.status === OrderStatus.failed) && 'مشاهده جزئیات') ||
                                ((order.status === OrderStatus.accepted) && 'ادامه و تکمیل خرید') ||
                                (order.status === OrderStatus.produced && 'پرداخت نهایی') ||
                                'مشاهده جزئیات'
                            }
                        </Typography>
                        <SvgColor src="/assets/icons/orders/arrow-left.svg" sx={{ ml: pxToRem(8) }} />
                    </SecondaryButton>
                </Stack>
            </Stack>
            <Stack direction={'row'} justifyContent={'space-between'} sx={{ py: pxToRem(24) }}>
                <Stack spacing={'8px'} sx={{ width: 0.5 }}>
                    <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                        <Typography fontFamily={'peyda-bold'} variant="body3" sx={{ pr: 1 }}>شماره سفارش:</Typography>
                        <Typography fontFamily={'peyda-medium'} variant="body4">
                            {toFarsiNumber(order.order_number)}
                        </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                        <Typography fontFamily={'peyda-bold'} variant="body3" sx={{ pr: 1 }}>
                            تاریخ ثبت سفارش:
                        </Typography>
                        <Typography fontFamily={'peyda-medium'} variant="body4">
                            {fToJamali(order.createdAt)}
                        </Typography>
                    </Box>
                </Stack>
                <Stack spacing={'8px'} sx={{ width: 0.5 }}>
                    <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                        <Typography fontFamily={'peyda-bold'} variant="body3" sx={{ pr: 1 }}>
                            تعداد کالا:
                        </Typography>
                        <Typography fontFamily={'peyda-medium'} variant="body4">
                            {toFarsiNumber(59)}
                        </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                        <Typography fontFamily={'peyda-bold'} variant="body3" sx={{ pr: 1 }}>
                            تاریخ تحویل:
                        </Typography>
                        <Typography fontFamily={'peyda-medium'} variant="body4">
                            {fToJamali(order.production_date)}
                        </Typography>
                    </Box>
                </Stack>
            </Stack>
        </Box >
    )
}