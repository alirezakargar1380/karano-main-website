import { LoadingButton } from "@mui/lab";
import { DialogActions, Typography } from "@mui/material";
import { SecondaryButton } from "src/components/styles/buttons/secondary";
import { PrimaryButton } from "src/components/styles/buttons/primary";

type Props = {
    onCancel?: () => void
    onSubmit?: () => void
    title?: string
}

export function Actions({ onCancel, onSubmit, title = 'ثبت و ادامه' }: Props) {
    return (
        <DialogActions sx={{ px: 0, pb: 0, pt: '24px' }}>
            <SecondaryButton size={'medium'} variant='outlined' sx={{ mr: '12px' }}
                onClick={onCancel}
            >
                <Typography variant="button1">انصراف</Typography>
            </SecondaryButton>
            <PrimaryButton
                size="medium"
                onClick={onSubmit}
            >
                <Typography variant="button1">{title}</Typography>
            </PrimaryButton>
        </DialogActions>
    )
}