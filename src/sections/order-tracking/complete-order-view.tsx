import { Box, Button, DialogTitle, Stack, Tooltip, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import CheckoutSteps from "src/sections/checkout/checkout-steps";
import { useCheckoutContext } from "src/sections/checkout/context";
import { DeliveryRecipientInformation } from "./delivery-recipient-information";
import InvoiceView, { Iinvoice } from "./invoice-view";
import Payment from "./payment";
import { useGetOrderProducts } from "src/api/order-products";
import { useBooleanReturnType } from "src/hooks/use-boolean";
import { useGetOrder } from "src/api/orders";
import Label from "src/components/label";
import { fToJamali } from "src/utils/format-time";
import { endpoints, server_axios } from "src/utils/axios";
import { OrderStatus } from "src/types/order";
import { DialogWithButton } from "src/components/custom-dialog";
import CompleteInvoiceView from "./complete-invoice-view";
import SvgColor from "src/components/svg-color";
import { IInvoice } from "src/types/invoice";
import { PDFDownloadLink } from "@react-pdf/renderer";
import InvoicePDF from "./pdf/invoice-pdf";

interface Props {
    orderId: number
    orderNumber: string | undefined
    finalOrderDialog: useBooleanReturnType
    hasCustomMade: boolean
    handleAfterLastSection: (need_prepayment: boolean) => void
}

export let PRODUCT_CHECKOUT_STEPS_CUSTOM_PRE = ['اطلاعات تحویل‌گیرنده', 'مشاهده پیش‌فاکتور', 'پیش‌پرداخت'];
export let PRODUCT_CHECKOUT_STEPS_CUSTOM = ['اطلاعات تحویل‌گیرنده', 'مشاهده پیش‌فاکتور', 'ثبت'];
export let PRODUCT_CHECKOUT_STEPS_READY_PRE = ['اطلاعات تحویل‌گیرنده', 'مشاهده فاکتور', 'پرداخت'];
export let PRODUCT_CHECKOUT_STEPS_READY = ['اطلاعات تحویل‌گیرنده', 'مشاهده فاکتور', 'ثبت'];

export default function CompleteOrderView({
    orderId,
    finalOrderDialog,
    hasCustomMade,
    orderNumber,
    handleAfterLastSection
}: Props) {
    const checkout = useCheckoutContext();

    const { order } = useGetOrder(`${orderId}`);
    const [invoice, setInvoice] = useState<Iinvoice | null>(null)

    useEffect(() => {
        server_axios.post(endpoints.invoice.calculate(orderId)).then((res) => {
            setInvoice(res.data)
        })
        checkout.onGotoStep(0)
    }, [finalOrderDialog.value]);

    useEffect(() => {
        if (checkout.activeStep === -1) finalOrderDialog.onFalse()
        if (!finalOrderDialog.value) return;

        if (checkout.activeStep === 2 && order.need_prepayment) handle();
        if (checkout.activeStep === 3) handle();
    }, [checkout.activeStep]);

    const handle = async () => {
        // Payment
        // redirect user to pay their invoice and update the order status
        // by has custom made or not

        // -------------------------- OLD CODE --------------------------
        await server_axios.patch(endpoints.orders.update(orderId), {
            status: (hasCustomMade) ? OrderStatus.production : OrderStatus.preparing
        })
        finalOrderDialog.onFalse();
        handleAfterLastSection(order.need_prepayment);
        // -------------------------- OLD CODE --------------------------
    }

    return (
        <DialogWithButton dialog={finalOrderDialog} fullWith={true}>
            <DialogTitle sx={{ px: 0, pt: 0, height: 'fit-content' }}>
                <Stack direction={'row'} justifyContent={'space-between'} spacing={2} sx={{ px: 0 }} borderBottom={'1px solid #D1D1D1'}>
                    <Stack direction={'row'} spacing={2}>
                        <Typography variant="title1" sx={{ pb: 2, fontFamily: 'peyda-bold', }}>
                            نهایی کردن سفارش
                        </Typography>
                        <Label color="blue" variant="filled" px={4}>
                            <Typography variant="body3" fontFamily={'peyda-bold'} display={'inline-flex'}>
                                تاریخ تحویل: <Box pl={0.5}>{fToJamali(order.production_date)}</Box>
                            </Typography>
                        </Label>
                    </Stack>
                    {checkout.activeStep >= 1 && invoice && (
                        <PDFDownloadLink
                            document={
                                <InvoicePDF
                                    invoice={invoice}
                                    title={hasCustomMade ? "پیش فاکتور" : "‌فاکتور"}
                                    currentStatus={orderNumber || ''}
                                />
                            }
                            // fileName={`${row.order_number}.pdf`}
                            style={{ textDecoration: 'none' }}
                        >
                            {({ blob, url, loading, error }) => url && (
                                <Tooltip title={hasCustomMade ? "دانلود پیش فاکتور" : "دانلود ‌فاکتور"} arrow>
                                    <Button 
                                    onClick={() => window.open(url, '_blank')}
                                    sx={{
                                        '&:hover': {
                                            bgcolor: '#F2F2F2'
                                        },
                                        minWidth: 'fit-content'
                                    }} size="small">
                                        <SvgColor src="/assets/icons/orders/download-01.svg" color={"#000"} />
                                    </Button>
                                </Tooltip>
                            )}
                        </PDFDownloadLink>
                    )}
                </Stack>
                <Box sx={{ mt: "32px", mb: '40px', width: 0.7, mx: 'auto' }}>
                    <CheckoutSteps
                        activeStep={checkout.activeStep}
                        steps={hasCustomMade ?
                            (order.need_prepayment) ? PRODUCT_CHECKOUT_STEPS_CUSTOM : PRODUCT_CHECKOUT_STEPS_CUSTOM_PRE
                            :
                            (order.need_prepayment) ? PRODUCT_CHECKOUT_STEPS_READY : PRODUCT_CHECKOUT_STEPS_READY_PRE
                        }
                    />
                </Box>
            </DialogTitle>

            {checkout.activeStep === 0 && (
                <DeliveryRecipientInformation
                    orderId={orderId}
                    order={order}
                    delivery_type={order.delivery_type}
                    dialog={finalOrderDialog}
                />
            )}

            {checkout.activeStep === 1 && invoice && (
                <CompleteInvoiceView dialog={finalOrderDialog}>
                    <InvoiceView
                        title={hasCustomMade ? 'پیش‌فاکتور فروش کالا‌و‌خدمات' : 'فاکتور فروش کالا‌و‌خدمات'}
                        // orderId={orderId}
                        invoice_data={invoice}
                    />
                </CompleteInvoiceView>
            )}

            {checkout.activeStep === 2 && (
                <Payment
                    finalOrderDialog={finalOrderDialog}
                    hasCustomMade={hasCustomMade}
                />
            )}
        </DialogWithButton>
    )
}
