import Carousel, { useCarousel, CarouselArrowIndex, CarouselArrows } from 'src/components/carousel';
import { Box, Button, Divider, Grid, IconButton, Skeleton, Typography } from '@mui/material';
import { varFade, MotionContainer } from 'src/components/animate';
import { bgGradient } from 'src/theme/css';
import { alpha, useTheme } from '@mui/material/styles';
import CarouselArrowsCustom from 'src/components/carousel/carousel-arrows-custom';
import { useGetCategories } from 'src/api/category';
import { useRouter, useSearchParams } from 'src/routes/hooks';
import { useEffect, useState } from 'react';
import { paths } from 'src/routes/paths';
import TiltCard from 'src/components/animation/tilt-card';
import { useAuthContext } from 'src/auth/hooks';
import _ from 'lodash';

export default function CarouselHomeCategory() {
  const { authenticated } = useAuthContext();
  const { categories, categoryLoading } = useGetCategories();

  const router = useRouter();

  const searchParams = useSearchParams();

  const selectedCategoryId = searchParams.get('category') || '';

  useEffect(() => {
    if (!selectedCategoryId && !categoryLoading) {
      router.replace("?category=" + categories[0]?.id?.toString());
    } else if (!categoryLoading) {
      router.replace("?category=" + categories[0]?.id?.toString());
    }
  }, [categoryLoading, authenticated])

  return (
    <Box component={MotionContainer} sx={{ borderBottom: '1px solid #D1D1D1', py: '26px' }}>
      <Box
        sx={{
          overflow: 'hidden',
          position: 'relative'
        }}
      >

        {categoryLoading ? (
          <Box display={'flex'} gap={2}>
            {[...new Array(12)].map((item, index: number) => (
              <Box key={index}>
                <Skeleton sx={{ width: '180px', height: 48 }} />
              </Box>
            ))}
          </Box>
        ) :
          <CarouselComponent categories={categories} selectedCategoryId={selectedCategoryId} />
        }
      </Box>
    </Box>
  );
}


function CarouselComponent({ categories, selectedCategoryId }: any) {
  console.log(categories.length)
  const carousel = useCarousel({
    autoplay: false,
    rtl: false,
    slidesToShow: 10,
    infinite: false,
    initialSlide: categories.length - 10,
    // slidesToShow: 10,
    swipeToSlide: true,
    // draggable: true,
    centerMode: false,
    // rows: 1,
    // responsive: [
    //   {
    //     breakpoint: 1366,
    //     settings: {
    //       slidesToShow: 8
    //     },
    //   },
    //   {
    //     breakpoint: 1024,
    //     settings: { slidesToShow: 4 },
    //   },
    //   // {
    //   //   breakpoint: 600,
    //   //   settings: { slidesToShow: 2 },
    //   // },
    //   {
    //     breakpoint: 500,
    //     settings: { slidesToShow: 3, centerPadding: '20' },
    //   },
    //   {
    //     breakpoint: 400,
    //     settings: { slidesToShow: 2, centerPadding: '20' },
    //   },
    // ],
  });

  const router = useRouter();

  console.log(carousel.carouselSettings.initialSlide, carousel.currentIndex)

  return (
    <CarouselArrowsCustom
      icon="icon-park-outline:right"
      onNext={() => carousel.onTogo(carousel.currentIndex + 1)}
      onPrev={() => carousel.onTogo(carousel.currentIndex - 1)}
      leftButtonBoxProps={{
        sx: {
          width: '120px',
          height: 1,
          left: 0,
          position: 'absolute',
          opacity: 1,
          zIndex: 1,
          visibility: 'visible',
          transition: 'opacity 0.3s ease-in-out',
          ...((carousel.currentIndex === categories.length - 10) && {
            // display: 'none',
            visibility: 'hidden',
            opacity: 0,
          }),
          ...bgGradient({
            direction: 'to right',
            startColor: `#fff 100%`,
            endColor: `${alpha("#fff", 0)} 100%`,
          }),
        }
      }}
      leftButtonProps={{
        sx: {
          left: 0,
        }
      }}
      rightButtonBoxProps={{
        sx: {
          width: '120px',
          height: 1,
          right: 0,
          position: 'absolute',
          visibility: 'visible',
          transition: 'opacity 0.3s ease-in-out',
          ...((carousel.currentIndex === 0) && {
            // display: 'none',
            visibility: 'hidden',
            opacity: 0,
          }),
          ...bgGradient({
            direction: 'to left',
            startColor: `#fff 100%`,
            endColor: `${alpha("#fff", 0)} 100%`,
          }),
        }
      }}
      rightButtonProps={{
        sx: {
          right: 0,
        }
      }}
    >
      <Carousel ref={carousel.carouselRef} {...carousel.carouselSettings}>
        {categories
          .map((v: any, index: number) => (
            <Box key={index}>
              <Button
                sx={{
                  m: 0,
                  height: 48,
                  py: 0,
                  border: '2px solid #f2f2f2',
                  color: '#000',
                  backgroundColor: '#F8F8F8',
                  borderRadius: '60px',
                  width: '90%!important',
                  textWrap: 'nowrap',
                  typography: 'body4',
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
                {v.name}
              </Button>
            </Box>
          ))}
      </Carousel>
    </CarouselArrowsCustom>
  )
}
