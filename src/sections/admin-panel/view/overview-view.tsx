'use client'

import { Container, Grid, Stack, Typography, Box } from "@mui/material";
import { PageTitle } from "../page-title";
import { AdminBreadcrumbs } from "src/components/custom-breadcrumbs";
import { paths } from "src/routes/paths";
import { SecondaryButton } from "src/components/styles/buttons/secondary";
import AccessLevel from "../access-level";
import { useSettingsContext } from "src/components/settings";
import { toFarsiNumber } from "src/utils/change-case";
import Iconify from "src/components/iconify";
import SvgColor from "src/components/svg-color";

export default function AdminPanelOverview() {
    const settings = useSettingsContext();

    return (
        <Box>
            <PageTitle icon="/assets/icons/admin-panel/home-01.svg" title="خانه" />
            <Container maxWidth={settings.themeStretch ? false : 'lg'} sx={{ pl: '20px!important', ml: '0px!important' }}>

                <Box>
                    <Grid container spacing={2}>
                        <ReportCard title="کل سفارش های ماه اخیر" number={178} />
                        <ReportCard title="سفارش‌های در دست تولید" number={178} />
                        <ReportCard title="سفارش‌های تایید شده" number={178} />
                        <ReportCard title="سفارش‌های در صف بررسی" number={178} />
                    </Grid>
                    <Box sx={{ mt: '20px', bgcolor: 'white', borderRadius: '16px', border: '1px solid #E0E0E0', p: '24px' }}>
                        <Stack
                            direction={'row'}
                            sx={{
                                mb: '24px',
                                pb: '12px',
                                borderBottom: (theme) => `solid 1px ${theme.palette.divider}`
                            }}
                            justifyContent={"space-between"}
                        >
                            <Typography variant="h4" fontFamily={'peyda-bold'}>سطح دسترسی ها</Typography>

                            <SecondaryButton size="small" variant="outlined">
                                جزئیات بیشتر
                                <SvgColor src="/assets/icons/arrow/arrow-narrow-left.svg"  sx={{ width: 16, height: 16, ml: 1 }} />
                            </SecondaryButton>
                        </Stack>
                        <AccessLevel />
                    </Box>
                </Box>
            </Container>
        </Box>

    )
}

interface ReportCardProp {
    title: string
    number: number
}

function ReportCard({ title, number }: ReportCardProp) {
    return (
        <Grid md={6} xl={3} item>
            <Stack sx={{ border: '1px solid #E0E0E0', borderRadius: '12px', bgcolor: 'white', px: '16px', py: '28px' }} direction={'row'} justifyContent={'space-between'} alignItems={'center'}>
                <Typography variant="body3">{title}</Typography>
                <Typography variant="body2">
                    {toFarsiNumber(number)}
                </Typography>
            </Stack>
        </Grid>
    )
}