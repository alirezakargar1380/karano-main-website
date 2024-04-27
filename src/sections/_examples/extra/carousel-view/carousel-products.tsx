import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';

import Image from 'src/components/image';
import Carousel, { useCarousel, CarouselArrowIndex, CarouselArrows, CarouselDots } from 'src/components/carousel';
import ProductItemSlider from 'src/sections/product/product-slider-item';
import { Box } from '@mui/system';
import CarouselArrowsCustom from 'src/components/carousel/carousel-arrows-custom';
import { bgGradient } from 'src/theme/css';
import { alpha, useTheme } from '@mui/material/styles';

// ----------------------------------------------------------------------

type Props = {
  label?: string;
  data: {
    id: string;
    title: string;
    coverUrl: string;
    description: string;
  }[];
};

export default function CarouselProducts({ data, label }: Props) {
  const carousel = useCarousel({
    fade: true,
    autoplay: false,
    slidesToShow: 4,
    draggable: true,
    // initialSlide: 2,
    ...CarouselDots({
      rounded: true,
      sx: {
        top: 10,
        right: 15,
        zIndex: 101,
        position: 'absolute',
        color: '#000!important',
      },
    }),
    responsive: [
      // {
      //   breakpoint: 1366,
      //   settings: { slidesToShow: 6 },
      // },
      // {
      //   breakpoint: 1024,
      //   settings: { slidesToShow: 4 },
      // },
      // {
      //   breakpoint: 600,
      //   settings: { slidesToShow: 2 },
      // },
      {
        breakpoint: 600,
        settings: { slidesToShow: 1, centerPadding: '20' },
      },
    ],
  });

  return (
    <Box sx={{
      position: 'relative'
    }}>
      {label && (<Typography variant='h3' fontFamily={'peyda-bold'}>{label}</Typography>)}
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
            // ...bgGradient({
            //   direction: 'to right',
            //   startColor: `#fff 50%`,
            //   endColor: `${alpha("#fff", 0)} 100%`,
            // }),
          }
        }}
        leftButtonProps={{
          sx: {
            border: '1px solid #D1D1D1',
            borderRadius: '26px',
            width: 'fit-content',
            right: 0,
            backgroundColor: "#fff",
            // ...bgGradient({
            //   direction: 'to right',
            //   startColor: `#fff 25%`,
            //   endColor: `${alpha("#fff", 0)} 200%`,
            // }),
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
            // ...bgGradient({
            //   direction: 'to left',
            //   startColor: `#fff 50%`,
            //   endColor: `${alpha("#fff", 0)} 100%`,
            // }),
          }
        }}
        rightButtonProps={{
          sx: {
            border: '1px solid #D1D1D1',
            borderRadius: '26px',
            width: 'fit-content',
            backgroundColor: "#fff",
            // ...bgGradient({
            //   direction: 'to left',
            //   startColor: `#fff 25%`,
            //   endColor: `${alpha("#fff", 0)} 100%`,
            // }),
          }
        }}
      >
        <Carousel ref={carousel.carouselRef} {...carousel.carouselSettings}>
          {data.map((item, index) => (
            <Stack key={item.id} sx={{ mt: 10, px: 2 }}>
              <ProductItemSlider ind={index} />
              {/* <Image alt={item.title} src={item.coverUrl} ratio="4/3" />

            <CardContent sx={{ textAlign: 'left' }}>
              <Typography variant="h6" noWrap gutterBottom>
                {item.title}
              </Typography>

              <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
                {item.description}
              </Typography>
            </CardContent> */}
            </Stack>
          ))}
        </Carousel>
      </CarouselArrowsCustom>
    </Box>
  );
}
