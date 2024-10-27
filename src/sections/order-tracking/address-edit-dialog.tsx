import { Box, Typography } from "@mui/material";
import { DialogWithButton } from "src/components/custom-dialog";
import { useBooleanReturnType } from "src/hooks/use-boolean";

interface Props {
    id: number | undefined
    dialog: useBooleanReturnType
}

export default function AddressEditDialog({ dialog, id }: Props) {
    console.log(id);
    return (
        <DialogWithButton dialog={dialog} fullWith maxWidth="md">
            <Box sx={{ p: 4, bgcolor: 'white', borderRadius: '16px' }}>
                <Typography variant="title1" sx={{ width: 1, pb: '16px', borderBottom: '1px solid #D1D1D1' }}>
                    ویرایش آدرس تحویل
                </Typography>
            </Box>
        </DialogWithButton>
    );
}