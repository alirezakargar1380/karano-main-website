import { useEffect } from 'react';

import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import { alpha, styled, useTheme } from '@mui/material/styles';

import { bgGradient } from 'src/theme/css';

import Image from 'src/components/image';
import Lightbox, { useLightBox } from 'src/components/lightbox';
import Carousel, { useCarousel, CarouselArrowIndex, CarouselArrows } from 'src/components/carousel';

import { IProductItem } from 'src/types/product';
import { endpoints } from 'src/utils/axios';
import CarouselArrowsCustom from 'src/components/carousel/carousel-arrows-custom';

// ----------------------------------------------------------------------

const THUMB_SIZE = 64 * 3;

const StyledThumbnailsContainer = styled('div')<{ length: number }>(({ length, theme }) => ({
  position: 'relative',
  margin: theme.spacing(0, 'auto'),
  '& .slick-slide': {
    lineHeight: 0,
  },
  maxWidth: '140px',
  // ...(length === 1 && {
  //   maxWidth: THUMB_SIZE * 1 + 16,
  // }),

  // ...(length === 2 && {
  //   maxWidth: THUMB_SIZE * 1,
  // }),

  // ...((length === 3 || length === 4) && {
  //   maxWidth: THUMB_SIZE * 2 + 48,
  // }),

  // ...(length >= 5 && {
  //   maxWidth: THUMB_SIZE * 6,
  // }),

  width: '100%',

  ...(length > 3 && {
    '&:before, &:after': {
      // ...bgGradient({
      //   direction: 'to left',
      //   startColor: `${alpha(theme.palette.background.default, 0)} 0%`,
      //   endColor: `${theme.palette.background.default} 100%`,
      // }),
      top: 0,
      zIndex: 9,
      content: "''",
      height: '100%',
      position: 'absolute',
      // width: '100%',
      // width: (THUMB_SIZE * 2) / 3,
    },
    '&:after': {
      right: 0,
      transform: 'scaleX(-1)',
    },
  }),
}));

// ----------------------------------------------------------------------

type Props = {
  product: IProductItem;
};

export default function ProductDetailsCarousel({ product }: Props) {
  const theme = useTheme();

  const slides = product.images.map((img) => ({
    src: endpoints.image.url(img.name),
  }));

  const lightbox = useLightBox(slides);

  const carouselLarge = useCarousel({
    rtl: true,
    draggable: false,
    adaptiveHeight: true,
  });

  const carouselThumb = useCarousel({
    rtl: false,
    swipeToSlide: true,
    // focusOnSelect: true,
    // variableWidth: true,D
    centerPadding: '0px',
    slidesToShow: slides.length,
  });

  useEffect(() => {
    carouselLarge.onTogo(product.images.findIndex((img) => img.main));
  }, [])

  useEffect(() => {
    carouselLarge.onSetNav();
    carouselThumb.onSetNav();
  }, [carouselLarge, carouselThumb]);

  useEffect(() => {
    if (lightbox.open) {
      carouselLarge.onTogo(lightbox.selected);
    }
  }, [carouselLarge, lightbox.open, lightbox.selected]);

  const renderLargeImg = (
    <Box
      sx={{
        mb: 3,
        borderRadius: 2,
        overflow: 'hidden',
        position: 'relative',
        width: {
          md: 680,
          xs: 1
        },
        textAlign: 'left'
      }}
    >
      <CarouselArrowsCustom
        filled
        icon="icon-park-outline:right"
        onNext={carouselThumb.onNext}
        onPrev={carouselThumb.onPrev}
        leftButtonBoxProps={{
          sx: {
            width: '80px',
            height: 1,
            left: -20,
            position: 'absolute',
            zIndex: 100,
          }
        }}
        leftButtonProps={{
          sx: {
            border: '1px solid #D1D1D1',
            borderRadius: '26px',
            width: 'fit-content',
            '&:hover': {
              backgroundColor: '#fff'
            },
            backgroundColor: "#fff",
            right: 0,
            ml: 1,
          }
        }}
        rightButtonBoxProps={{
          sx: {
            width: '80px',
            height: 1,
            position: 'absolute',
            right: 20,
            zIndex: 100
          }
        }}
        rightButtonProps={{
          sx: {
            border: '1px solid #D1D1D1',
            borderRadius: '26px',
            width: 'fit-content',
            backgroundColor: "#fff",
            '&:hover': {
              backgroundColor: '#fff'
            },
            mr: 1
          }
        }}
      >
        <Carousel
          {...carouselLarge.carouselSettings}
          asNavFor={carouselThumb.nav}
          ref={carouselLarge.carouselRef}
        >
          {slides.map((slide) => (
            <Image
              key={slide.src}
              alt={slide.src}
              src={slide.src}
              // ratio="1/1"
              onClick={() => lightbox.onOpen(slide.src)}
              sx={{
                cursor: 'zoom-in',
                border: '1px solid #E0E0E0',
                borderRadius: '18px',
                width: 1
              }}
            />
          ))}
        </Carousel>
      </CarouselArrowsCustom>
    </Box>
  );

  const renderThumbnails = (
    <StyledThumbnailsContainer length={slides.length}>
      <Carousel
        {...carouselThumb.carouselSettings}
        asNavFor={carouselLarge.nav}
        ref={carouselThumb.carouselRef}
      >
        {slides.map((item, index) => (
          <Box key={item.src} sx={{ px: 0.5 }}>
            <Avatar
              key={item.src}
              alt={item.src}
              src={item.src}
              variant="rounded"
              onClick={() => carouselLarge.onTogo(index)}
              sx={{
                width: '100%',
                height: '100%',
                mx: 'auto',
                opacity: 0.48,
                cursor: 'pointer',
                ...(carouselLarge.currentIndex === index && {
                  opacity: 1,
                  border: `solid 2.5px #000`,
                }),
              }}
            />
          </Box>
        ))}
      </Carousel>
    </StyledThumbnailsContainer>
  );

  return (
    <Box
      sx={{
        '& .slick-slide': {
          float: theme.direction === 'rtl' ? 'right' : 'left',
        },
      }}
    >
      <Box
        sx={{
          width: {
            md: 680,
            xs: 1
          },
        }}
      >
        {renderLargeImg}

        {renderThumbnails}
      </Box>


      <Lightbox
        index={lightbox.selected}
        slides={slides}
        open={lightbox.open}
        close={lightbox.onClose}
        onGetCurrentIndex={(index) => lightbox.setSelected(index)}
      />
    </Box>
  );
}
