import { Box, Grid, Stack, Typography } from "@mui/material";
import { useState } from "react";
import { useGetTrackingOrders } from "src/api/orders";
import Image from "src/components/image";
import SvgColor from "src/components/svg-color";
import OrderTrackingListView from "src/sections/order-tracking/order-tracking-list-view";
import { OrderStatus } from "src/types/order";
import { useTheme } from '@mui/material/styles';

const TABS = [
    {
        value: 'delivered',
        label: 'تحویل شده',
        icon: 'check-circle',
        status: OrderStatus.ready_to_send
    },
    {
        value: 'addresses',
        label: 'در حال تولید',
        icon: 'loading-01',
        status: OrderStatus.production
    },
    {
        value: 'orders',
        label: 'در انتظار پرداخت',
        icon: 'credit-card-plus',
        status: OrderStatus.produced
    },
    {
        value: 'favorites',
        label: 'در حال بررسی',
        icon: 'message-text-circle-02',
        status: OrderStatus.pending
    },
];

export default function UserOrdersView() {
    const theme = useTheme();
    const [currentTab, setCurrentTab] = useState<number>(0);
    const [status, setStatus] = useState<OrderStatus>();

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
                    px: '16px'
                }}>
                    {TABS.map((tab, index) => (
                        <Stack key={index} direction={"row"} justifyContent={"space-between"} sx={{
                            borderBottom: (theme) => (index !== TABS.length - 1) ? `1px solid ${theme.palette.divider}` : '',
                            // mx: 2,
                            py: '16px',
                            bgcolor: "#FFF",
                            transition: theme.transitions.create(['background-color']),
                            '& :hover': {
                                transition: theme.transitions.create(['background-color']),
                                bgcolor: "#F8F8F8",
                            },
                        }}>
                            <Stack direction={'row'} justifyContent={"space-between"}
                                onClick={() => {
                                    setCurrentTab(index)
                                    setStatus(tab.status)
                                }}
                                sx={{
                                    width: 1,
                                    py: 2,
                                    px: '12px',
                                    cursor: 'pointer',
                                    borderRadius: '16px',
                                    ...(tab.status === status && {
                                        bgcolor: '#F8F8F8',
                                        border: `1px solid #A9A9A9`
                                    })
                                }}
                            >
                                <Stack direction={"row"} spacing={1}>
                                    <SvgColor src={`/assets/icons/user-panel/${tab.icon}.svg`} sx={{ width: 24, height: 24, mt: 0.5 }} />
                                    <Typography variant="title3">
                                        {tab.label}
                                    </Typography>
                                </Stack>
                                <Stack direction={'row'} alignItems={"center"}>
                                    <Typography variant="body4" sx={{ pt: 0.25, pr: 0.75 }}>
                                        {orders.filter((item) => item.status === OrderStatus[tab.status]).length}
                                    </Typography>
                                    <Typography variant="body4">
                                        سفارش
                                    </Typography>
                                </Stack>

                            </Stack>
                        </Stack>
                    ))}

                </Box>
            </Grid>
            <Grid item sm={9}>
                {(status) && <OrderTrackingListView status={status} />}
                {(!status) && (
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