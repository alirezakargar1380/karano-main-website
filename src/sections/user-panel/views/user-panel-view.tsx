'use client';

import { Box, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import UserDetailsView from "./user-details-view";
import { cu } from "@fullcalendar/core/internal-common";
import UserAddressView from "./user-address-view";
import UserOrdersView from "./user-orders-view";
import UserFavoriteView from "./user-favorite-view";
import { useSearchParams } from 'src/routes/hooks';

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
    const [currentTab, setCurrentTab] = useState('user-details');

    const searchParams = useSearchParams();
    const tab = searchParams.get('tab');

    useEffect(() => {
        if (tab) {
            setCurrentTab(tab)
        }
    }, [tab])

    return (
        <Box>
            <Box sx={{
                borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
                py: '24px', mb: 4
            }}>
                <Typography variant="heading3">
                    پروفایل
                </Typography>
            </Box>
            <Stack direction={'row'} sx={{
                width: 1, textAlign: 'center', fontFamily: 'peyda-regular', bgcolor: "#F2F2F2", borderRadius: '12px', p: '8px'
            }}>
                {TABS.map((tab) => (
                    <Box
                        key={tab.value}
                        sx={{
                            typography: 'body3',
                            width: 1,
                            py: '8px',
                            cursor: 'pointer',
                            color: '#727272',
                            ...(tab.value === currentTab && {
                                color: '#2B2B2B',
                                bgcolor: "#FFF",
                                borderRadius: '8px',
                                boxShadow: '0px 0.15px 0.5px 0px #0000001C, 0px 0.8px 1.8px 0px #0000001C',
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
                    (currentTab === 'orders') && <UserOrdersView /> ||
                    (currentTab === 'favorites') && <UserFavoriteView />
                }
            </Box>
        </Box >
    )
}