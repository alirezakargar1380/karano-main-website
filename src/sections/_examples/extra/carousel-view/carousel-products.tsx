import { useCarousel, CarouselDots } from 'src/components/carousel';
import ProductItemSlider from 'src/sections/product/product-slider-item';
import { Box } from '@mui/system';
import { CarouselComponent } from './carousel-home-category';
import { IProductItem } from 'src/types/product';

// ----------------------------------------------------------------------

type Props = {
  label?: string;
  data: IProductItem[];
};

export default function CarouselProducts({ data, label = '!پرفروش ها' }: Props) {

  return (
    <Box sx={{ position: 'relative' }}>
      <CarouselComponent length={data.length} dots label={label}>
        {data.map((item, index) => (
          <Box key={index} sx={{ mt: 10, px: '8px', direction: 'ltr' }}>
            <ProductItemSlider
              product={item}
            />
          </Box>
        ))}
      </CarouselComponent>
      {/* <CarouselArrowsCustom
        filled
        icon="icon-park-outline:right"
        onNext={carousel.onNext}
        onPrev={carousel.onPrev}
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
      </CarouselArrowsCustom> */}
    </Box>
  );
}
