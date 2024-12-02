import { LoadingButton } from "@mui/lab";
import { DialogActions } from "@mui/material";
import { DialogWithButton } from "src/components/custom-dialog";
import { SecondaryButton } from "src/components/styles/buttons/secondary";
import { useBooleanReturnType } from "src/hooks/use-boolean";
import InvoiceView from "src/sections/order-tracking/invoice-view";
import { IOrderProductItem } from "src/types/order-products";

export interface Props {
    dialog: useBooleanReturnType;
    orderId: number;
    submitHandler: () => void;
    title?: string
    production_date?: string
}

export default function InvoiceDialog({ dialog, orderId, title, production_date, submitHandler }: Props) {

    return (
        <DialogWithButton dialog={dialog} fullWith={true}>
            <InvoiceView
                title={title}
                orderId={orderId}
                // submitHandler={() => submitHandler()}
                production_date={production_date}
            />
            <DialogActions>
                <SecondaryButton
                    variant='outlined'
                    sx={{ px: 4 }}
                    // onClick={onPrev}
                >
                    مرحله قبل
                </SecondaryButton>
                <LoadingButton
                    variant='contained'
                    sx={{ borderRadius: '24px', px: 4 }}
                    // onClick={() => checkout.onNextStep()}
                    onClick={submitHandler}
                >
                    ثبت و ادامه
                </LoadingButton>
            </DialogActions>
        </DialogWithButton>
    )
}