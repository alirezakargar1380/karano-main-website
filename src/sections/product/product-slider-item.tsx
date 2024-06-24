import { Link, Stack } from "@mui/material";
import { IProductItem } from "src/types/product";
import Image from 'src/components/image';
import { Box, Button, Divider, Grid, IconButton, Typography } from '@mui/material';
import Iconify from 'src/components/iconify';
import { useState } from "react";
import { varFade, varScale, MotionContainer, MotionViewport, varZoom } from 'src/components/animate';
import { m } from 'framer-motion';
import TiltCard from "src/components/animation/tilt-card";
import SvgColor from "src/components/svg-color";
import { endpoints } from "src/utils/axios";

type Props = {
    product: IProductItem;
    ind: number
};

export default function ProductItemSlider({ product, ind }: Props) {
    const mainImageUrl = endpoints.image.url(product?.images?.find((img) => img.main)?.name || '');
    const hoverImageUrl = endpoints.image.url(product?.images?.find((img) => !img.main)?.name || '');

    const [img, setImg] = useState(mainImageUrl)
    const [hover, setHover] = useState(false)

    const onHoverHandler = () => {
        setImg(hoverImageUrl)
        setHover(true)
    }

    const onHoverOutHandler = () => {
        setImg(mainImageUrl)
        setHover(false)
    }

    // console.log(ind)

    const Img = () => {
        return (
            <Image
                sx={{
                    opacity: (hover) ? 0 : 1,
                    transition: '0.6s ease-in!important',
                    '&:hover': {
                        opacity: 1,
                        transition: '0.6s ease-out!important',
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
    }

    return (
        <Link href={`/product/${product?.id}/`} color={'inherit'} underline="none" key={ind}>
            {/* <TiltCard> */}
                <Box sx={{
                    transform: !hover ? 'scale(0.98)' : 'scale(1)',
                    transition: '0.3s ease-in-out'
                }}
                >
                    <Stack sx={{ textAlign: 'right', alignItems: 'start' }} spacing={1}>
                        {hover ? <Img /> : <Img />}

                        <Typography variant='h5' sx={{
                            mt: 1, '&:hover': {
                                cursor: 'pointer'
                            },
                            textAlign: 'left'
                        }}>
                            {product?.name}
                        </Typography>
                        <Stack direction={'row-reverse'}>
                            <Typography sx={{ pt: 0.5, pl: 1, fontSize: '16px' }} fontFamily={'peyda-regular'}>کد {product?.code}</Typography>
                            <IconButton size='small' sx={{ bgcolor: "#D1D1D1" }}>
                                {/* <Iconify icon="icon-park-solid:like" /> */}
                                <SvgColor src="/assets/icons/product/save-icon-products.svg" color={"#fff"} sx={{ width: 20, height: 20 }} />
                            </IconButton>
                        </Stack>
                    </Stack>
                </Box>
            {/* </TiltCard> */}
        </Link>
    )
}