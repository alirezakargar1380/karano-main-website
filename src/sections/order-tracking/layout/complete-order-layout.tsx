import { Box } from "@mui/material"

interface Props {
    children: React.ReactNode
}

export default function CompleteOrderLayout({ children }: Props) {
    return (
        <Box px={4}>
            {children}
        </Box>
    )
}