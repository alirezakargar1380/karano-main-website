import { Box, Stack } from "@mui/system";
import { useGetFavoriteProducts } from "src/api/favorites";
import ProductItemSlider from "src/sections/product/product-slider-item";



export default function UserFavoriteView() {

    const { favorites } = useGetFavoriteProducts();

    console.log(favorites)

    return (
        <Stack
            columnGap={2}
            rowGap={3}
            display="grid!important"
            gridTemplateColumns={{
                xs: 'repeat(2, 1fr)',
                sm: 'repeat(3, 1fr)',
                md: 'repeat(4, 1fr)',
            }}
        >
            {favorites.map((fav) => (
                <ProductItemSlider product={fav.product} favorite={true} />
            ))}
        </Stack>
    )
}