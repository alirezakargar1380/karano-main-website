import { LoadingButton } from "@mui/lab";
import { DialogActions, Typography } from "@mui/material";
import { StyledRoundedWhiteButton } from "src/components/styles/props/rounded-white-button";
import CompleteOrderLayout from "./layout/complete-order-layout";
import { PrimaryButton } from "src/components/styles/buttons/primary";

type Props = {
    onCancel?: () => void
    onSubmit?: () => void
    title?: string
}

export function Actions({ onCancel, onSubmit, title = 'ثبت و ادامه' }: Props) {
    return (
        <DialogActions sx={{ px: 0, pb: '40px', pt: '24px' }}>
            <CompleteOrderLayout>
                <StyledRoundedWhiteButton size={'medium'} variant='outlined' sx={{ mr: '12px' }}
                    onClick={onCancel}
                >
                    <Typography variant="button1">انصراف</Typography>
                </StyledRoundedWhiteButton>
                <PrimaryButton
                    size="medium"
                    onClick={onSubmit}
                >
                    <Typography variant="button1">{title}</Typography>
                </PrimaryButton>
            </CompleteOrderLayout>
        </DialogActions>
    )
}