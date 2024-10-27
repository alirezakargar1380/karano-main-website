import { Box, Stack, Typography } from "@mui/material"

interface Props {
    title: string
    children: React.ReactNode
    action?: React.ReactNode;
}

export default function InputCard({ title, action, children }: Props) {
    return (
        <Box sx={{ border: '1px solid #A9A9A9', borderRadius: '16px', p: '24px' }}>
            <Stack direction={'row'} borderBottom={'1px solid #D1D1D1'} justifyContent={'space-between'}>
                <Typography variant="title2" sx={{ display: 'block', pb: '24px' }}>
                    {title}
                </Typography>
                {(action) && action}
            </Stack>
            <Box mt={'24px'}>
                {children}
            </Box>
        </Box>
    )
}