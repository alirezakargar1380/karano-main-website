'use client'

import { Container, Grid, Stack, Typography, Box } from "@mui/material";
import { PageTitle } from "../page-title";
import { AdminBreadcrumbs } from "src/components/custom-breadcrumbs";
import { paths } from "src/routes/paths";
import { SecondaryButton } from "src/components/styles/buttons/secondary";
import AccessLevel from "../access-level";

export default function AdminPanelOverview() {
    return (
        <Container>
            <AdminBreadcrumbs
                links={[
                    { name: 'پنل کاربری ادمین', href: paths.admin_dashboard.root },
                    { name: 'خانه' },
                ]}
                sx={{
                    mb: { xs: 3, md: 5 },
                }}
            />
            <PageTitle icon="/assets/icons/admin-panel/home-01.svg" title="خانه" />
            <Box>
                <Grid container spacing={2}>
                    <ReportCard title="کل سفارش های ماه اخیر" number={178} />
                    <ReportCard title="کل سفارش های ماه اخیر" number={178} />
                    <ReportCard title="کل سفارش های ماه اخیر" number={178} />
                    <ReportCard title="کل سفارش های ماه اخیر" number={178} />
                </Grid>
                <Box sx={{ mt: 3, bgcolor: 'white', borderRadius: '16px', border: '1px solid #E0E0E0', p: 2 }}>
                    <Stack
                        direction={'row'}
                        sx={{
                            mb: 3,
                            py: 2,
                            borderBottom: (theme) => `solid 1px ${theme.palette.divider}`
                        }}
                        justifyContent={"space-between"}
                    >
                        <Typography variant="h4" fontFamily={'peyda-bold'}>سطح دسترسی ها</Typography>

                        <SecondaryButton variant="outlined" sx={{ py: 0, px: 3 }}>جزئیات بیشتر</SecondaryButton>
                    </Stack>
                    <AccessLevel />
                </Box>
            </Box>
        </Container>
    )
}

interface ReportCardProp {
    title: string
    number: number
}

function ReportCard({ title, number }: ReportCardProp) {
    return (
        <Grid md={6} xl={3} item>
            <Stack sx={{ border: '1px solid #E0E0E0', borderRadius: '12px', bgcolor: 'white', px: 2, py: 4 }} direction={'row'} justifyContent={'space-between'}>
                <Typography variant="h6">{title}</Typography>
                <Typography variant="h6">
                    {number}
                </Typography>
            </Stack>
        </Grid>
    )
}