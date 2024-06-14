import { useEffect, useCallback } from 'react';
import { useForm, Controller } from 'react-hook-form';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Rating from '@mui/material/Rating';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import { formHelperTextClasses } from '@mui/material/FormHelperText';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { fCurrency, fShortenNumber } from 'src/utils/format-number';

import Label from 'src/components/label';
import Iconify from 'src/components/iconify';
import { ColorPicker } from 'src/components/color-utils';
import FormProvider, { RHFRadioGroup, RHFRadioGroupWithImage, RHFSelect } from 'src/components/hook-form';

import { IProductItem, ProductOrderType } from 'src/types/product';
import { ICheckoutAddCustomMadeProductData, ICheckoutItem } from 'src/types/checkout';

import IncrementerButton from './common/incrementer-button';
import { Avatar, FormControl, FormControlLabel, IconButton, Radio, RadioGroup } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import CartDialog from 'src/components/cart/cart-dialog';
import { useBoolean } from 'src/hooks/use-boolean';
import SvgColor from 'src/components/svg-color';
import ProductDetailsPrice from './product-details-price';
import { endpoints } from 'src/utils/axios';
import ProductDetailsDescription from './product-details-description';

// ----------------------------------------------------------------------

type Props = {
  product: IProductItem;
  items?: ICheckoutItem[];
  disabledActions?: boolean;
  onGotoStep?: (step: number) => void;
  onAddCart?: (cartItem: ICheckoutItem) => void;
};

export default function ProductDetailsSummary({
  items,
  product,
  onAddCart,
  onGotoStep,
  disabledActions,
  ...other
}: Props) {
  const router = useRouter();
  const cartDialog = useBoolean();

  const {
    id,
    name,
    price,
    product_dimension,
    order_form_options,
    coverUrl,
    available,
  } = product;

  const existProduct = !!items?.length && items.map((item) => item.id).includes(id);

  // const isMaxQuantity =
  //   !!items?.length &&
  //   items.filter((item) => item.id === id).map((item) => item.quantity)[0] >= available;

  const defaultValues = {
    id,
    name,
    coverUrl,
    available,
    price,
    dimension_id: (product.property_prices?.length) ? product?.property_prices[0]?.dimension.id : 0,
    cover_type_id: (product.property_prices?.length) ? product?.property_prices[0]?.cover_type.id : 0,
    // colors: colors[0],
    // size: sizes[4],
    quantity: 1,
  };

  const methods = useForm<any>({
    defaultValues,
  });

  const { reset, watch, control, setValue, handleSubmit } = methods;

  const values = watch();

  useEffect(() => {
    if (product) {
      reset(defaultValues);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product]);

  const onSubmit = handleSubmit(async (data) => {
    try {
      cartDialog.onTrue()
      if (!existProduct) {
        // onAddCart?.({
        //   ...data,
        //   colors: [values.colors],
        //   subTotal: data.price * data.quantity,
        // });
      }
      // onGotoStep?.(0);
      // router.push(paths.product.checkout);
    } catch (error) {
      console.error(error);
    }
  });

  const handleAddCartReadyProduct = useCallback(() => {
    try {
      if (product.order_type !== ProductOrderType.ready_to_use) return
      // console.log(values)
      const dimention = product.product_dimension.find((dimention) => dimention.id == values.dimension_id)
      const cover_type = product.order_form_options?.cover_type.find((cover_type) => cover_type.id == values.cover_type_id)
      // return
      onAddCart?.({
        ...values,
        coverUrl: endpoints.image.url(product.images.find((item) => item.main)?.name || ''),
        property_prices: {
          quantity: values.quantity,
          dimention: (dimention) ? dimention.width + "*" + dimention.height + "*" + dimention.length : '',
          cover_type
        },
        subTotal: values.price * values.quantity,
      });
    } catch (error) {
      console.error(error);
    }
  }, [onAddCart, values, product]);

  const handleAddCartCustomMadeProduct = useCallback((data: ICheckoutAddCustomMadeProductData) => {
    try {
      if (product.order_type === ProductOrderType.ready_to_use) return

      console.log(data)

      const dimention = product.product_dimension.find((dimention) => dimention.id == values.dimension_id)
      const cover_type = product.order_form_options?.cover_type.find((cover_type) => cover_type.id == values.cover_type_id)

      onAddCart?.({
        ...values,
        coverUrl: endpoints.image.url(product.images.find((item) => item.main)?.name || ''),
        property_prices: {
          quantity: data.quantity,
          dimention: data.dimention,
          cover_type: {
            name: data.cover_type
          }
        },
        subTotal: values.price * data.quantity,
      });

    } catch (error) {
      console.error(error);
    }
  }, [onAddCart, values, product]);

  const updatePrice = useCallback((price: number) => {
    setValue('price', price);
  }, [setValue]);

  const renderActions = (
    <LoadingButton
      sx={{
        borderRadius: '24px',
        fontFamily: 'peyda-bold',
        mt: 4
      }}
      fullWidth
      color="inherit"
      size="large"
      onClick={() => handleAddCartReadyProduct()}
      type={(product.order_type === ProductOrderType.custom_made) ? "submit" : "button"}
      variant="contained"
    >
      {(product.order_type !== ProductOrderType.custom_made) ? "افزودن به سبد خرید" : "ثبت سفارش"}
    </LoadingButton>
  );

  const renderSubDescription = (
    <Box sx={{ width: 1, mt: 2 }}>
      <Typography variant="body1" sx={{ pb: 2 }} fontFamily={'peyda-bold'} borderBottom={'1px solid #D1D1D1'}>
        قرنیز لب گرد، ابعاد 300*100*100، روکش خام
      </Typography>
    </Box>
  );

  const renderDimensions = (
    <Box>
      <Typography variant="subtitle1" fontFamily={'peyda-bold'}
        sx={{
          pb: 1, width: 1
        }}>
        ابعاد
      </Typography>

      <RHFRadioGroup
        name="dimension_id"
        options={product_dimension.map((dimension, index: number) => {
          return {
            label: dimension.width + '*' + dimension.height + '*' + dimension.length + '\n' + 'میلی متر',
            value: dimension.id
          };
        })}
      />
    </Box>
  )

  const renderCovertype = order_form_options?.cover_type.length && (
    <Box sx={{ width: 1 }}>
      <Typography variant="subtitle2" fontFamily={'peyda-bold'} sx={{
        width: 1, pb: 1
      }}>
        نوع پوشش
      </Typography>
      {/* <Stack direction={'row'} spacing={2}> */}

      <RHFRadioGroupWithImage
        name="cover_type_id"
        row
        sx={{ width: 1 }}
        options={order_form_options.cover_type.map((cover_type, index: number) => {
          return {
            label: cover_type.name,
            src: endpoints.cover_type.get_image(cover_type.icon_image_name),
            value: cover_type.id
          };
        })}
      />

      {/* <FormControl component="fieldset">
          <RadioGroup row defaultValue="top">
            <FormControlLabel
              value={true}
              label={'روکش خام'}
              labelPlacement={'end'}
              control={
                <>
                  <Radio size="medium" checked={true} />
                  <Avatar sx={{ mr: 1 }} />
                </>
              }
              sx={{ textTransform: 'capitalize' }}
            />
          </RadioGroup>
        </FormControl>

        <FormControl component="fieldset">
          <RadioGroup row defaultValue="top">
            <FormControlLabel
              value={true}
              label={'روکش خام'}
              labelPlacement={'end'}
              control={
                <>
                  <Radio size="medium" />
                  <Avatar sx={{ mr: 1 }} />
                </>
              }
              sx={{ textTransform: 'capitalize' }}
            />
          </RadioGroup>
        </FormControl> */}
      {/* </Stack> */}
    </Box>
  )

  const renderQuantity = (
    <Box sx={{ width: 1 }}>
      <Typography variant="subtitle2" fontFamily={'peyda-bold'} sx={{
        width: 1, pb: 1
      }}>
        تعداد
      </Typography>

      <Stack spacing={1}>
        <IncrementerButton
          name="quantity"
          quantity={values.quantity || 1}
          // quantity={values.quantity}
          // disabledDecrease={values.quantity <= 1}
          // disabledIncrease={values.quantity >= available}
          // onIncrease={() => { }}
          // onDecrease={() => { }}
          onDecrease={() => setValue('quantity', values.quantity ? values.quantity + 1 : 1)}
          onIncrease={() => {
            if (values.quantity != 1)
              setValue('quantity', values.quantity ? values.quantity - 1 : 1)
          }}
        />

        {/* <Typography variant="caption" component="div" sx={{ textAlign: 'right' }}>
          Available: {available}
        </Typography> */}
      </Stack>
    </Box>
  )

  return (
    <>
      <CartDialog
        dialog={cartDialog}
        order_form_id={product.order_form_options.id}
        product_name={product.name}
        onAddCart={() => handleAddCartCustomMadeProduct}
      />
      <FormProvider methods={methods} onSubmit={onSubmit}>
        <Stack spacing={3} {...other}>
          <Stack spacing={2} alignItems="flex-start">
            {/* {renderLabels} */}

            {/* {renderInventoryType} */}

            <Stack direction={'row'} borderBottom={'1px solid #D1D1D1'} sx={{ pb: 2, width: 1 }} spacing={1.5}>
              <IconButton size='small' sx={{ bgcolor: "#D1D1D1", height: 28, width: 28, borderRadius: 10, mt: 0.5 }}>
                <SvgColor src="/assets/icons/product/save-icon-products.svg" color={"#fff"} sx={{ width: 20, height: 20 }} />
              </IconButton>
              <Typography variant="h4" fontFamily={'peyda-bold'}>
                {name}
              </Typography>
            </Stack>


            {product.order_type === ProductOrderType.ready_to_use ?
              <>
                {renderDimensions}
                {/* {renderRating} */}

                {renderCovertype}

                {renderQuantity}

                {renderSubDescription}

                <ProductDetailsPrice
                  price={product.price}
                  dimention_id={values.dimension_id || 0}
                  cover_type_id={values.cover_type_id || 0}
                  property_values={product.property_prices}
                  quantity={values.quantity || 1}
                  updatePrice={updatePrice}
                />

              </>
              :
              <>
                <ProductDetailsDescription />
                <Box mt={4} />
              </>

            }

            {renderActions}

          </Stack>

          {/* {renderColorOptions}

        {renderSizeOptions}

        {renderQuantityy}

        <Divider sx={{ borderStyle: 'dashed' }} />

        {renderActions}

        {renderShare} */}
        </Stack>
      </FormProvider>
    </>
  );
}
