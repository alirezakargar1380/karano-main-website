import { Box, DialogContent } from "@mui/material"
import Scrollbar from "src/components/scrollbar"
import CheckoutSteps from "../checkout/checkout-steps"
import { useCheckoutContext } from "../checkout/context"

type Props = {
    children: React.ReactNode
}

export default function CompleteOrderDialogContent({ children }: Props) {

    return (
        <DialogContent sx={{ px: 0 }}>
            <Scrollbar>
                <Box sx={{ pt: 2, bgcolor: 'white', borderRadius: '16px' }}>
                    {children}
                </Box>
            </Scrollbar>
        </DialogContent>
    )
}