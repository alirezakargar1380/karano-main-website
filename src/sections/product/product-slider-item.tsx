import { Link, Stack } from "@mui/material";
import { IProductItem } from "src/types/product";
import Image from 'src/components/image';
import { Box, Button, Divider, Grid, IconButton, Typography } from '@mui/material';
import Iconify from 'src/components/iconify';
import { useState } from "react";
import { varFade, varScale, MotionContainer, MotionViewport, varZoom } from 'src/components/animate';
import { m } from 'framer-motion';

type Props = {
    product?: IProductItem;
    ind: number
};

export default function ProductItemSlider({ product, ind }: Props) {
    const [img, setImg] = useState('/img/product/product.png')
    const [hover, setHover] = useState(false)

    const onHoverHandler = () => {
        setImg('/img/product/product-hover.png')
        setHover(true)
    }

    const onHoverOutHandler = () => {
        setImg('/img/product/product.png')
        setHover(false)
    }

    // console.log(ind)

    const Img = () => {
        return (
            <Image
                sx={{
                    opacity: 1,
                    transition: '1s ease-in-out!important',
                    '& .lazy-load-image-loaded': {
                        transition: 'filter 0.6s ease-in-out!important'
                    }
                }}
                src={img}
                ratio="1/1"
                border={'1px solid #E0E0E0'}
                borderRadius={'8px'}
                onMouseOver={onHoverHandler}
                onMouseOut={onHoverOutHandler}
            />
        )
        return (
            <Box sx={{ width: 1 }}>
                <m.div
                    // initial={{ scale: 0.9 }}
                    // whileInView={varZoom().in.animate}
                    // exit={{ scale: 0.9 }}
                    initial={varFade().in.initial}
                    whileInView={varFade().in.animate}
                    exit={varZoom().in.animate}
                    viewport={{
                        once: true,
                        // amount: 1
                    }}
                    transition={{
                        duration: 6,
                        delay: 6
                    }}
                >
                    <Image
                        // component={MotionViewport}
                        src={img}
                        ratio="1/1"
                        border={'1px solid #E0E0E0'}
                        borderRadius={'8px'}
                        onMouseOver={onHoverHandler}
                        onMouseOut={onHoverOutHandler}
                    />
                </m.div>
            </Box>
        )
    }

    return (
        <Link href="/product/e99f09a7-dd88-49d5-b1c8-1daf80c2d7b2/" color={'inherit'} underline="none" key={ind}>
            <Box sx={{
                transform: !hover ? 'scale(0.98)' : 'scale(1)',
                transition: '0.3s ease-in-out'
            }}
            >
                <Stack sx={{ textAlign: 'left', alignItems: 'end' }} spacing={1}>
                    {hover ? <Img /> : <Img />}

                    <Typography variant='h5' sx={{
                        mt: 1, '&:hover': {
                            cursor: 'pointer'
                        }
                    }}>
                        درب ضد سرقت
                    </Typography>
                    <Stack direction={'row'}>
                        <Typography sx={{ pt: 0.5, pl: 1, fontSize: '16px' }} fontFamily={'peyda-regular'}>کد 65</Typography>
                        <IconButton size='medium' sx={{ p: 0 }}>
                            <Iconify icon="icon-park-solid:like" />
                        </IconButton>
                    </Stack>
                </Stack>
            </Box>

        </Link>
    )
}