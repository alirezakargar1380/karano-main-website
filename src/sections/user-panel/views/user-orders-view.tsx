import { Box, Grid, Stack, Typography } from "@mui/material";
import { useState } from "react";
import { useGetTrackingOrders } from "src/api/orders";
import Image from "src/components/image";
import SvgColor from "src/components/svg-color";
import OrderTrackingListView from "src/sections/order-tracking/order-tracking-list-view";
import TrackingOrderItem from "src/sections/order-tracking/tracking-order-item";
import { OrderTrackingView } from "src/sections/order-tracking/view";

const TABS = [
    {
        value: 'delivered',
        label: 'تحویل داده شده'
    },
    {
        value: 'addresses',
        label: 'در حال تولید'
    },
    {
        value: 'orders',
        label: 'در انتظار پرداخت'
    },
    {
        value: 'favorites',
        label: 'در حال بررسی'
    },
];

export default function UserOrdersView() {
    const [currentTab, setCurrentTab] = useState<number>(0);

    const {
        orders,
        ordersEmpty
    } = useGetTrackingOrders();

    return (
        <Grid container spacing={2}>
            <Grid item sm={3}>
                <Box sx={{
                    border: (theme) => `1px solid ${theme.palette.divider}`,
                    borderRadius: '16px',
                }}>
                    {TABS.map((tab, index) => (
                        <Stack key={index} direction={"row"} justifyContent={"space-between"} sx={{
                            borderBottom: (theme) => (index !== TABS.length - 1) ? `1px solid ${theme.palette.divider}` : '',
                            mx: 2,
                            py: 2
                        }}>
                            <Stack direction={'row'} justifyContent={"space-between"}
                                onClick={() => setCurrentTab(index)}
                                sx={{
                                    width: 1,
                                    p: 2,
                                    cursor: 'pointer',
                                    ...(index === currentTab && {
                                        borderRadius: '16px',
                                        bgcolor: '#F8F8F8',
                                        border: `1px solid #A9A9A9`
                                    })
                                }}
                            >
                                <Stack direction={"row"} spacing={1}>
                                    <SvgColor src="/assets/icons/user-panel/check-circle.svg" sx={{ width: 20, height: 20, mt: 0.5 }} />
                                    <Typography variant="h5" sx={{ fontFamily: 'peyda-bold' }}>
                                        {tab.label}
                                    </Typography>
                                </Stack>
                                <Stack direction={'row'}>
                                    <Typography variant="body1" sx={{ fontFamily: 'peyda-regular', pt: 0.25, pr: 0.75 }}>
                                        {
                                            (currentTab === 0 && orders.length.toString())
                                            || '0'
                                        }
                                    </Typography>
                                    <Typography variant="body1" sx={{ fontFamily: 'peyda-regular' }}>
                                        سفارش
                                    </Typography>
                                </Stack>

                            </Stack>
                        </Stack>
                    ))}

                </Box>
            </Grid>
            <Grid item sm={9}>
                {/* <Stack spacing={2} pb={10}>
                    {orders.map((order) => (
                        <TrackingOrderItem key={order.id} order={order} />
                    ))}
                </Stack> */}
                {(!ordersEmpty) && <OrderTrackingListView />}
                {(ordersEmpty) && (
                    <Box sx={{
                        border: (theme) => `1px solid #A9A9A9`,
                        borderRadius: '16px',
                    }}>
                        <Box sx={{ textAlign: 'center' }}>
                            <Image src="/assets/images/user-panel/Empty-State-orders.png" />
                        </Box>
                    </Box>
                )}
            </Grid>

        </Grid>

    )
}