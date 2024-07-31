import { Dialog, Typography } from "@mui/material";
import { ConfirmDialogProps, SuccessDialogProps } from "./types";
import { Box } from "@mui/system";
import Image from "../image";
import { LoadingButton } from "@mui/lab";

export default function SuccessDialog({
    open,
    onClose,
    content,
    title,
    ...other
}: SuccessDialogProps) {
    return (
        <Dialog fullWidth maxWidth="sm" open={open} onClose={onClose} {...other} sx={{
            '& .MuiBackdrop-root': {
                backgroundColor: 'rgba(0,0,0,0.8)'
            }
        }}>
            <Box p={3} textAlign={'center'}>
                <Image src="/assets/images/order-tracking/success.png" />
                {title && <Typography variant="h4" color={"#000"} fontFamily={"peyda-bold"} my={2}>{title}</Typography>}
                {content && <Typography variant="body1" fontFamily={'peyda-regular'} color={"#000"} my={2}>{content}</Typography>}
                <LoadingButton variant="contained" sx={{ borderRadius: '24px' }} onClick={onClose}>
                    متوجه شدم
                </LoadingButton>
            </Box>
        </Dialog>
    );
}