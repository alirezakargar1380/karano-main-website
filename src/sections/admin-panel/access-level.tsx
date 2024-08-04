import { Container, Grid, Stack, Typography, Box } from "@mui/material";
import SvgColor from "src/components/svg-color";

export default function AccessLevel() {
    return (
        <Box>
        <Grid container spacing={2}>
            <Grid md={6} xl={3} item>
                <Stack sx={{ border: '1px solid #E0E0E0', borderRadius: '12px', px: 2, py: 2 }} direction={'row'} justifyContent={'space-between'}>
                    <Box>
                        <Typography variant="h6">مدیریت فروش</Typography>
                        <Typography variant="body2">06 نفر</Typography>
                    </Box>
                    <Box sx={{ borderRadius: '12px', p: 1.5, bgcolor: '#555555', height: '48px', width: '48px' }}>
                        <SvgColor src="/assets/icons/admin-panel/shopping-cart-01.svg" color={'#fff'} sx={{ width: 1, height: 1 }} />
                    </Box>
                </Stack>
            </Grid>
            <Grid md={6} xl={3} item>
                <Stack sx={{ border: '1px solid #E0E0E0', borderRadius: '12px', px: 2, py: 2 }} direction={'row'} justifyContent={'space-between'}>
                    <Box>
                        <Typography variant="h6">مدیریت تولید</Typography>
                        <Typography variant="body2">06 نفر</Typography>
                    </Box>
                    <Box sx={{ borderRadius: '12px', p: 1.5, bgcolor: '#555555', height: '48px', width: '48px' }}>
                        <SvgColor src="/assets/icons/admin-panel/loading-01.svg" color={'#fff'} sx={{ width: 1, height: 1 }} />
                    </Box>
                </Stack>
            </Grid>
            <Grid md={6} xl={3} item>
                <Stack sx={{ border: '1px solid #E0E0E0', borderRadius: '12px', px: 2, py: 2 }} direction={'row'} justifyContent={'space-between'}>
                    <Box>
                        <Typography variant="h6">مدیریت انبار</Typography>
                        <Typography variant="body2">06 نفر</Typography>
                    </Box>
                    <Box sx={{ borderRadius: '12px', p: 1.5, bgcolor: '#555555', height: '48px', width: '48px' }}>
                        <SvgColor src="/assets/icons/admin-panel/archive.svg" color={'#fff'} sx={{ width: 1, height: 1 }} />
                    </Box>
                </Stack>
            </Grid>
            <Grid md={6} xl={3} item>
                <Stack sx={{ border: '1px solid #E0E0E0', borderRadius: '12px', px: 2, py: 2 }} direction={'row'} justifyContent={'space-between'}>
                    <Box>
                        <Typography variant="h6">مدیریت ارسال</Typography>
                        <Typography variant="body2">06 نفر</Typography>
                    </Box>
                    <Box sx={{ borderRadius: '12px', p: 1.5, bgcolor: '#555555', height: '48px', width: '48px' }}>
                        <SvgColor src="/assets/icons/admin-panel/send-03.svg" color={'#fff'} sx={{ width: 1, height: 1 }} />
                    </Box>
                </Stack>
            </Grid>
        </Grid>
    </Box>

    )
}