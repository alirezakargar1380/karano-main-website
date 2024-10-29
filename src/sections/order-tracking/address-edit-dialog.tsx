import { Box, Typography } from "@mui/material";
import { DialogWithButton } from "src/components/custom-dialog";
import { useBooleanReturnType } from "src/hooks/use-boolean";
import { DeliveryAdressesNewEditForm } from "./delivery-addresses-new-edit-form";

interface Props {
    id: number | undefined
    dialog: useBooleanReturnType
}

export default function AddressEditDialog({ dialog, id }: Props) {
    return (
        <DialogWithButton dialog={dialog} fullWith maxWidth="md">
            <Box sx={{ p: '24px', bgcolor: 'white', borderRadius: '16px' }}>
                <Typography variant="title1" sx={{ width: 1, pb: '16px', borderBottom: '1px solid #D1D1D1' }}>
                    {id ? 'ویرایش آدرس' : 'اطلاعات آدرس جدید'}
                </Typography>
                <DeliveryAdressesNewEditForm 
                    id={id}
                    handleAfterAddingAddress={() => {
                        dialog.onFalse();
                    }}
                    exit={() => dialog.onFalse()}
                />
            </Box>
        </DialogWithButton>
    );
}