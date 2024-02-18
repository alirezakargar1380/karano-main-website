import { Stack } from "@mui/material";
import { IProductItem } from "src/types/product";
import Image from 'src/components/image';
import { Box, Button, Divider, Grid, IconButton, Typography } from '@mui/material';
import Iconify from 'src/components/iconify';
import { useState } from "react";
import { varFade, varScale, MotionContainer, MotionViewport } from 'src/components/animate';

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

    const Img = (props: any) => (
        <Image
            component={MotionViewport}
            key={props.key}
            src={img}
            {...varFade({ durationIn: 1, durationOut: 0.25 }).in}
            ratio="1/1"
            border={'1px solid #E0E0E0'}
            borderRadius={'8px'}
            onMouseOver={onHoverHandler}
            onMouseOut={onHoverOutHandler}
        />
    )

    return (
        <Stack sx={{ textAlign: 'left', alignItems: 'end' }} spacing={1} key={ind} >
            {hover ? <Img key={1} /> : <Img key={2} /> }


            <Typography variant='h5' sx={{
                mt: 1, '&:hover': {
                    cursor: 'pointer'
                }
            }}>درب ضد سرقت</Typography>
            <Stack direction={'row'}>
                <Typography sx={{ pt: 0.5, pl: 1, fontSize: '16px' }}>کد 65</Typography>
                <IconButton size='medium' sx={{ p: 0 }}>
                    <Iconify icon="icon-park-solid:like" />
                </IconButton>
            </Stack>
        </Stack>
    )
}