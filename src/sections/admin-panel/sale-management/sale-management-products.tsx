import { Box, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import FormProvider, { RHFRadioGroup, RHFTextField } from "src/components/hook-form";
import Scrollbar from "src/components/scrollbar";




export default function SaleManagementProducts() {
    const methods = useForm({
        // resolver: yupResolver<any>(schema),
        defaultValues: {},
    });

    const {
        reset,
        handleSubmit,
        watch,
        formState: { isSubmitting },
    } = methods;

    const values = watch();

    const onSubmit = handleSubmit(async () => {
        try {
        } catch (error) {
            console.error(error);
            reset();
        }
    });
    return (
        <Box border={(theme) => `1px solid ${theme.palette.divider}`} bgcolor={'#FFF'} width={1} borderRadius={'16px'}>
            <Stack direction={'column'} p={2} spacing={1.5} borderBottom={(theme) => `1px solid ${theme.palette.divider}`}>
                <Stack direction={'row'}>
                    <Box display={'flex'} width={'50%'}>
                        <Typography variant="h6" fontFamily={'peyda-bold'}>کد سفارش:</Typography>
                        <Typography variant="h6" fontFamily={'peyda-light'} sx={{ pl: 1 }}>
                            123456789
                        </Typography>
                    </Box>
                    <Box display={'flex'} width={'50%'}>
                        <Typography variant="h6" fontFamily={'peyda-bold'}>تعداد کالا :</Typography>
                        <Typography variant="h6" fontFamily={'peyda-light'} sx={{ pl: 1 }}>
                            20
                        </Typography>
                    </Box>
                </Stack>
                <Stack direction={'row'}>
                    <Box display={'flex'} width={'50%'}>
                        <Typography variant="h6" fontFamily={'peyda-bold'}>تاریخ ثب سفارش:</Typography>
                        <Typography variant="h6" fontFamily={'peyda-light'} sx={{ pl: 1 }}>
                            1402/02/01
                        </Typography>
                    </Box>
                    <Box display={'flex'} width={'50%'}>
                        <Typography variant="h6" fontFamily={'peyda-bold'}>
                            نام سفارش دهنده:
                        </Typography>
                        <Typography variant="h6" fontFamily={'peyda-light'} sx={{ pl: 1 }}>
                            لهراسب افروزنده
                        </Typography>
                    </Box>
                </Stack>
            </Stack>
            <Box p={2}>
                <SaleManagementProductItem />
                <FormProvider methods={methods} onSubmit={onSubmit}>
                    <Stack sx={{ border: '1px solid #D1D1D1', borderRadius: '8px' }} direction={'row'} justifyContent={'space-between'}>
                        <Box p={2} fontFamily={'peyda-bold'}>
                            {'آیا کالای فوق را تایید میکنید؟'}
                        </Box>
                        <RHFRadioGroup
                            name=""
                            row
                            options={[
                                {
                                    label: 'عدم تایید',
                                    value: 'no'
                                },
                                {
                                    label: 'تایید',
                                    value: 'yes'
                                }
                            ]}
                            sx={{ pt: 1, mr: 1 }}
                            FSx={{ border: (theme: any) => `1px solid ${theme?.palette?.divider}`, borderRadius: '8px', pr: 2 }}
                        />
                    </Stack>
                    <Box mt={3}>
                        <Typography variant="h6" fontFamily={'peyda-bold'} sx={{ pb: 1 }}>توضیحات برای مشتری</Typography>
                        <RHFTextField name="re" multiline rows={3} sx={{
                            pt: 1,
                            mr: 1,
                            '& .MuiInputBase-root': {
                                bgcolor: '#E0E0E0',
                            }
                        }} placeholder="متن محتوا" />
                    </Box>
                </FormProvider>
            </Box>

        </Box>
    )
}

function SaleManagementProductItem() {
    return (
        <Stack p={0} spacing={2} mb={2}>
            <Typography fontFamily={'peyda-bold'} variant="h5" mt={1}>
                درب کابینتی p-60
            </Typography>
            <TableContainer sx={{ overflow: 'unset' }}>
                <Scrollbar>
                    <Table sx={{
                        // minWidth: 960 
                    }}>
                        <TableHead>
                            <TableRow>

                                <TableCell sx={{ fontFamily: 'peyda-bold' }}>
                                    نوع پروفیل
                                </TableCell>

                                <TableCell sx={{ fontFamily: 'peyda-bold' }}>
                                    پوشش نهایی
                                </TableCell>

                                <TableCell sx={{ fontFamily: 'peyda-bold' }}>
                                    نوع قاب
                                </TableCell>

                                <TableCell sx={{ fontFamily: 'peyda-bold' }}>
                                    روکش گیری
                                </TableCell>
                                <TableCell sx={{ fontFamily: 'peyda-bold' }}>
                                    ابعاد
                                </TableCell>

                                <TableCell sx={{ fontFamily: 'peyda-bold' }}>
                                    تعداد
                                </TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {[...new Array(1)].map((data, index) => (
                                <TableRow key={index}>

                                    <TableCell>
                                        درب کابینتی
                                    </TableCell>

                                    <TableCell>
                                        روکش خام
                                    </TableCell>
                                    <TableCell>
                                        حجمی
                                    </TableCell>
                                    <TableCell>
                                        غیر جناقی
                                    </TableCell>
                                    <TableCell>
                                        222*365
                                    </TableCell>
                                    <TableCell>
                                        11
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Scrollbar>
            </TableContainer>
        </Stack>
    )
}