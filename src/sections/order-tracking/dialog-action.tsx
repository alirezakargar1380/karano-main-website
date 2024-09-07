import { LoadingButton } from "@mui/lab";
import { DialogActions } from "@mui/material";
import { StyledRoundedWhiteButton } from "src/components/styles/props/rounded-white-button";

type Props = {
    onCancel?: () => void
    onSubmit?: () => void
}

export function Actions({ onCancel, onSubmit }: Props) {
    return (
        <DialogActions>
            <StyledRoundedWhiteButton variant='outlined' sx={{ px: 4 }}
                onClick={onCancel}
            >
                انصراف
            </StyledRoundedWhiteButton>
            <LoadingButton
                variant='contained'
                sx={{ borderRadius: '24px', px: 4 }}
                type="submit"
                onClick={onSubmit}
            >
                ثبت و ادامه
            </LoadingButton>
        </DialogActions>
    )
}