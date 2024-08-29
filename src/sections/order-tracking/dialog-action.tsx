import { LoadingButton } from "@mui/lab";
import { DialogActions } from "@mui/material";
import { StyledRoundedWhiteButton } from "src/components/styles/props/rounded-white-button";

export function Actions() {
    return (
        <DialogActions>
            <StyledRoundedWhiteButton variant='outlined' sx={{ px: 4 }}
                // onClick={checkout.onBackStep}
            >
                انصراف
            </StyledRoundedWhiteButton>
            <LoadingButton
                variant='contained'
                sx={{ borderRadius: '24px', px: 4 }}
                type="submit"
                // onClick={checkout.onNextStep}
            >
                ثبت و ادامه
            </LoadingButton>
        </DialogActions>
    )
}