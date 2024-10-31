import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';

import Image from 'src/components/image';
import Carousel, { useCarousel, CarouselArrowIndex, CarouselDots } from 'src/components/carousel';
import { Box, IconButton, useTheme } from '@mui/material';
import { useState } from 'react';
import CarouselArrowsCustom from 'src/components/carousel/carousel-arrows-custom';
import { bgGradient } from 'src/theme/css';
import { alpha } from '@mui/material/styles';
import SvgColor from 'src/components/svg-color';
import CustomPopover from 'src/components/custom-popover/custom-popover';
import { usePopover } from 'src/components/custom-popover';

// ----------------------------------------------------------------------

type Props = {
  data: {
    id: string;
    title: string;
    coverUrl: string;
    description: string;
  }[];
};

export default function CarouselBasic2({ data }: Props) {
  const carousel = useCarousel({
    // fade: true,
    autoplay: false,
    slidesToShow: 2.5,
    draggable: true,
    // centerPadding: '50px',
    className: 'carousel-basic-2',
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 2.5, centerPadding: '50px' },
      },
      {
        breakpoint: 800,
        settings: { slidesToShow: 1 },
      },
      {
        breakpoint: 600,
        settings: { slidesToShow: 1 },
      },
    ],
  });

  return (
    <Carousel ref={carousel.carouselRef} {...carousel.carouselSettings}>
      {data.map((item) => (
        <Stack key={item.id} p={0.5}>
          {/* <CarouselItem item={item} /> */}
          <CarouselItem2 item={item} />
          {/* <Image alt={item.title} src={item.coverUrl} ratio="4/3" borderRadius={'12px'} key={item.id} /> */}
        </Stack>
      ))}
    </Carousel>
  );
}

function CarouselItem2({ item }: { item: any }) {
  const [show, setShow] = useState(false)
  const theme = useTheme();
  const systemShadows = theme.shadows.slice(1, theme.shadows.length);

  const customizedPopover = usePopover();

  return (
    <Box>
      <CustomPopover
        open={customizedPopover.open}
        anchorOrigin={{
          horizontal: 'center',
          vertical: 'bottom'
        }}
        onClose={customizedPopover.onClose}
        arrow={'bottom-left'}
        hiddenArrow
      >
        <Box sx={{
          p: 2,
          maxWidth: 380,
        }}>
          <Image src={'/img/product/product.png'} ratio="4/3" borderRadius={'12px'} />
          <Stack direction={'row'} spacing={2} mt={3}>
            <Box width={180} height={'fit-content'} bgcolor={'white'} border={'1px solid #D1D1D1'} borderRadius={'12px'}>
              <Image src={'/img/product/product.png'} sx={{ width: 1 }} />
            </Box>
            <Box width={1} textAlign={'left'}>
              <Typography variant='h6'>
                درب کابینتی p-60
              </Typography>
              <Typography variant='body2' color={'text.secondary'}>
                دسته بندی محصول
              </Typography>
            </Box>
          </Stack>
        </Box>
      </CustomPopover>
      <Image alt={item.title} src={item.coverUrl} ratio="4/3" borderRadius={'12px'}
        onClick={customizedPopover.onOpen}
      />
    </Box>
  )
}
