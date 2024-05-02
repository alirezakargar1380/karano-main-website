import Carousel, { useCarousel, CarouselArrowIndex, CarouselArrows } from 'src/components/carousel';
import { Box, Button, Divider, Grid, IconButton, Typography } from '@mui/material';
import { varFade, MotionContainer } from 'src/components/animate';
import { bgGradient } from 'src/theme/css';
import { alpha, useTheme } from '@mui/material/styles';
import CarouselArrowsCustom from 'src/components/carousel/carousel-arrows-custom';
import { useGetCategories } from 'src/api/category';
import { useRouter, useSearchParams } from 'src/routes/hooks';
import { useEffect } from 'react';
import { paths } from 'src/routes/paths';
import TiltCard from 'src/components/animation/tilt-card';

export default function CarouselHomeCategory() {
  const router = useRouter();
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
      {
        breakpoint: 400,
        settings: { slidesToShow: 2, centerPadding: '20' },
      },
    ],
  });

  const { categories } = useGetCategories();

  const searchParams = useSearchParams();

  const selectedCategoryId = searchParams.get('category') || '';

  useEffect(() => {
    if (!selectedCategoryId) {
      router.push("?category=" + categories[0]?.id);
    } else {
      console.log("=========>>> selecte", selectedCategoryId)
    }
  }, [selectedCategoryId])

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
            {categories.map((v: any, index: number) => (
              <Box key={index}>
                <TiltCard halt_rotation_range={1.5} rotation_range={1.5}>
                  <Button sx={{
                    border: '2px solid #f2f2f2',
                    color: '#000',
                    backgroundColor: '#F8F8F8',
                    borderRadius: '24px',
                    width: '90%!important',
                    textWrap: 'nowrap',
                    my: 1,
                    '&: hover': {
                      border: '2px solid #000',
                      color: '#000'
                    },
                    ...(v.id == Number(selectedCategoryId) && {
                      border: '2px solid #000',
                      color: '#000'
                    })
                  }}

                    onClick={() => {
                      router.push("?category=" + v.id);
                    }}
                  >

                    {v.title}

                  </Button>
                </TiltCard>
              </Box>
            ))}
          </Carousel>
        </CarouselArrowsCustom>
      </Box>

    </Box>
  );
}
