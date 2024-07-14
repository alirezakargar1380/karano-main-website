import { Box, Button, Stack, Typography } from "@mui/material"
import Iconify from "src/components/iconify"
import Label from "src/components/label"
import { StyledRoundedWhiteButton } from "src/components/styles/props/rounded-white-button"
import { IOrderItem, OrderStatus } from "src/types/order"
import { fDateTime } from "src/utils/format-time"

interface Props {
    order: IOrderItem
    handleMoreBtn: (id: number, status: OrderStatus) => void
}

export default function TrackingOrderItem({ order, handleMoreBtn }: Props) {
    return (
        <Box sx={{ bgcolor: '#F8F8F8', borderRadius: '16px', border: '1px solid #D1D1D1', padding: 4 }}>
            <Stack direction={'row'} justifyContent={'space-between'} sx={{ borderBottom: '1px solid #D1D1D1', pb: 2 }}>
                <Label
                    sx={{
                        ...(order.status === OrderStatus.produced && {
                            bgcolor: "#0B7BA7",
                            color: "white"
                        })
                    }}
                    color={
                        (order.status === OrderStatus.pending && 'info') ||
                        (order.status === OrderStatus.failed && 'error') ||
                        ((
                            order.status === OrderStatus.accepted ||
                            order.status === OrderStatus.ready_to_send ||
                            order.status === OrderStatus.production
                        ) && 'success') ||
                        (order.status === OrderStatus.edited && 'warning') ||
                        'default'
                    } fontFamily={'peyda-bold'}>
                    {' وضعیت: '}
                    {
                        (order.status === OrderStatus.edited && 'اصلاح شده') ||
                        (order.status === OrderStatus.pending && 'در انتظار تایید') ||
                        (order.status === OrderStatus.failed && 'رد شده') ||
                        (order.status === OrderStatus.production && 'در حال تولید') ||
                        (order.status === OrderStatus.produced && 'در انتظار پرداخت نهایی') ||
                        (order.status === OrderStatus.ready_to_send && 'آماده ارسال') ||
                        (order.status === OrderStatus.accepted && 'تایید شده')
                    }
                </Label>
                <Stack direction={'row'} spacing={1}>
                    {order.status === OrderStatus.produced && (
                        <Button
                            sx={{ color: "#0B7BA7", fontFamily: "peyda-bold" }}
                        >
                            دانلود فاکتور نهایی
                        </Button>
                    )}
                    <StyledRoundedWhiteButton
                        variant="outlined"
                        onClick={() => {
                            handleMoreBtn(+order.id, order.status)
                        }}
                    >
                        {
                            ((order.status === OrderStatus.pending || order.status === OrderStatus.edited) && 'مشاهده سبد خرید') ||
                            (order.status === OrderStatus.failed && 'test') ||
                            ((order.status === OrderStatus.accepted) && 'ادامه و تکمیل خرید') ||
                            (order.status === OrderStatus.edited && 'test') ||
                            (order.status === OrderStatus.produced && 'پرداخت نهایی') ||
                            'default'
                        }
                        <Iconify icon={'solar:arrow-left-linear'} sx={{ ml: 1 }} />
                    </StyledRoundedWhiteButton>
                </Stack>

            </Stack>
            <Stack direction={'row'} justifyContent={'space-between'} sx={{ pt: 2 }}>
                <Stack spacing={2} sx={{ width: 0.5 }}>
                    <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                        <Typography fontFamily={'peyda-bold'} sx={{ pr: 1 }}>شماره سفارش:</Typography>
                        <Typography fontFamily={'peyda-medium'}>
                            {order.order_number}
                        </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                        <Typography fontFamily={'peyda-bold'} sx={{ pr: 1 }}>
                            تاریخ ثبت سفارش:
                        </Typography>
                        <Typography fontFamily={'peyda-medium'}>
                            {fDateTime(order.createdAt)}
                        </Typography>
                    </Box>
                </Stack>
                <Stack spacing={2} sx={{ width: 0.5 }}>
                    <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                        <Typography fontFamily={'peyda-bold'} sx={{ pr: 1 }}>
                            تعداد کالا:
                        </Typography>
                        <Typography fontFamily={'peyda-medium'}>
                            59
                        </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                        <Typography fontFamily={'peyda-bold'} sx={{ pr: 1 }}>
                            تاریخ تحویل:
                        </Typography>
                        <Typography fontFamily={'peyda-medium'}>
                            1402/02/01
                        </Typography>
                    </Box>
                </Stack>
            </Stack>
        </Box >
    )
}