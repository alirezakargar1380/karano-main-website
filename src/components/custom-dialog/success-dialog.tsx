import { Dialog, Typography } from "@mui/material";
import { ConfirmDialogProps, SuccessDialogProps } from "./types";
import { Box } from "@mui/system";
import Image from "../image";
import { LoadingButton } from "@mui/lab";

export default function SuccessDialog({
    open,
    onClose,
    text,
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
                <Typography variant="h4" color={"#000"} fontFamily={"peyda-bold"} my={2}>ثبت موفق</Typography>
                <Typography variant="h6" color={"#000"} my={2}>
                    {text}
                </Typography>
                <LoadingButton variant="contained" sx={{ borderRadius: '24px' }} onClick={onClose}>
                    متوجه شدم
                </LoadingButton>
            </Box>
        </Dialog>
    );
}