import { Container, Grid, Stack, Typography, Box } from "@mui/material";
import { useGetAdmins } from "src/api/admin";
import SvgColor from "src/components/svg-color";
import { EAdminRole } from "src/types/admin";

export default function AccessLevel() {

    const { admins } = useGetAdmins();

    return (
        <Box>
            <Grid container spacing={2}>
                <Grid md={6} xl={3} item>
                    <Stack sx={{ border: '1px solid #E0E0E0', borderRadius: '12px', px: 2, py: 2 }} direction={'row'} justifyContent={'space-between'} alignItems={'center'}>
                        <Box>
                            <Typography variant="title3">مدیریت فروش</Typography>
                            <Stack direction={'row'} spacing={0.5} alignItems={'center'}>
                                <Typography variant="body2">{admins?.filter((admin) => admin.role === EAdminRole.sale)?.length}</Typography>
                                <Typography variant="caption1" color={"#555555"} mt={0.3}>نفر</Typography>
                            </Stack>
                        </Box>
                        <Box sx={{ borderRadius: '12px', p: 1.5, bgcolor: '#555555', height: '48px', width: '48px' }}>
                            <SvgColor src="/assets/icons/admin-panel/shopping-cart-01.svg" color={'#fff'} sx={{ width: 1, height: 1 }} />
                        </Box>
                    </Stack>
                </Grid>
                <Grid md={6} xl={3} item>
                    <Stack sx={{ border: '1px solid #E0E0E0', borderRadius: '12px', px: 2, py: 2 }} direction={'row'} justifyContent={'space-between'} alignItems={'center'}>
                        <Box>
                            <Typography variant="title3">مدیریت تولید</Typography>
                            <Stack direction={'row'} spacing={0.5} alignItems={'center'}>
                                <Typography variant="body2">{admins?.filter((admin) => admin.role === EAdminRole.production)?.length}</Typography>
                                <Typography variant="caption1" color={"#555555"} mt={0.3}>نفر</Typography>
                            </Stack>
                        </Box>
                        <Box sx={{ borderRadius: '12px', p: 1.5, bgcolor: '#555555', height: '48px', width: '48px' }}>
                            <SvgColor src="/assets/icons/admin-panel/loading-01.svg" color={'#fff'} sx={{ width: 1, height: 1 }} />
                        </Box>
                    </Stack>
                </Grid>
                <Grid md={6} xl={3} item>
                    <Stack sx={{ border: '1px solid #E0E0E0', borderRadius: '12px', px: 2, py: 2 }} direction={'row'} justifyContent={'space-between'} alignItems={'center'}>
                        <Box>
                            <Typography variant="title3">مدیریت انبار</Typography>
                            <Stack direction={'row'} spacing={0.5} alignItems={'center'}>
                                <Typography variant="body2">{admins?.filter((admin) => admin.role === EAdminRole.storage)?.length}</Typography>
                                <Typography variant="caption1" color={"#555555"} mt={0.3}>نفر</Typography>
                            </Stack>
                        </Box>
                        <Box sx={{ borderRadius: '12px', p: 1.5, bgcolor: '#555555', height: '48px', width: '48px' }}>
                            <SvgColor src="/assets/icons/admin-panel/archive.svg" color={'#fff'} sx={{ width: 1, height: 1 }} />
                        </Box>
                    </Stack>
                </Grid>
                <Grid md={6} xl={3} item>
                    <Stack sx={{ border: '1px solid #E0E0E0', borderRadius: '12px', px: 2, py: 2 }} direction={'row'} justifyContent={'space-between'} alignItems={'center'}>
                        <Box>
                            <Typography variant="title3">مدیریت ارسال</Typography>
                            <Stack direction={'row'} spacing={0.5} alignItems={'center'}>
                                <Typography variant="body2">{admins?.filter((admin) => admin.role === EAdminRole.delivery)?.length}</Typography>
                                <Typography variant="caption1" color={"#555555"} mt={0.3}>نفر</Typography>
                            </Stack>
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