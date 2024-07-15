import { Link, Stack } from "@mui/material";
import { IProductItem } from "src/types/product";
import Image from 'src/components/image';
import { Box, Button, Divider, Grid, IconButton, Typography } from '@mui/material';
import Iconify from 'src/components/iconify';
import { useCallback, useState } from "react";
import { varFade, varScale, MotionContainer, MotionViewport, varZoom } from 'src/components/animate';
import { m } from 'framer-motion';
import TiltCard from "src/components/animation/tilt-card";
import SvgColor from "src/components/svg-color";
import { endpoints, server_axios } from "src/utils/axios";
import { useSnackbar } from 'src/components/snackbar';
import { useAuthContext } from "src/auth/hooks";

type Props = {
    product: IProductItem
    favorite: boolean
};

export default function ProductItemSlider({ product, favorite = false }: Props) {
    const { authenticated } = useAuthContext();
    const [isFavorite, setFavorite] = useState<boolean>(favorite);

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

    const { enqueueSnackbar } = useSnackbar();

    const handleAddToFavorites = useCallback(async () => {
        await server_axios.post(endpoints.favorite.create, {
            product: { id: product.id },
        })
        setFavorite(true);
        enqueueSnackbar("محصول به علاقه مندی های شما اضافه شد", {
            variant: 'info'
        })
    }, [product]);

    const handleRemoveToFavorites = useCallback(async () => {
        await server_axios.delete(endpoints.favorite.delete(product.id))
        setFavorite(false);
        enqueueSnackbar("محصول از علاقه مندی های شما حذف شد", {
            variant: 'error'
        });
    }, [product]);

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
        <Box sx={{
            transform: !hover ? 'scale(0.98)' : 'scale(1)',
            transition: '0.3s ease-in-out'
        }}
        >
            <Link href={`/product/${product?.id}/`} color={'inherit'} underline="none">
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

                </Stack>
            </Link>
            <Stack direction={'row'} sx={{ textAlign: 'left', alignItems: 'end' }}>
                <IconButton size='small' sx={{ bgcolor: "#D1D1D1" }} onClick={isFavorite ? handleRemoveToFavorites : handleAddToFavorites}>
                    {isFavorite ?
                        <SvgColor src="/assets/icons/product/saved-icon-products.svg" color={"#000"} sx={{ width: 20, height: 20 }} />
                        :
                        <SvgColor src="/assets/icons/product/save-icon-products.svg" color={"#fff"} sx={{ width: 20, height: 20 }} />
                    }
                </IconButton>
                <Typography sx={{ pt: 0.5, pl: 1, fontSize: '16px' }} fontFamily={'peyda-regular'}>کد {product?.code}</Typography>
            </Stack>
        </Box>
    )
}