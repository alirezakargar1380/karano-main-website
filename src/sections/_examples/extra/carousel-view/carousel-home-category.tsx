import Carousel, { useCarousel, CarouselArrowIndex, CarouselArrows } from 'src/components/carousel';
import { Box, Button, Divider, Grid, IconButton, Typography } from '@mui/material';
import { varFade, MotionContainer } from 'src/components/animate';
import { bgGradient } from 'src/theme/css';
import { alpha, useTheme } from '@mui/material/styles';
import CarouselArrowsCustom from 'src/components/carousel/carousel-arrows-custom';

export default function CarouselHomeCategory() {
  const carousel = useCarousel({
    autoplay: false,
    rtl: false,
    slidesToShow: 10,
    swipeToSlide: true,
    centerMode: true,
    responsive: [
      {
        breakpoint: 1366,
        settings: { slidesToShow: 6 },
      },
      {
        breakpoint: 1024,
        settings: { slidesToShow: 4 },
      },
      // {
      //   breakpoint: 600,
      //   settings: { slidesToShow: 2 },
      // },
      {
        breakpoint: 500,
        settings: { slidesToShow: 3, centerPadding: '20' },
      },
    ],
  });

  return (
    <Box component={MotionContainer} sx={{ borderBottom: '1px solid #D1D1D1', py: 3 }}>
      <Box
        sx={{
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        <CarouselArrowsCustom
          filled
          icon="icon-park-outline:right"
          onNext={carousel.onPrev}
          onPrev={carousel.onNext}
          leftButtonBoxProps={{
            sx: {
              display: (!carousel.currentIndex) ? 'none' : '',
              width: '80px',
              // border: '1px solid #D1D1D1',
              height: 1,
              position: 'absolute',
              zIndex: 100,
              ...bgGradient({
                direction: 'to right',
                startColor: `#fff 50%`,
                endColor: `${alpha("#fff", 0)} 100%`,
              }),
            }
          }}
          leftButtonProps={{
            sx: {
              border: '1px solid #D1D1D1',
              borderRadius: '26px',
              width: 'fit-content',
              '&:hover': {
                backgroundColor: 'transparent'
              },
              right: 0,
              backgroundColor: "#fff",
              ...bgGradient({
                direction: 'to right',
                startColor: `#fff 25%`,
                endColor: `${alpha("#fff", 0)} 200%`,
              }),
            }
          }}
          rightButtonBoxProps={{
            sx: {
              width: '80px',
              // border: '1px solid #D1D1D1',
              height: 1,
              position: 'absolute',
              right: 0,
              zIndex: 100,
              ...bgGradient({
                direction: 'to left',
                startColor: `#fff 50%`,
                endColor: `${alpha("#fff", 0)} 100%`,
              }),
            }
          }}
          rightButtonProps={{
            sx: {
              border: '1px solid #D1D1D1',
              borderRadius: '26px',
              width: 'fit-content',
              '&:hover': {
                backgroundColor: 'transparent'
              },
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
            {["درب کابینتی", "درب", "درب ضد سرقت", "چوب", "پنجره", "درب کابینتی", "درب", "درب ضد سرقت", "چوب", "پنجره", "درب کابینتی", "درب", "درب ضد سرقت", "چوب", "پنجره", "درب کابینتی", "درب", "درب ضد سرقت", "چوب", "پنجره"].map((v, index) => (
              <Button sx={{
                border: '2px solid #f2f2f2', color: '#000', backgroundColor: '#F8F8F8', borderRadius: '24px', width: '90%!important', textWrap: 'nowrap',
                '&: hover': {
                  border: '2px solid #000',
                  color: '#000'
                }

              }} key={index}>{v}</Button>
            ))}
          </Carousel>
        </CarouselArrowsCustom>

      </Box>

    </Box>
  );
}
