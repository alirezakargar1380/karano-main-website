import Carousel, { useCarousel, CarouselArrowIndex } from 'src/components/carousel';
import { Box, Button, Container, Divider, Grid, IconButton, Typography } from '@mui/material';
import { Stack, SxProps, Theme } from '@mui/system';
import Iconify from 'src/components/iconify';
import { m } from 'framer-motion';
import { varFade, MotionContainer, MotionViewport } from 'src/components/animate';
import SvgColor from 'src/components/svg-color';
import ProductItemSlider from 'src/sections/product/product-slider-item';
import { useGetCategories, useGetCategoryProducts } from 'src/api/category';
import { useRouter, useSearchParams } from 'src/routes/hooks';
import { useCallback, useEffect, useState } from 'react';
import { ICategory } from 'src/types/category';
// ----------------------------------------------------------------------

type Props = {
  sx?: SxProps<Theme>;
};

export default function CarouselBasic1({ sx }: Props) {
  const [category, setCategory] = useState<ICategory | undefined>();

  const router = useRouter();

  const carousel = useCarousel({
    autoplay: false,
    fade: false
  });

  const { categories } = useGetCategories();

  const searchParams = useSearchParams();

  const selectedCategoryId = searchParams.get('category') || '';

  const { products, favProductIds } = useGetCategoryProducts(selectedCategoryId);

  useEffect(() => {
    setCategory(categories.find((category) => category.id === Number(selectedCategoryId)));
  }, [selectedCategoryId, categories]);

  console.log(category)

  const onNext = useCallback(() => {
    carousel.onPrev();

    const currentCategory = categories.find((category) => category.id === Number(selectedCategoryId))

    if (!currentCategory) return

    const currentCategoryIndex = categories.indexOf(currentCategory)

    if (categories[currentCategoryIndex + 1]) {
      router.push("?category=" + categories[currentCategoryIndex + 1]?.id);
    } else {
      router.push("?category=" + categories[0]?.id);
    }

  }, [carousel, selectedCategoryId, categories, router])

  const onPrev = useCallback(() => {
    carousel.onNext();

    const currentCategory = categories.find((category) => category.id === Number(selectedCategoryId))

    if (!currentCategory) return

    const currentCategoryIndex = categories.indexOf(currentCategory)

    if (categories[currentCategoryIndex - 1]) {
      router.push("?category=" + categories[currentCategoryIndex - 1]?.id);
    } else {
      router.push("?category=" + categories[categories.length - 1]?.id);
    }

  }, [carousel, selectedCategoryId, categories, router])

  return (
    <Box sx={{ ...sx }} component={MotionContainer}>
      <Grid container spacing={'40px'}>
        <Grid sx={{ pb: 5, pr: '24px' }} md={3} xs={12} item>
          <Typography variant='heading1'>
            {category?.name || ''}
            {/* <TextAnimate
              text={categories.find((category) => category.id === Number(selectedCategoryId))?.name || ''}
              sx={{
                color: '#000',
                typography: 'heading1'
              }}
              variants={varFade().in}
              px={.45}
            /> */}
          </Typography>
          <Stack direction={'row'}>
            <IconButton size='large' onClick={onPrev}>
              <SvgColor
                src={`/assets/icons/product/arrow-narrow-right.svg`}
                sx={{ width: 24, height: 24 }}
                color={"#000"}
              />
            </IconButton>
            <IconButton size='large' onClick={onNext}>
              <SvgColor
                src={`/assets/icons/product/arrow-narrow-left.svg`}
                sx={{ width: 24, height: 24 }}
                color={"#000"}
              />
            </IconButton>
          </Stack>
          <Divider sx={{ borderStyle: 'solid' }} />
          <Stack sx={{ py: '16px', pl: 2.5 }} spacing={'16px'}>
            {category?.attributes?.split('،').map((word: string, index: number) => (
              <Typography key={index} variant='title2' sx={{ listStyleType: 'initial' }} display={'list-item'}>
                {word}
              </Typography>
            ))}
          </Stack>
          <Divider sx={{ borderStyle: 'solid' }} />
          <Typography variant='body2' sx={{ pt: '16px' }}>
            <m.span {...varFade().in}>
              {category?.description}
            </m.span>
          </Typography>
        </Grid>
        <Grid md={9} xs={12} item>
          <Carousel ref={carousel.carouselRef} {...carousel.carouselSettings}>
            <Stack
              columnGap={'20px'}
              rowGap={'32px'}
              display="grid!important"
              gridTemplateColumns={{
                xs: 'repeat(2, 1fr)',
                sm: 'repeat(2, 1fr)',
                md: 'repeat(3, 1fr)',
              }}
            >
              {products.map((v, key) => (
                <ProductItemSlider product={v} favorite={favProductIds.includes(v.id)} key={key} />
              ))}
            </Stack>
          </Carousel>
        </Grid>
      </Grid>
    </Box>
  );
}
