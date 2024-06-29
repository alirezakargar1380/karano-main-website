import { LoadingButton } from "@mui/lab";
import { Box, Container, Stack, Table, TableBody, Typography } from "@mui/material";
import CartDialog from "src/components/cart/cart-dialog";
import { RHFRadioGroupTitleText } from "src/components/hook-form";
import FormProvider from "src/components/hook-form/form-provider";
import { BlueNotification, YellowNotification } from "src/components/notification";
import Scrollbar from "src/components/scrollbar";
import { StyledRoundedWhiteButton } from "src/components/styles/props/rounded-white-button";
import { TableHeadCustom } from "src/components/table";
import { useBoolean, useBooleanReturnType } from "src/hooks/use-boolean";
import CartTableRow from "src/sections/cart/cart-table-row";
import { CartTableHead, ReadyProductCartTableHead } from "src/sections/cart/view/cart-dialog-view";
import { useForm } from "react-hook-form";
import { IOrderItem } from "src/types/order";
import { useEffect, useState } from "react";
import { ProductOrderType } from "src/types/product";
import { useGetOrderProducts } from "src/api/order-products";
import { IOrderProductItem } from "src/types/order-products";


interface Props {
    dialog: useBooleanReturnType,
    orderId: number,
    orderProducts: IOrderProductItem[]
    hasCustomize: boolean,
    hasReady: boolean,
    afterSubmitHandler: () => void
}

export default function ReadyProductsOrderRejectionDialogView({
    dialog,
    orderId,
    orderProducts,
    hasCustomize,
    hasReady,
    afterSubmitHandler
}: Props) {
    const cartDialog = useBoolean();

    const methods = useForm({
        // resolver: yupResolver(NewAddressSchema),
        defaultValues: {},
    });


    const {
        handleSubmit
    } = methods;

    const onSubmit = handleSubmit(async (data) => {
        console.log(data);
    })

    console.log(orderProducts);

    return (
        <>
            {/* <CartDialog dialog={cartDialog} order_form_id={2}  /> */}
            {/* {content.value && ( */}
            <Box sx={{ p: 4, bgcolor: 'white', borderRadius: '16px' }}>
                <Typography variant="h4" sx={{ width: 1, pb: 2, fontFamily: 'peyda-bold', borderBottom: '1px solid #D1D1D1' }}>
                    لیست کالاهای «آماده» ناموجود
                </Typography>
                <Container>
                    <YellowNotification title="لیست کالاهای «آماده» ناموجود" sx={{ my: 3 }}>
                        این کالاها در سبد خرید شما ناموجود هستند!
                    </YellowNotification>

                    {orderProducts.map((product, index: number) => {
                        if (product.product.order_type === ProductOrderType.ready_to_use) {
                            return (
                                <Box key={index} sx={{ mb: 2 }}>
                                    <Stack direction={'row'} sx={{ pb: 1 }} spacing={2}>
                                        <Typography variant='h6' sx={{ pt: 1 }}>
                                            {product.product.name}
                                        </Typography>
                                        <StyledRoundedWhiteButton variant="outlined">
                                            مشاهده تاریچه
                                        </StyledRoundedWhiteButton>
                                    </Stack>
                                    <Box>
                                        <Scrollbar sx={{ maxHeight: 680 }}>
                                            <Table size={'medium'} sx={{ minWidth: 780 }}>
                                                <TableHeadCustom
                                                    sx={{
                                                        backgroundColor: '#F2F2F2'
                                                    }}
                                                    headLabel={ReadyProductCartTableHead}
                                                />
                                                <TableBody>
                                                    {product.properties.map((property, index: number) => (
                                                        <CartTableRow
                                                            // onDeleteRow={() => { }}
                                                            // onEditRow={() => cartDialog.onTrue()}
                                                            key={index}
                                                            row={{
                                                                quality: property.quantity,
                                                                coating: property.coating_type,
                                                                dimensions: (property.product_dimension) ? property?.product_dimension?.width + 'x' + property?.product_dimension?.height : '-',
                                                                final_coating: property.cover_type?.name,
                                                                frame_type: property.frame_type?.name,
                                                                profile_type: property.profile_type?.name || '-',
                                                            }}
                                                        />
                                                    ))}
                                                </TableBody>
                                            </Table>
                                        </Scrollbar>
                                    </Box>
                                </Box>
                            )
                        }
                    })}

                    <BlueNotification sx={{ mb: 3 }}>
                        برای ثبت تغییرات کالاهای ناموجود،یکی از گزینه‌های زیر را انتخاب کنید و سپس بر روی دکمه ثبت کلیک کنید.
                    </BlueNotification>
                    <FormProvider methods={methods} onSubmit={onSubmit}>
                        <RHFRadioGroupTitleText
                            row
                            name="addressType"
                            options={[
                                {
                                    label: 'حذف کالاهای ناموجود از سبد خرید',
                                    text: 'کالاهایی که فعلا در انبار کارانو موجود نیستند، از سبد خرید شما حذف شده و پس از پرداخت بهای کالاهای باقیمانده، آن‌هارا تحویل خواهید گرفت.',
                                    value: '1'
                                },
                                {
                                    label: 'تحویل همه محصولات با زمان بیشتر',
                                    text: 'با انتخاب این گزینه شما بهای تمام کالاهای مورد نظر را باید پرداخت ‌کنید و برای تحویل آن‌ها زمان بیشتری را منتظر خواهید ‌ماند تا کالاهای ناموجود توسط کارانو، موجود شوند.',
                                    value: '2'
                                },
                                {
                                    label: 'انصراف از خرید',
                                    value: '3'
                                },
                            ]}
                            sx={{ width: '100%' }}
                        />
                    </FormProvider>
                </Container>
                <Stack sx={{ mt: 2 }} direction={'row'} spacing={1} justifyContent={'end'}>
                    <StyledRoundedWhiteButton variant='outlined' sx={{ px: 4 }}>انصراف</StyledRoundedWhiteButton>
                    <LoadingButton variant='contained' sx={{ borderRadius: '24px', px: 4 }} onClick={afterSubmitHandler}>
                        {(hasReady && hasCustomize) ? 'ثبت و مرحله بعد' : 'ثبت'}
                    </LoadingButton>
                </Stack>
            </Box>
            {/* )} */}
        </>
    )
}