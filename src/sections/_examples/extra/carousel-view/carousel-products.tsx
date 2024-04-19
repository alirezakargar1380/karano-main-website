import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';

import Image from 'src/components/image';
import Carousel, { useCarousel, CarouselArrowIndex, CarouselArrows, CarouselDots } from 'src/components/carousel';
import ProductItemSlider from 'src/sections/product/product-slider-item';
import { Box } from '@mui/system';

// ----------------------------------------------------------------------

type Props = {
  data: {
    id: string;
    title: string;
    coverUrl: string;
    description: string;
  }[];
};

export default function CarouselProducts({ data }: Props) {
  const carousel = useCarousel({
    fade: true,
    autoplay: true,
    slidesToShow: 4,
    draggable: true,
    initialSlide: 2,
    centerMode: true,
    ...CarouselDots({
      rounded: true,
      sx: {
        top: 10,
        right: 15,
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
        breakpoint: 480,
        settings: { slidesToShow: 1, centerPadding: '20' },
      },
    ],
  });

  return (
    <Box sx={{ position: 'relative' }}>
      <Typography variant='h3' fontFamily={'peyda-bold'} sx={{ position: 'absolute', top: 0 }}>پرفروش ها!</Typography>
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
    </Box>
  );
}
