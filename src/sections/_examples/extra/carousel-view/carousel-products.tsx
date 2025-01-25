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

  return (data.length > 0) && (
    <Box sx={{ position: 'relative' }}>
      <CarouselComponent length={data.length} dots label={label} responsive={
            [
              {
                breakpoint: 1366,
                settings: {
                  slidesToShow: 4
                },
              },
              {
                breakpoint: 768,
                settings: { slidesToShow: 2, centerPadding: '20' },
              },
              {
                breakpoint: 500,
                settings: { slidesToShow: 1, centerPadding: '20' },
              },
            ]
          }>
        {data.map((item, index) => (
          <Box key={index} sx={{ mt: 10, px: '8px', direction: 'ltr' }}>
            <ProductItemSlider
              product={item}
            />
          </Box>
        ))}
      </CarouselComponent>
    </Box>
  );
}
