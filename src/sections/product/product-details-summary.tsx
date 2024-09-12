import { useEffect, useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import FormProvider, { RHFRadioGroup, RHFRadioGroupWithImage } from 'src/components/hook-form';

import { IProductItem, ProductOrderType } from 'src/types/product';
import { ICheckoutItem, ICheckoutItemPropertyPrice, ICheckoutNewItem } from 'src/types/checkout';

import IncrementerButton from './common/incrementer-button';
import { IconButton } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import CartDialog from 'src/components/cart/cart-dialog';
import { useBoolean } from 'src/hooks/use-boolean';
import SvgColor from 'src/components/svg-color';
import ProductDetailsPrice from './product-details-price';
import { endpoints, server_axios } from 'src/utils/axios';
import ProductDetailsDescription from './product-details-description';
import { AssembleDialog } from '../assemble/assemble-dialog';
import { useSnackbar } from 'src/components/snackbar';
import { useCheckoutContext } from '../checkout/context';

// ----------------------------------------------------------------------

type Props = {
  product: IProductItem;
  items?: ICheckoutItem[];
  disabledActions?: boolean;
  onGotoStep?: (step: number) => void;
  onAddCart?: (cartItem: Partial<ICheckoutNewItem>) => void;
};

export default function ProductDetailsSummary({
  items,
  product,
  onAddCart,
  onGotoStep,
  disabledActions,
  ...other
}: Props) {
  const checkout = useCheckoutContext();

  const cartDialog = useBoolean();
  const assmbleDialog = useBoolean();

  const { enqueueSnackbar } = useSnackbar();

  const {
    id,
    name,
    price,
    product_dimension,
    order_form_options,
    coverUrl,
    order_type,
    is_user_favorite
  } = product;

  const [isFavorite, setFavorite] = useState<boolean>(is_user_favorite);

  const existProduct = !!items?.length && items.map((item) => item.id).includes(id);

  // const isMaxQuantity =
  //   !!items?.length &&
  //   items.filter((item) => item.id === id).map((item) => item.quantity)[0] >= available;

  const defaultValues = {
    id,
    name,
    coverUrl,
    price,
    order_type,
    dimension_id: 0,
    cover_type_id: 0,
    quantity: 1,
    need_to_assemble: false
  };

  const methods = useForm<ICheckoutItem | any>({
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

      if (product.order_type === ProductOrderType.custom_made) {
        cartDialog.onTrue();
      } else {
        handleAddCartReadyProduct();
      }
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

  const handleAddCartReadyProduct = useCallback(async () => {
    try {
      const dimension = product.product_dimension.find((dimention) => dimention.id == values.dimension_id)
      const cover_type = product.order_form_options?.cover_type.find((cover_type) => cover_type.id == values.cover_type_id)

      await server_axios.post(endpoints.cart.add, {
        product_id: values.id,
        product_property: [
          {
            quantity: values.quantity,
            dimension: dimension,
            cover_type
          }
        ]
      })

      checkout.onGetCart();

      return

      if (product.order_type !== ProductOrderType.ready_to_use) return

      onAddCart?.({
        ...values,
        coverUrl: endpoints.image.url(product.images.find((item) => item.main)?.name || ''),
        order_form_id: product.order_form_options.id,
        properties: [
          {
            quantity: values.quantity,
            dimension: dimension,
            cover_type
          }
        ],
        subTotal: values.price * values.quantity,
      });
    } catch (error) {
      console.error(error);
    }
  }, [onAddCart, values, product]);

  const handleAddCartCustomMadeProduct = useCallback(async (data: ICheckoutItemPropertyPrice[]) => {
    try {

      await server_axios.post(endpoints.cart.add, {
        product_id: values.id,
        product_property: data
      })

      checkout.onGetCart();

      assmbleDialog.onTrue();
    } catch (error) {
      console.error(error);
    }
  }, [onAddCart, values, product]);

  const updateAssemble = useCallback(async (is_need: boolean) => {
    setValue('need_to_assemble', is_need);
    await server_axios.patch(endpoints.cart.update_product_assemble(values.id), {
      need_to_assemble: is_need
    })
    cartDialog.onFalse();
  }, [setValue, values, onAddCart, product]);

  const updatePrice = useCallback((price: number) => {
    setValue('price', price);
  }, [setValue]);

  const handleAddToFavorites = useCallback(async () => {
    await server_axios.post(endpoints.favorite.create, {
      product: { id: product.id },
    })
    setFavorite(true);
    enqueueSnackbar("محصول به علاقه مندی های شما اضافه شد", {
      variant: 'info'
    })
  }, [product]);

  const handleRemoveToFavorites = useCallback(async () => {
    await server_axios.delete(endpoints.favorite.delete(product.id))
    setFavorite(false);
    enqueueSnackbar("محصول از علاقه مندی های شما حذف شد", {
      variant: 'error'
    });
  }, [product]);

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
      type={"submit"}
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

  const renderDimensions = (!!product_dimension.length) && (
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
            label: dimension.width + '*' + dimension.height + '*' + dimension.length + '\n' + 'سانتی متر',
            value: dimension.id
          };
        })}
      />
    </Box>
  )

  const renderCovertype = (!!order_form_options?.cover_type.length) && (
    <Box sx={{ width: 1 }}>
      <Typography variant="subtitle2" fontFamily={'peyda-bold'} sx={{
        width: 1, pb: 1
      }}>
        نوع پوشش
      </Typography>

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
      </Stack>
    </Box>
  )

  return (
    <>
      <AssembleDialog
        dialog={assmbleDialog}
        onUpdateAssemble={updateAssemble}
      />

      <CartDialog
        dialog={cartDialog}
        order_form_id={product.order_form_options.id}
        product_name={product.name}
        onAddCart={handleAddCartCustomMadeProduct}
      />

      <FormProvider methods={methods} onSubmit={onSubmit}>
        <Stack spacing={3} {...other}>
          <Stack spacing={2} alignItems="flex-start">
            {/* {renderLabels} */}

            {/* {renderInventoryType} */}

            <Stack direction={'row'} borderBottom={'1px solid #D1D1D1'} sx={{ pb: 2, width: 1 }} spacing={1.5}>
              <IconButton
                size='small'
                sx={{
                  bgcolor: "#D1D1D1", height: 28, width: 28, borderRadius: 10, mt: 0.5, '&:hover': { backgroundColor: "#E0E0E0" }
                }}
                onClick={isFavorite ? handleRemoveToFavorites : handleAddToFavorites}
              >
                {isFavorite ?
                  <SvgColor src="/assets/icons/product/saved-icon-products.svg" color={"#000"} sx={{ width: 20, height: 20 }} />
                  :
                  <SvgColor src="/assets/icons/product/save-icon-products.svg" color={"#fff"} sx={{ width: 20, height: 20 }} />
                }
                {/*  */}
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
                  properties={product.property_prices}
                  quantity={values.quantity || 1}
                  updatePrice={updatePrice}
                />

              </>
              :
              <>
                <ProductDetailsDescription description={product.description} attributes={product.attributes} />
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
