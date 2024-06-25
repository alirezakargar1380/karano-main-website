'use client';

import { Box, Stack, Typography } from "@mui/material";
import { useState } from "react";
import UserDetailsView from "./user-details-view";
import { cu } from "@fullcalendar/core/internal-common";
import UserAddressView from "./user-address-view";
import UserOrdersView from "./user-orders-view";

const TABS = [
    {
        value: 'user-details',
        label: 'مشخصات کاربر'
    },
    {
        value: 'addresses',
        label: 'آدرس ها'
    },
    {
        value: 'orders',
        label: 'لیست سفارشات'
    },
    {
        value: 'favorites',
        label: 'لیست علاقه مندی ها'
    },
];

export default function UserPanelView() {
    const [currentTab, setCurrentTab] = useState('orders' || 'user-details');

    return (
        <Box>
            <Box sx={{
                borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
                pb: 2, mb: 4
            }}>
                <Typography variant="h3" sx={{ fontFamily: 'peyda-bold' }}>
                    پروفایل
                </Typography>
            </Box>
            <Stack direction={'row'} sx={{
                width: 1, textAlign: 'center', fontFamily: 'peyda-regular', bgcolor: "#F2F2F2", borderRadius: '12px', p: 1
            }}>
                {TABS.map((tab) => (
                    <Box
                        key={tab.value}
                        sx={{
                            width: 1,
                            py: 0.5,
                            cursor: 'pointer',
                            ...(tab.value === currentTab && {
                                bgcolor: "#FFF",
                                borderRadius: '8px',
                                border: (theme) => `1px solid ${theme.palette.divider}`
                            })
                        }}
                        onClick={() => setCurrentTab(tab.value)}
                    >
                        {tab.label}
                    </Box>
                ))}
            </Stack>
            <Box sx={{ mt: 3 }}>
                {
                    (currentTab === 'user-details') && <UserDetailsView /> ||
                    (currentTab === 'addresses') && <UserAddressView /> ||
                    (currentTab === 'orders') && <UserOrdersView />
                }
            </Box>
        </Box >
    )
}