import { DialogWithButton } from "src/components/custom-dialog";
import { useBooleanReturnType } from "src/hooks/use-boolean";
import InvoiceView from "src/sections/order-tracking/invoice-view";
import { IOrderProductItem } from "src/types/order-products";

export interface Props {
    dialog: useBooleanReturnType;
    orderProducts: IOrderProductItem[];
    submitHandler: () => void;
    title?: string
    production_date?: string
}

export default function InvoiceDialog({ dialog, orderProducts, title, production_date, submitHandler }: Props) {

    return (
        <DialogWithButton dialog={dialog} fullWith={true}>
            <InvoiceView
                title={title}
                orderProducts={orderProducts}
                submitHandler={() => submitHandler()}
                production_date={production_date}
            />
        </DialogWithButton>
    )
}