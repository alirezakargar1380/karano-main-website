import { useInView } from "framer-motion"
import { useRef } from "react"
import { m } from 'framer-motion';
import { varFade } from "src/components/animate";
import { Box, Typography } from "@mui/material";
import Image from "src/components/image";
import { useResponsive } from 'src/hooks/use-responsive';

export default function HomeOrderWithKarano() {
    const mdUp = useResponsive('up', 'md');

    return (
        <m.div
            initial={varFade().inDown.initial}
            whileInView={varFade().inDown.animate}
            exit={varFade().inDown.exit}
            viewport={{
                once: true, 
                // amount: 1
            }}
            transition={{ 
                duration: 1,
            }}
        
        >
            <Box sx={{
                borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
                borderTop: (theme) => `1px solid ${theme.palette.divider}`,
                pt: 6
            }}>
                <Typography variant='h3' fontFamily={'peyda-bold'} sx={{ pb: 2 }}>سفارش به سبک کارانو</Typography>
                <Image alt={'karano'} src={'/assets/images/landing/how to order.jpg'} sx={{ width: 1, height: 1 }} />
            </Box>
        </m.div>
    )
}