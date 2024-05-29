import Card from '@mui/material/Card';

import Image from 'src/components/image';
import Carousel, { useCarousel, CarouselArrowIndex } from 'src/components/carousel';
import { Box, Button, Divider, Grid, IconButton, Typography } from '@mui/material';
import { Stack, SxProps, Theme } from '@mui/system';
import Iconify from 'src/components/iconify';
import { m } from 'framer-motion';
import { varFade, MotionContainer, MotionViewport } from 'src/components/animate';
import SvgColor from 'src/components/svg-color';
import ProductItemSlider from 'src/sections/product/product-slider-item';
import { useGetCategories, useGetCategoryProducts } from 'src/api/category';
import { useRouter, useSearchParams } from 'src/routes/hooks';
import { useCallback, useEffect } from 'react';
// ----------------------------------------------------------------------

type Props = {
  sx?: SxProps<Theme>;
  data: {
    id: string;
    title: string;
    coverUrl: string;
    description: string;
  }[];
};

export default function CarouselBasic1({ data, sx }: Props) {

  const router = useRouter();

  const carousel = useCarousel({
    autoplay: false,
    fade: false
  });

  const { categories } = useGetCategories();

  const searchParams = useSearchParams();

  const selectedCategoryId = searchParams.get('category') || '';

  const { products } = useGetCategoryProducts(selectedCategoryId);
  console.log("=========>>> products", products)

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
    <Box sx={{ ...sx }}>
      <Grid container spacing={2}>
        <Grid sx={{ pb: 5 }} md={3} xs={12} item>
          <Typography variant='h2' fontFamily={'peyda-bold'}>
            <m.span key={1 * Math.random()}>
              {categories.find((category) => category.id === Number(selectedCategoryId))?.name}
            </m.span>
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
          <Stack sx={{ p: 2, fontFamily: 'peyda-black' }}>
            <Typography variant='body2' sx={{ p: 1, listStyleType: 'initial' }} fontFamily={'peyda-black'} display={'list-item'}>مونتاژ شده</Typography>
            <Typography variant='body2' sx={{ p: 1, listStyleType: 'initial' }} fontFamily={'peyda-black'} display={'list-item'}>
              قابلیت ثبت ابعاد سفارشی
            </Typography>
          </Stack>
          <Divider sx={{ borderStyle: 'solid' }} />
          <Typography variant='body2' sx={{ p: 2 }}>
            {(carousel.currentIndex % 2 === 0) ?
              <m.span key={1} {...varFade().in}>
                یک خرید اینترنتی مطمئن، نیازمند فروشگاهی است که بتواند کالاهایی متنوع، باکیفیت و دارای قیمت مناسب را در مدت زمانی کوتاه به دست مشتریان خود برساند و ضمانت بازگشت کالا هم داشته باشد؛ ویژگی‌هایی که فروشگاه اینترنتی کارانو مدت‌هاست بر روی آن‌ها کار کرده و توانسته از این طریق مشتریان ثابت خود را داشته باشد.
              </m.span>
              : <m.span key={2} {...varFade().in}>
                یک خرید اینترنتی مطمئن، نیازمند فروشگاهی است که بتواند کالاهایی متنوع، باکیفیت و دارای قیمت مناسب را در مدت زمانی کوتاه به دست مشتریان خود برساند و ضمانت بازگشت کالا هم داشته باشد؛ ویژگی‌هایی که فروشگاه اینترنتی کارانو مدت‌هاست بر روی آن‌ها کار کرده و توانسته از این طریق مشتریان ثابت خود را داشته باشد.
              </m.span>}
          </Typography>
        </Grid>
        <Grid md={9} xs={12} item>
          <Carousel ref={carousel.carouselRef} {...carousel.carouselSettings}>
            <Stack
              columnGap={2}
              rowGap={3}
              display="grid!important"
              gridTemplateColumns={{
                xs: 'repeat(2, 1fr)',
                sm: 'repeat(2, 1fr)',
                md: 'repeat(3, 1fr)',
              }}
            >
              {products.map((v, key) => (
                <ProductItemSlider product={v} ind={key * Math.random()} key={key} />
              ))}
            </Stack>
          </Carousel>
        </Grid>
      </Grid>
    </Box>
  );
}
