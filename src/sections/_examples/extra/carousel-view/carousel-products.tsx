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
    fade: false,
    autoplay: false,
    slidesToShow: 4,
    // draggable: true,
    rtl: true,
    ...CarouselDots({
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
    }),
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: 800,
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: 600,
        settings: { slidesToShow: 1, centerPadding: '20' },
      },
    ],
  });

  return (
    <Box sx={{ position: 'relative' }}>
      <CarouselArrowsCustom
        filled
        icon="icon-park-outline:right"
        onNext={carousel.onPrev}
        onPrev={carousel.onNext}
        leftButtonBoxProps={{
          sx: {
            display: (!carousel.currentIndex) ? 'none' : '',
            width: '80px',
            height: 1,
            position: 'absolute',
            zIndex: 100,
          }
        }}
        rightButtonBoxProps={{
          sx: {
            width: '80px',
            height: 1,
            position: 'absolute',
            right: 0,
            zIndex: 100,
          }
        }}
      >
        <Carousel ref={carousel.carouselRef} {...carousel.carouselSettings}>
          {data.map((item, index) => (
            <Box key={index} sx={{ mt: 10, px: '8px', direction: 'ltr' }}>
              <ProductItemSlider
                product={{
                  id: 1,
                  coverUrl: 'http://localhost:4998/api/images/Fri Oct 11 2024_0d00f3ff-dd47-48fd-989f-cacccb156afa.jpg',
                  name: 'درب کابینتی',
                  code: '65',
                }}
              />
            </Box>
          ))}
        </Carousel>
      </CarouselArrowsCustom>
    </Box>
  );
}
