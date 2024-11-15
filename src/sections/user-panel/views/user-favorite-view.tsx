import { Typography } from "@mui/material";
import { Box, Stack } from "@mui/system";
import { useGetFavoriteProducts } from "src/api/favorites";
import Image from "src/components/image";
import { SecondaryButton } from "src/components/styles/buttons/secondary";
import ProductItemSlider from "src/sections/product/product-slider-item";



export default function UserFavoriteView() {

    const { favorites, isEmpty } = useGetFavoriteProducts();

    return (
        <Box>
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
            {(isEmpty && (
                <Box sx={{
                    border: (theme) => `1px solid #A9A9A9`,
                    borderRadius: '16px',
                    mb: 10
                }}>
                    <Stack direction="row" justifyContent="space-between" spacing={1} sx={{
                        p: '24px',
                    }}>
                        <Typography variant="title2" sx={{ width: 1, pb: '24px', borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}>
                            لیست علاقه‌مندی‌ها
                        </Typography>
                    </Stack>
                    <Box sx={{ textAlign: 'center' }}>
                        <Image src="/assets/images/user-panel/fave-emty-state.png" />
                    </Box>
                </Box>
            ))}
        </Box>

    )
}