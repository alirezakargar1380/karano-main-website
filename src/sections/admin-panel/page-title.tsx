import { Stack, Typography } from "@mui/material";
import SvgColor from "src/components/svg-color";


export function PageTitle({ title, icon, color = "#000" }: { title: string, icon: string, color?: string }) {
    return (
        <Stack
            direction={'row'}
            alignItems={'center'}
            sx={{
                mb: '20px',
                pl: '20px', 
                py: 1.6,
                borderBottom: (theme) => `solid 1px ${theme.palette.divider}`
            }}
        >
            <SvgColor src={icon} sx={{ width: 24, height: 24, mr: 2 }} color={color} />
            <Typography variant="title3">{title}</Typography>
        </Stack>
    )
}