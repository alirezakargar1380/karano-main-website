import { Box, Button, Checkbox, FormControlLabel, Stack, Typography } from "@mui/material";
import Iconify from "src/components/iconify";
import { GrayNotification } from "src/components/notification";
import FormProvider, {
    RHFSelect,
    RHFEditor,
    RHFUpload,
    RHFTitleTextField,
    RHFSwitch,
    RHFTextField,
    RHFMultiSelect,
    RHFAutocomplete,
    RHFMultiCheckbox,
    RHFCheckbox,
} from 'src/components/hook-form';
import { useForm } from "react-hook-form";
import { LoadingButton } from "@mui/lab";
import { useBoolean, useBooleanReturnType } from "src/hooks/use-boolean";
import { endpoints, server_axios } from "src/utils/axios";
import { OrderStatus } from "src/types/order";
import { IOrderProductItem } from "src/types/order-products";
import InvoiceDialog from "./common/invoice-dialog";
import { useSnackbar } from 'src/components/snackbar';
import { ReminderDialog, WarningDialog } from "src/components/custom-dialog";

interface Props {
    invoiceDialog: useBooleanReturnType
    sendToUser: boolean
    hasCustomMade: boolean
    orderId: number
    orderProducts: IOrderProductItem[]
}

export default function SaleManagementPayment({
    invoiceDialog,
    sendToUser,
    orderId,
    hasCustomMade,
    orderProducts
}: Props) {
    const timeReminder = useBoolean();

    const defaultValues = {
        need_prepayment: false,
        prepayment: 0
    }

    const methods = useForm({
        defaultValues,
    });

    const { enqueueSnackbar } = useSnackbar();

    const {
        reset,
        watch,
        setValue,
        handleSubmit,
        formState: { isSubmitting },
    } = methods;

    const onSubmit = handleSubmit(async (data) => {
        try {
            if (sendToUser) {
                await server_axios.patch(endpoints.orders.update(orderId), {
                    status: OrderStatus.failed
                })
                enqueueSnackbar("وضعیت سفارش به رد شده تغییر پیدا کرد")
            } else {
                console.log("update stauts", data)
                timeReminder.onFalse();
                await server_axios.patch(endpoints.orders.update(orderId), {
                    ...data,
                    status: OrderStatus.accepted
                })
            }
        } catch (error) {
            console.error(error);
        }
    });

    return (
        <FormProvider methods={methods} onSubmit={onSubmit}>

            <WarningDialog
                open={timeReminder.value}
                onClose={timeReminder.onFalse}
                title="اطمینان از تایید سفارش"
                content="آیا از تایید تمام کالاهای این سفارش مطمئن هستید؟"
                action={
                    <LoadingButton variant="contained" onClick={() => onSubmit()} sx={{
                        borderRadius: '50px',
                        px: 4
                    }}>
                        بله
                    </LoadingButton>
                }
            />

            <InvoiceDialog
                dialog={invoiceDialog}
                orderProducts={orderProducts}
                submitHandler={() => {
                    timeReminder.onTrue();
                    invoiceDialog.onFalse();
                }}
            />

            <Box sx={{
                background: '#FFFFFF', border: 'solid 1px #D1D1D1', borderTopLeftRadius: '16px', borderTopRightRadius: '16px',
                borderBottomLeftRadius: '36px', borderBottomRightRadius: '36px', pb: 2
            }}>
                <Box sx={{ borderBottom: (theme) => `solid 1px ${theme.palette.divider}` }} pb={2} p={2}>
                    <Typography variant="h6" fontFamily={'peyda-bold'}>
                        تعداد کارهای درحال تولید: 146
                    </Typography>
                </Box>
                <Stack p={2} spacing={4}>
                    <GrayNotification>
                        با توجه به اطلاعات واحد تولید، زمان حدودی تولید  را تعیین کنید.
                    </GrayNotification>
                    <Stack direction={'row'} spacing={1} sx={{ bgcolor: '#DCF9FF', borderRadius: '8px', p: 2, border: 'solid 1px #0B7BA7' }}>
                        <Typography variant="h6" fontFamily={'peyda-bold'}>مبلغ کل سفارش:</Typography>
                        <Typography variant="h6" fontFamily={''}>
                            1455555555
                        </Typography>
                        <Typography variant="h6" fontFamily={''} pl={2}>
                            ریال
                        </Typography>
                    </Stack>
                    <RHFCheckbox name="need_prepayment" label="عدم نیاز به پیش‌پرداخت" />
                    <RHFTitleTextField custom_label="مبلغ پیش‌پرداخت" name="prepayment" placeholder="قیمت" />
                    <RHFTitleTextField custom_label={"تخمین زمان تولید (روز)"} name="" placeholder="قیمت" disabled />
                </Stack>
                <Box borderTop={(theme) => `solid 1px ${theme.palette.divider}`} sx={{ p: 2, mt: 1 }}>
                    {sendToUser ? (
                        <LoadingButton type="submit" variant="contained" sx={{ width: 1, borderRadius: '24px', py: 1 }}>
                            ارسال برای کاربر
                        </LoadingButton>
                    ) : (
                        <LoadingButton onClick={invoiceDialog.onTrue} variant="contained" sx={{ width: 1, borderRadius: '24px', py: 1 }}>
                            تایید نهایی
                        </LoadingButton>
                    )}
                </Box>
            </Box>
        </FormProvider>
    )
}