import Card from '@mui/material/Card';

import Image from 'src/components/image';
import Carousel, { useCarousel, CarouselArrowIndex } from 'src/components/carousel';
import { Box, Button, Divider, Grid, IconButton, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import Iconify from 'src/components/iconify';
import { m } from 'framer-motion';
import { varFade, MotionContainer } from 'src/components/animate';
import SvgColor from 'src/components/svg-color';
import ProductItemSlider from 'src/sections/product/product-slider-item';

// ----------------------------------------------------------------------

type Props = {
  data: {
    id: string;
    title: string;
    coverUrl: string;
    description: string;
  }[];
};

export default function CarouselBasic1({ data }: Props) {
  const carousel = useCarousel({
    autoplay: false,
  });

  // console.log(carousel.currentIndex)

  return (
    <Box component={MotionContainer}>
      <Grid container spacing={2}>
        <Grid sx={{ pb: 5 }} md={3} xs={12} item>
          <Typography variant='h3' fontFamily={'peyda-bold'}>
            {(carousel.currentIndex % 2 === 0) ?
              <m.span key={1}>درب های کابینت</m.span>
              : <m.span key={2} {...varFade().in}>درب های کابینت</m.span>}
          </Typography>

          <Stack direction={'row'}>
            <IconButton size='large' onClick={carousel.onNext}>
              <SvgColor
                src={`/assets/icons/product/arrow-narrow-right.svg`}
                sx={{ width: 24, height: 24 }}
              />
            </IconButton>
            <IconButton size='large' onClick={carousel.onPrev}>
              <SvgColor
                src={`/assets/icons/product/arrow-narrow-left.svg`}
                sx={{ width: 24, height: 24 }}
              />
            </IconButton>
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
          <Divider sx={{ borderStyle: 'solid' }} />
        </Grid>
        <Grid md={9} xs={12} item>
          <Carousel ref={carousel.carouselRef} {...carousel.carouselSettings}>
            {data.map((item, index: number) => (
              <Stack
                key={111554 + index}
                columnGap={2}
                rowGap={3}
                display="grid!important"
                gridTemplateColumns={{
                  xs: 'repeat(2, 1fr)',
                  md: 'repeat(3, 1fr)',
                }}
              >
                {[...Array(6)].map((v, key) => (
                  <ProductItemSlider ind={key} />
                ))}
              </Stack>
            ))}
          </Carousel>
        </Grid>
      </Grid>
    </Box>
  );
}
