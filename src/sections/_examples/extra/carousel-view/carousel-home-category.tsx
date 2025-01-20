import Carousel, { useCarousel, CarouselArrowIndex, CarouselArrows, CarouselDots } from 'src/components/carousel';
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
          <CarouselComponent length={categories.length} slidesToShow={7}>
            {categories
              .map((v: any, index: number) => (
                <Box key={index}>
                  <Button
                    sx={{
                      m: 0,
                      height: 48,
                      py: 0,
                      // mx: '12px',
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
                    <Box px={'12px'}>{v.name}</Box>
                    
                  </Button>
                </Box>
              ))}
          </CarouselComponent>
        }
      </Box>
    </Box>
  );
}

interface CarouselComponentProps {
  children: React.ReactNode;
  length: number;
  slidesToShow?: number;
  dots?: boolean | undefined;
  vWidth?: boolean | undefined;
  label?: string;
}


export function CarouselComponent({ children, vWidth, length, slidesToShow = 4, dots, label }: CarouselComponentProps) {

  const carousel = useCarousel({
    autoplay: false,
    rtl: false,
    slidesToShow: slidesToShow,
    infinite: false,
    initialSlide: length - slidesToShow,
    // swipeToSlide: true,
    slidesToScroll: 4,
    draggable: true,
    onInit() {
      carousel.onTogo(length - slidesToShow)
    },
    // swipeEvent(swipeDirection) {
    //   console.log('swipeDirection', swipeDirection);
    //   if (swipeDirection === 'left') {
    //     carousel.onTogo(carousel.currentIndex + 4)
    //   } else if (swipeDirection === 'right') {
    //     carousel.onTogo(carousel.currentIndex - 4)
    //   }
    // },
    // beforeChange(from: number, to: number) {
    //   console.log('from', from, 'to', to);
    // },
    // afterChange(index: number) {
    //   console.log('index', index);
    // },
    // onEdge(swipeDirection) {
    //   console.log('swipeDirection', swipeDirection);
    //   if (swipeDirection === 'left') {
    //     carousel.onTogo(carousel.currentIndex + 4)
    //   } else if (swipeDirection === 'right') {
    //     carousel.onTogo(carousel.currentIndex - 4)
    //   }
    // },
    // onSwipe(swipeDirection) {
    //   if (swipeDirection === 'left') {
    //     carousel.onTogo(carousel.currentIndex + 4)
    //   } else {
    //     carousel.onTogo(carousel.currentIndex - 4)
    //   }
    // },
    ...(vWidth && {
      variableWidth: true,
    }),
    centerMode: false,
    ...(dots && CarouselDots({
      rounded: true,
      label: label,
      tvariant: 'title1',
      sx: {
        top: 10,
        // right: 20,
        zIndex: 101,
        px: '10px',
        position: 'absolute',
        color: '#000!important',
      },
    }))
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

  // console.log(carousel.currentIndex, length);

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
          ...((carousel.currentIndex === length - slidesToShow) && {
            visibility: 'hidden',
            opacity: 0,
          }),
          ...(!dots && bgGradient({
            direction: 'to right',
            startColor: `#fff 100%`,
            endColor: `${alpha("#fff", 0)} 100%`,
          }))
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
            visibility: 'hidden',
            opacity: 0,
          }),
          ...(!dots && bgGradient({
            direction: 'to left',
            startColor: `#fff 100%`,
            endColor: `${alpha("#fff", 0)} 100%`,
          }))
        }
      }}
      leftButtonProps={{
        sx: {
          ...(!dots && {
            left: 0,
          })
        }
      }}
      rightButtonProps={{
        sx: {
          ...(!dots && {
            right: 0,
          })
        }
      }}
    >
      <Carousel ref={carousel.carouselRef} {...carousel.carouselSettings}>
        {children}
        {/* {categories
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
          ))} */}
      </Carousel>
    </CarouselArrowsCustom>
  )
}
