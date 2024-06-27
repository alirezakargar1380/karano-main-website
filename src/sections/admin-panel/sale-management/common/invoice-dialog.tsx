import { _invoices } from "src/_mock";
import { DialogWithButton } from "src/components/custom-dialog";
import { useBooleanReturnType } from "src/hooks/use-boolean";
import InvoiceView from "src/sections/order-tracking/invoice-view";
import { IOrderProductItem } from "src/types/order-products";

export interface Props {
    dialog: useBooleanReturnType;
    orderProducts: IOrderProductItem[];
    submitHandler: () => void;
}

export default function InvoiceDialog({ dialog, orderProducts, submitHandler }: Props) {

    return (
        <DialogWithButton dialog={dialog} fullWith={true}>
            <InvoiceView
                invoice={_invoices[0]}
                orderProducts={orderProducts}
                submitHandler={() => submitHandler()}
            />
        </DialogWithButton>
    )
}