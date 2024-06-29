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
import { CartTableHead } from "src/sections/cart/view/cart-dialog-view";
import { useForm } from "react-hook-form";
import { IOrderItem } from "src/types/order";
import { useEffect, useState } from "react";
import { ProductOrderType } from "src/types/product";
import { useGetOrderProducts } from "src/api/order-products";


interface Props {
    // dialog: useBooleanReturnType,
    // orderId: number
}

export default function CustomProductsOrderRejectionDialogView({ 

}: Props) {
    const cartDialog = useBoolean();
    const [hasReady, setHasReady] = useState<boolean>(false);
    const [hasCustomize, setHasCustomize] = useState<boolean>(false);

    return (
        <>
            custom
        </>
    )
}