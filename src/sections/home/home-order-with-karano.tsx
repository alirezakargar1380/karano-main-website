import { useInView } from "framer-motion"
import { useRef } from "react"
import { m } from 'framer-motion';
import { varFade } from "src/components/animate";
import { Box, Typography } from "@mui/material";
import Image from "src/components/image";

export default function HomeOrderWithKarano() {

    return (
        <m.div
            initial={varFade().inDown.initial}
            whileInView={varFade().inDown.animate}
            exit={varFade().inDown.exit}
            viewport={{
                once: false, 
                amount: 1
            }}
            transition={{ 
                duration: 1, 
                // delay: 0.5 
            }}
        >
            <Box>
                <Typography variant='h3' fontFamily={'peyda-bold'} sx={{ pb: 2 }}>سفارش به سبک کارانو</Typography>
                <Image alt={'karano'} src={'/assets/images/landing/how to order.jpg'} sx={{ width: 1, height: 1 }} />
            </Box>
        </m.div>
    )
}