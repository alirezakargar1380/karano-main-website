import Card from '@mui/material/Card';

import Image from 'src/components/image';
import Carousel, { useCarousel, CarouselArrowIndex, CarouselArrows } from 'src/components/carousel';
import { Box, Button, Divider, Grid, IconButton, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import Iconify from 'src/components/iconify';
import { m } from 'framer-motion';
import { varFade, MotionContainer } from 'src/components/animate';
import SvgColor from 'src/components/svg-color';
import ProductItemSlider from 'src/sections/product/product-slider-item';
import { bgGradient } from 'src/theme/css';
import { alpha, useTheme } from '@mui/material/styles';

export default function CarouselHomeCategory() {
  const carousel = useCarousel({
    autoplay: false,
    rtl: false,
    slidesToShow: 11,
    swipeToSlide: true
  });

  return (
    <Box component={MotionContainer} sx={{ borderBottom: '1px solid #D1D1D1', pb: 3 }}>
      <Box
        sx={{
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        <CarouselArrows
          filled
          icon="icon-park-outline:right"
          onNext={carousel.onPrev}
          onPrev={carousel.onNext}
          sx={{
            '&:hover': {}
          }}
          leftButtonProps={{
            sx: {
              '&:hover': {
                backgroundColor: 'transparent'
              },
              height: 1,
              width: '130px',
              right: 0,
              borderRadius: 0,
              backgroundColor: "#fff",
              ...bgGradient({
                direction: 'to right',
                startColor: `#fff 25%`,
                endColor: `${alpha("#fff", 0)} 100%`,
              }),
            }
          }}
          rightButtonProps={{
            sx: {
              '&:hover': {
                backgroundColor: 'transparent'
              },
              height: 1,
              width: '130px',
              right: 0,
              borderRadius: 0,
              backgroundColor: "#fff",
              ...bgGradient({
                direction: 'to left',
                startColor: `#fff 25%`,
                endColor: `${alpha("#fff", 0)} 100%`,
              }),
            }
          }}
        >
          <Carousel ref={carousel.carouselRef} {...carousel.carouselSettings}>
            {/* <Stack
          columnGap={2}
          rowGap={3}
          display="grid!important"
          gridTemplateColumns={{
            xs: 'repeat(1, 1fr)',
            md: 'repeat(6, 1fr)',
          }}
        >
          {[...Array(16)].map((v, key) => (
            <ProductItemSlider ind={key} />
          ))}
        </Stack> */}
            {["درب کابینتی", "درب", "درب ضد سرقت", "چوب", "پنجره", "درب کابینتی", "درب", "درب ضد سرقت", "چوب", "پنجره", "درب کابینتی", "درب", "درب ضد سرقت", "چوب", "پنجره", "درب کابینتی", "درب", "درب ضد سرقت", "چوب", "پنجره"].map((v, key) => (
              <Button sx={{ border: '2px solid #f2f2f2', color: '#000', backgroundColor: '#F8F8F8', borderRadius: '24px', width: '90%!important' }}>{v}</Button>
            ))}
          </Carousel>
        </CarouselArrows>

      </Box>

    </Box>
  );
}
