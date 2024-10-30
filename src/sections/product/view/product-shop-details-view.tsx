'use client';

import { useState, useCallback } from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import { useGetProduct } from 'src/api/product';

import Iconify from 'src/components/iconify';
import EmptyContent from 'src/components/empty-content';
import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

import { useCheckoutContext } from '../../checkout/context';
import { ProductDetailsSkeleton } from '../product-skeleton';
import ProductDetailsSummary from '../product-details-summary';
import ProductDetailsCarousel from '../product-details-carousel';
import ProductDetailsDescription from '../product-details-description';
import CarouselProducts from 'src/sections/_examples/extra/carousel-view/carousel-products';
import { _carouselsExample } from 'src/sections/_examples/extra/carousel-view';
import { ProductOrderType } from 'src/types/product';

// ----------------------------------------------------------------------

const SUMMARY = [
  {
    title: '100% Original',
    description: 'Chocolate bar candy canes ice cream toffee cookie halvah.',
    icon: 'solar:verified-check-bold',
  },
  {
    title: '10 Day Replacement',
    description: 'Marshmallow biscuit donut dragée fruitcake wafer.',
    icon: 'solar:clock-circle-bold',
  },
  {
    title: 'Year Warranty',
    description: 'Cotton candy gingerbread cake I love sugar sweet.',
    icon: 'solar:shield-check-bold',
  },
];

// ----------------------------------------------------------------------

type Props = {
  id: string;
};

export default function ProductShopDetailsView({ id }: Props) {
  const settings = useSettingsContext();

  const checkout = useCheckoutContext();

  // checkout.onReset();

  const [currentTab, setCurrentTab] = useState('description');

  const { product, productLoading, productError } = useGetProduct(id);

  const handleChangeTab = useCallback((event: React.SyntheticEvent, newValue: string) => {
    setCurrentTab(newValue);
  }, []);

  const renderSkeleton = <ProductDetailsSkeleton />;

  const renderError = (
    <EmptyContent
      filled
      title={`${productError?.message}`}
      action={
        <Button
          component={RouterLink}
          href={paths.product.root}
          startIcon={<Iconify icon="eva:arrow-ios-back-fill" width={16} />}
          sx={{ mt: 3 }}
        >
          Back to List
        </Button>
      }
      sx={{ py: 10 }}
    />
  );

  const renderProduct = product && (
    <Box width={1}>

      <Grid
        container
        spacing={{
          xs: 3,
        }}
        // alignContent={'space-between'}
        // justifyContent={'space-between'}
        sx={{ mb: 5 }}
        direction={{
          lg: 'row',
          md: 'column-reverse',
          sm: 'column-reverse',
          xs: 'column-reverse'
        }}
      >
        <Grid xs={12} sm={12} md={12} lg={5} item>
          <ProductDetailsSummary
            product={product}
            items={checkout.items}
            onGotoStep={checkout.onGotoStep}
          />
        </Grid>

        <Grid xs={12} sm={12} md={12} lg={7} sx={{ direction: 'rtl' }} item>
          <ProductDetailsCarousel product={product} />

          {product.order_type === ProductOrderType.ready_to_use ?
            <ProductDetailsDescription description={product.description} attributes={product.attributes} />
            : null}

        </Grid>
      </Grid>

      <Box sx={{ borderTop: '1px solid #D1D1D1', pt: 5, mb: 5 }}>
        <CarouselProducts data={_carouselsExample.slice(0, 8)} label='!پرفروش ها' />
      </Box>
      <Box sx={{ borderTop: '1px solid #D1D1D1', pt: 5 }}>
        <CarouselProducts data={_carouselsExample.slice(0, 8)} />
      </Box>

      {/* <Card>
        <Tabs
          value={currentTab}
          onChange={handleChangeTab}
          sx={{
            px: 3,
            boxShadow: (theme) => `inset 0 -2px 0 0 ${alpha(theme.palette.grey[500], 0.08)}`,
          }}
        >
          {[
            {
              value: 'description',
              label: 'Description',
            },
            {
              value: 'reviews',
              label: `Reviews (${product.reviews.length})`,
            },
          ].map((tab) => (
            <Tab key={tab.value} value={tab.value} label={tab.label} />
          ))}
        </Tabs>

        {currentTab === 'description' && (
          <ProductDetailsDescription description={product?.description} />
        )}

        {currentTab === 'reviews' && (
          <ProductDetailsReview
            ratings={product.ratings}
            reviews={product.reviews}
            totalRatings={product.totalRatings}
            totalReviews={product.totalReviews}
          />
        )}
      </Card> */}
    </Box>
  );

  return (
    <Box sx={{ mt: 5 }}>
      {/* <CartIcon totalItems={checkout.totalItems} /> */}

      {productLoading && renderSkeleton}

      {productError && renderError}

      {product && renderProduct}
    </Box>
  );
}
