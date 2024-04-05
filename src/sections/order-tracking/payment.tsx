import { Box} from "@mui/material";
import { useCheckoutContext } from "../checkout/context";
import { Stack } from "@mui/system";
import { StyledRoundedWhiteButton } from "src/components/styles/props/rounded-white-button";
import { LoadingButton } from "@mui/lab";
import { IInvoice } from "src/types/invoice";



export default function Payment() {
    const checkout = useCheckoutContext();
      
    return (
        <Box>
            <Stack sx={{ mt: 2 }} direction={'row'} spacing={1} justifyContent={'end'}>
                <StyledRoundedWhiteButton variant='outlined' sx={{ px: 4 }} onClick={() => checkout.onBackStep()}>مرحله قبل</StyledRoundedWhiteButton>
                <LoadingButton variant='contained' sx={{ borderRadius: '24px', px: 4 }} onClick={() => checkout.onNextStep()}>ثبت و ادامه</LoadingButton>
            </Stack>
        </Box>
    )
}