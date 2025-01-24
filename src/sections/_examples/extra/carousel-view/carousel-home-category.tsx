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
import { ResponsiveObject } from 'react-slick';
import { useResponsive } from 'src/hooks/use-responsive';

export default function CarouselHomeCategory() {
  const [slidesToShow, setSlidesToShow] = useState<number>(10);
  const { authenticated } = useAuthContext();
  const { categories, categoryLoading } = useGetCategories();

  const router = useRouter();

  const searchParams = useSearchParams();

  const selectedCategoryId = searchParams.get('category') || '';

  const lgUp = useResponsive('up', 'lg');
  const mdUp = useResponsive('up', 'md');
  const smUp = useResponsive('up', 'sm');
  const xsUp = useResponsive('up', 'xs');

  useEffect(() => {
    if (lgUp) setSlidesToShow(10)
    else if (mdUp) setSlidesToShow(6)
    else if (smUp) setSlidesToShow(4)
    else if (xsUp) setSlidesToShow(3)
    console.log(lgUp, mdUp, smUp, xsUp)
  }, [mdUp, xsUp, smUp, lgUp])

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
          <CarouselComponent length={categories.length} slidesToShow={slidesToShow} responsive={
            [
              {
                breakpoint: 5096,
                settings: {
                  slidesToShow: 10
                },
              },
              {
                breakpoint: 1024,
                settings: { slidesToShow: 6 },
              },
              {
                breakpoint: 992,
                settings: { slidesToShow: 4, centerPadding: '20' },
              },
              {
                breakpoint: 768,
                settings: { slidesToShow: 3, centerPadding: '20' },
              },
            ]
          }>
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
  label?: string;
  responsive?: ResponsiveObject[] | undefined
}


export function CarouselComponent({ children, length, slidesToShow = 4, dots, label, responsive }: CarouselComponentProps) {

  const carousel = useCarousel({
    autoplay: false,
    rtl: false,
    slidesToShow: slidesToShow,
    infinite: false,
    initialSlide: length - slidesToShow,
    swipeToSlide: true,
    draggable: true,
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
    })),
    responsive
  });

  console.log(slidesToShow)

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
            // display: 'none',
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
            // display: 'none',
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
