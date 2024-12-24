import { LoadingButton } from "@mui/lab";
import { DialogActions, DialogContent } from "@mui/material";
import { DialogWithButton } from "src/components/custom-dialog";
import Scrollbar from "src/components/scrollbar";
import { PrimaryButton } from "src/components/styles/buttons/primary";
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
            <DialogContent sx={{ p: 0 }}>
                <Scrollbar>
                    <InvoiceView
                        title={title}
                        orderId={orderId}
                        // submitHandler={() => submitHandler()}
                        production_date={production_date}
                    />
                </Scrollbar>
            </DialogContent>
            <DialogActions sx={{ px: 0, pb: 0 }}>
                <SecondaryButton
                    variant='outlined'
                    size="medium"
                // onClick={onPrev}
                >
                    انصراف
                </SecondaryButton>
                <PrimaryButton
                    size="medium"
                    sx={{ borderRadius: '24px', px: 4 }}
                    // onClick={() => checkout.onNextStep()}
                    onClick={submitHandler}
                >
                    ثبت و ادامه
                </PrimaryButton>
            </DialogActions>
        </DialogWithButton>
    )
}