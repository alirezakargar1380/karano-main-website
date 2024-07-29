import { Stack, Typography } from "@mui/material";
import SvgColor from "src/components/svg-color";


export function PageTitle({ title, icon, color = "#000" }: { title: string, icon: string, color?: string }) {
    return (
        <Stack
            direction={'row'}
            sx={{
                mb: 3,
                borderBottom: (theme) => `solid 1px ${theme.palette.divider}`
            }}
        >
            <SvgColor src={icon} sx={{ width: 32, height: 32, mr: 2 }} color={color} />
            <Typography variant="h4" fontFamily={'peyda-bold'} sx={{ pb: 2 }}>{title}</Typography>
        </Stack>
    )
}