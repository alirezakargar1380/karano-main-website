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
    initialSlide: 0,
    // centerPadding: '50px',
    className: 'carousel-basic-2',
    ...CarouselDots({
      rounded: true,
      // tvariant: 'title1',
      sx: {
        top: -46,
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
        settings: { slidesToShow: 3, centerPadding: '50px' },
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

  const [open, setOpen] = useState(false);

  return (
    <Box sx={{ position: 'relative' }}>
      <Box position={'absolute'} zIndex={1001} top={"-100%"}
        sx={{
          display: 'flex',
          p: 3,
          right: -16,
          clipPath: 'inset(0 100% 0 0)',
          // right: -1000,
          gap: '16px',
          transition: '1s ease-in-out',
          ...(open && {
            clipPath: 'inset(0 0 0 0)',
            opacity: 1,
          })
        }}>
        <IconButton onClick={() => setOpen(false)} sx={{ width: 36, height: 36, mt: '20px', boxShadow: '3px 0px 15px 0px #00000045', bgcolor: 'white', borderRadius: '50%', border: '1px solid #D1D1D1', '&:hover': { background: '#F2F2F2' } }}>
          <SvgColor src="/assets/icons/navbar/x-close.svg" color={"#000"} />
        </IconButton>
        <Box borderRadius={'12px'} sx={{
          p: '16px',
          minWidth: 528,
          bgcolor: "white",
          boxShadow: '3px 0px 15px 0px #00000045'
        }}>
          <Image src={'/img/product/product.png'} ratio="1/1" borderRadius={'8px'} border={'1px solid #D1D1D1'} />
          <Stack direction={'row'} spacing={2} mt={'20px'}>
            <Box height={'fit-content'} bgcolor={'white'} border={'1px solid #D1D1D1'} borderRadius={'12px'}>
              <Box width={1} position={'relative'}>
                <Box sx={{
                  position: 'absolute',
                  top: 8,
                  left: 8,
                  zIndex: 1
                }}>
                  <IconButton
                    size='small' sx={{
                      bgcolor: "#D1D1D1",
                      "&.Mui-disabled": {
                        backgroundColor: "#f0f0f0!important"
                      }
                    }}
                  >
                    <SvgColor src="/assets/icons/product/save-icon-products.svg" color={"#fff"} sx={{ width: 16, height: 16 }} />
                  </IconButton>
                </Box>
              </Box>

              <Image src={'/img/product/product.png'} ratio='1/1' sx={{ width: 140 }} />
            </Box>
            <Box width={1} textAlign={'left'} height={'fit-content'}>
              <Typography variant='title3'>
                درب کابینتی p-60
              </Typography>
              <Typography variant='body4' color={'#727272'}>
                دسته بندی محصول
              </Typography>
              <Typography variant='body4' color={'#121212'}>
                ابعاد:
              </Typography>
              <Stack direction={'row'} alignItems={'center'} spacing={1}>
                <Typography variant='body4' color={'#2B2B2B'}>
                  قابل ثبت به صورت سفارشی
                </Typography>
                <SvgColor src='/assets/icons/home/help-circle.svg' />
              </Stack>
            </Box>
          </Stack>
        </Box>
      </Box>
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
          {data.map((item) => (


            <Stack key={item.id} p={1} onClick={() => setOpen(true)}>
              <CarouselItem2 item={item} />
            </Stack>

          ))}
        </Carousel>
      </CarouselArrowsCustom>
    </Box>
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
        sx={{ bgcolor: "#fff" }}
      >
        <Box sx={{
          p: '16px',
          minWidth: 528,
        }}>

          <Image src={'/img/product/product.png'} ratio="1/1" borderRadius={'12px'} border={'1px solid #D1D1D1'} />
          <Stack direction={'row'} spacing={2} mt={'20px'}>
            <Box height={'fit-content'} bgcolor={'white'} border={'1px solid #D1D1D1'} borderRadius={'12px'}>
              <Box width={1} position={'relative'}>
                <Box sx={{
                  position: 'absolute',
                  top: 8,
                  left: 8,
                  zIndex: 1
                }}>
                  <IconButton
                    size='small' sx={{
                      bgcolor: "#D1D1D1",
                      "&.Mui-disabled": {
                        backgroundColor: "#f0f0f0!important"
                      }
                    }}
                  >
                    <SvgColor src="/assets/icons/product/save-icon-products.svg" color={"#fff"} sx={{ width: 16, height: 16 }} />
                  </IconButton>
                </Box>
              </Box>

              <Image src={'/img/product/product.png'} ratio='1/1' sx={{ width: 140 }} />
            </Box>
            <Box width={1} textAlign={'left'} height={'fit-content'}>
              <Typography variant='title3'>
                درب کابینتی p-60
              </Typography>
              <Typography variant='body4' color={'#727272'}>
                دسته بندی محصول
              </Typography>
              <Typography variant='body4' color={'#121212'}>
                ابعاد:
              </Typography>
              <Stack direction={'row'} alignItems={'center'} spacing={1}>
                <Typography variant='body4' color={'#2B2B2B'}>
                  قابل ثبت به صورت سفارشی
                </Typography>
                <SvgColor src='/assets/icons/home/help-circle.svg' />
              </Stack>
            </Box>
          </Stack>
        </Box>
      </CustomPopover>
      <Image alt={item.title} src={item.coverUrl} ratio="4/3" borderRadius={'12px'}
      // onClick={customizedPopover.onOpen}
      />
    </Box>
  )
}
