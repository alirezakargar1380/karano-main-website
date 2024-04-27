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
    slidesToShow: 3,
    draggable: true,
    // centerMode: true,
    className: 'carousel-basic-2',
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 2 },
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

function CarouselItem({ item }: { item: any }) {
  const [show, setShow] = useState(false)
  const theme = useTheme();
  const systemShadows = theme.shadows.slice(1, theme.shadows.length);

  return (
    <Box sx={{
      display: 'flex'
      // position: 'absolute',
      // height: 1,
      // width: 1,
      // top: 0,
      // left: 0
    }}>
      <Image alt={item.title} src={item.coverUrl} ratio="4/3" borderRadius={'12px'}
        onMouseOver={() => {
          setShow(true)
        }}
      />
      <Box
        display={show ? 'flex' : 'none'}
        // onClick={() => setShow(false)}
        sx={{
          position: 'absolute',
          top: -30, zIndex: 100
        }}
      >
        <Box
          bgcolor={'white'}
          sx={{
            width: '300px', height: '500px',
            borderRadius: '12px',
            boxShadow: theme.customShadows.z20,
          }}
        >
          <Image src={'/img/product/product.png'} ratio="4/3" borderRadius={'12px'} />
          <Stack direction={'row'}>
            <Box width={1} textAlign={'left'}>
              <Typography variant='h6'>
                درب کابینتی p-60
              </Typography>
            </Box>
            <Box width={120} height={120} bgcolor={'white'} border={'1px solid #D1D1D1'} borderRadius={'12px'}>
              <Image src={'/img/product/product.png'} ratio="4/3" borderRadius={'12px'} />
            </Box>
          </Stack>
        </Box>

        <IconButton onClick={() => { setShow(false) }} sx={{ bgcolor: 'white', height: 'fit-content', boxShadow: theme.customShadows.z16, mr: 2, borderRadius: '50%', border: '1px solid #D1D1D1', '&:hover': { background: '#F2F2F2' } }}>
          <SvgColor src='/assets/icons/navbar/x-close.svg' />
        </IconButton>

      </Box>
    </Box>
  )
}
function CarouselItem2({ item }: { item: any }) {
  const [show, setShow] = useState(false)
  const theme = useTheme();
  const systemShadows = theme.shadows.slice(1, theme.shadows.length);

  const customizedPopover = usePopover();

  return (
    <Box sx={{
      // position: 'absolute',
      // height: 1,
      // width: 1,
      // top: 0,
      // left: 0
    }}>
      <CustomPopover
        open={customizedPopover.open}
        anchorOrigin={{
          horizontal: 'center',
          vertical: 'top'
        }}
        onClose={customizedPopover.onClose}
        // arrow={''}
        hiddenArrow={true}
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
        onMouseOver={customizedPopover.onOpen}
      />

    </Box>
  )
}
