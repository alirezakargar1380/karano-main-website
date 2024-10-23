import { Box, Stack, Typography } from "@mui/material"

interface Props {
    title: string
    children: React.ReactNode
}

export default function InputCard({ title, children }: Props) {
    return (
        <Box sx={{ border: '1px solid #A9A9A9', borderRadius: '16px', p: '24px' }}>
            <Typography variant="title2" sx={{ width: 1, display: 'block', pb: '24px', fontFamily: 'peyda-bold', borderBottom: '1px solid #D1D1D1' }}>
                {title}
            </Typography>
            <Box mt={'24px'}>
                {children}
            </Box>
        </Box>
    )
}