import { Box, Grid, Stack, Typography } from "@mui/material";
import Image from "src/components/image";
import SvgColor from "src/components/svg-color";

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
    return (
        <Grid container spacing={2}>
            <Grid item sm={3}>
                <Box sx={{
                    border: (theme) => `1px solid ${theme.palette.divider}`,
                    borderRadius: '16px',
                }}>
                    {TABS.map((tab, index) => (
                        <Stack direction={"row"} justifyContent={"space-between"} sx={{
                            borderBottom: (theme) => (index !== TABS.length - 1) ? `1px solid ${theme.palette.divider}` : '',
                            mx: 2,
                            py: 2
                        }}>
                            <Stack direction={'row'} justifyContent={"space-between"} sx={{
                                width: 1,
                                p: 2,
                                ...(index === 1 && {
                                    borderRadius: '16px',
                                    bgcolor: '#F8F8F8',
                                    border: `1px solid #A9A9A9`
                                })
                            }}>
                                <Stack direction={"row"} spacing={1}>
                                    <SvgColor src="/assets/icons/user-panel/check-circle.svg" sx={{ width: 20, height: 20, mt: 0.5 }} />
                                    <Typography variant="h5" sx={{ fontFamily: 'peyda-bold' }}>
                                        {tab.label}
                                    </Typography>
                                </Stack>
                                <Typography variant="body1" sx={{ fontFamily: 'peyda-regular' }}>
                                    0 سفارش
                                </Typography>
                            </Stack>
                        </Stack>
                    ))}

                </Box>
            </Grid>
            <Grid item sm={9}>
                <Box sx={{
                    border: (theme) => `1px solid #A9A9A9`,
                    borderRadius: '16px',
                }}>
                    <Box sx={{ textAlign: 'center' }}>
                        <Image src="/assets/images/user-panel/Empty-State-orders.png" sx={{

                        }}
                        />
                    </Box>
                </Box>
            </Grid>

        </Grid>

    )
}