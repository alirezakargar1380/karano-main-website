import { useEffect, useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import FormProvider, { RHFRadioGroup, RHFRadioGroupWithImage } from 'src/components/hook-form';

import { CoatingType, EAlgorithm, IProductItem, ProductOrderType } from 'src/types/product';
import { ICheckoutItem, ICheckoutItemPropertyPrice } from 'src/types/checkout';

import IncrementerButton from './common/incrementer-button';
import { IconButton } from '@mui/material';
import CartDialog from 'src/components/cart/cart-dialog';
import { useBoolean } from 'src/hooks/use-boolean';
import SvgColor from 'src/components/svg-color';
import ProductDetailsPrice from './product-details-price';
import { endpoints, server_axios } from 'src/utils/axios';
import ProductDetailsDescription from './product-details-description';
import { AssembleDialog } from '../assemble/assemble-dialog';
import { useSnackbar } from 'src/components/snackbar';
import { useCheckoutContext } from '../checkout/context';
import { PrimaryButton } from 'src/components/styles/buttons/primary';
import { ProductItemsSummary } from './product-items-summary';
import { useAuthContext } from 'src/auth/hooks';

import { useRouter } from 'src/routes/hooks';
import { useAuthRedirect } from 'src/auth/guard/auth-guard';

// ----------------------------------------------------------------------

type Props = {
  product: IProductItem;
  items?: ICheckoutItem[];
  disabledActions?: boolean;
  onGotoStep?: (step: number) => void;
};

export default function ProductDetailsSummary({
  items,
  product,
  onGotoStep,
  disabledActions,
  ...other
}: Props) {
  const checkout = useCheckoutContext();

  const [disableCoatingType, setDisableCoatingType] = useState<boolean>(false);

  const checkAndRedirect = useAuthRedirect();

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

  const defaultValues = {
    id,
    name,
    coverUrl,
    price,
    order_type,
    dimension_id: 0,
    cover_type_id: 0,
    quantity: 1,
    need_to_assemble: false,
    order_form_options: {
      profile_type: { id: 0 },
      cover_type: { id: 0 },
      coating_type: ''
    }
  };

  const methods = useForm<ICheckoutItem | any>({
    defaultValues,
  });

  const { reset, watch, setValue, handleSubmit } = methods;

  const values = watch();

  useEffect(() => {
    if (product) {
      reset(defaultValues);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product]);

  const onSubmit = handleSubmit(async (data) => {
    try {
      if (!checkAndRedirect()) return

      if (product.order_type === ProductOrderType.custom_made) {
        cartDialog.onTrue();
      } else {
        handleAddCartReadyProduct(data);
      }

      reset(defaultValues);
    } catch (error) {
      console.error(error);
    }
  });

  const handleAddCartReadyProduct = useCallback(async (data: any) => {
    try {
      const dimension = product.product_dimension.find((dimention) => dimention.id == values.dimension_id)
      const cover_type = product.order_form_options?.cover_type.find((cover_type) => cover_type.id == values.cover_type_id)

      await server_axios.post(endpoints.cart.add, {
        product_id: values.id,
        product_property: [
          {
            quantity: values.quantity,
            dimension: dimension,
            cover_type,
            ...data.order_form_options
          }
        ]
      })

      checkout.onGetCart();
    } catch (error) {
      console.error(error);
    }
  }, [values, product]);

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
  }, [values, product]);

  const updateAssemble = useCallback(async (is_need: boolean) => {
    setValue('need_to_assemble', is_need);
    await server_axios.patch(endpoints.cart.update_product_assemble(values.id), {
      need_to_assemble: is_need
    })
    cartDialog.onFalse();
  }, [setValue, values, product]);

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

  useEffect(() => {
    const findCover = order_form_options.cover_type.find((p: any) => p.id == values.order_form_options.cover_type.id);

    console.log(findCover);

    if (findCover?.is_raw) {
      setDisableCoatingType(true);
      setValue('order_form_options.coating_type', CoatingType.none);
    } else {
      setDisableCoatingType(false);
    }
  }, [values.order_form_options.cover_type.id]);

  const renderActions = (
    <PrimaryButton
      fullWidth
      size="medium"
      type={"submit"}
    >
      {(product.order_type !== ProductOrderType.custom_made) ? "افزودن به سبد خرید" : "ثبت سفارش"}
    </PrimaryButton>
  );

  const renderSubDescription = (
    <Box sx={{ width: 1, mt: 2 }}>
      <Typography variant="body1" sx={{ pb: 2 }} fontFamily={'peyda-bold'} borderBottom={'1px solid #D1D1D1'}>
        <ProductItemsSummary values={values} cover_type={product.order_form_options?.cover_type} dimension={product.product_dimension} />
      </Typography>
    </Box>
  );

  const renderDimensions = (!!product_dimension.length) && (
    <Box>
      <Typography variant="subtitle1" fontFamily={'peyda-bold'}
        sx={{
          width: 1, pb: '16px'
        }}>
        ابعاد
      </Typography>

      <RHFRadioGroup
        name="dimension_id"
        row
        sx={{
          width: 1,
          display: 'grid',
          gridTemplateColumns: {
            xs: 'repeat(1, 1fr)',
            md: 'repeat(2, 1fr)',
          },
          gridGap: 18,
        }}
        options={product_dimension.map((dimension, index: number) => {
          return {
            label: dimension.width + '*' + dimension.height + '*' + dimension.length + '\n' + 'سانتی متر',
            value: dimension.id
          };
        })}
      />
    </Box>
  )

  const renderCoatingType = (order_form_options?.coating_type) && (
    <Box sx={{ width: 1 }}>
      <Typography variant="subtitle2" fontFamily={'peyda-bold'} sx={{
        width: 1, pb: '16px'
      }}>
        نوع روکش گیری
      </Typography>
      <RHFRadioGroup
        name='order_form_options.coating_type'
        row
        disabled={disableCoatingType}
        sx={{
          width: 1,
          display: 'grid',
          gridTemplateColumns: {
            xs: 'repeat(1, 1fr)',
            md: 'repeat(2, 1fr)',
          },
        }}
        FormControlSx={{
          width: 1
        }}
        helperText={'روکش‌گیری جناقی به صورت هشتی انجام می‌شود.'}
        options={[
          {
            label: 'جناقی',
            value: 'جناقی'
          },
          {
            label: 'غیر جناقی',
            value: 'غیر جناقی'
          }
        ]}
      />
    </Box>
  )

  const renderProfiles = (!!order_form_options?.profile_type.length) && (
    <Box sx={{ width: 1 }}>
      <Typography variant="subtitle2" fontFamily={'peyda-bold'} sx={{
        width: 1, pb: '16px'
      }}>
        نوع پروفیل
      </Typography>

      <RHFRadioGroup
        name='order_form_options.profile_type.id'
        row
        sx={{
          width: 1,
          display: 'grid',
          gridTemplateColumns: {
            xs: 'repeat(1, 1fr)',
            md: 'repeat(2, 1fr)',
          },
        }}
        FormControlSx={{
          width: 1
        }}
        options={order_form_options.profile_type.map((profile_type) => {
          return {
            label: profile_type.name,
            value: profile_type.id,
          }
        })}
      />
    </Box>
  )

  const renderCovertype = (!!order_form_options?.cover_type.length) && (
    <Box sx={{ width: 1 }}>
      <Typography variant="subtitle2" fontFamily={'peyda-bold'} sx={{
        width: 1, pb: '16px'
      }}>
        نوع پوشش
      </Typography>

      <RHFRadioGroupWithImage
        name="order_form_options.cover_type.id"
        row
        sx={{
          width: 1,
          display: 'grid',
          gridTemplateColumns: {
            xs: 'repeat(1, 1fr)',
            md: 'repeat(2, 1fr)',
          },
          // gridGap: 18,
        }}
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
      <Typography
        variant="body3"
        sx={{
          width: 1, pb: 1
        }}>
        تعداد
      </Typography>

      <Stack spacing={1}>
        <IncrementerButton
          name="quantity"
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
    <Box width={{
      md: 400,
      xs: 1
    }}>
      <AssembleDialog
        dialog={assmbleDialog}
        onUpdateAssemble={updateAssemble}
      />

      <CartDialog
        dialog={cartDialog}
        algorithm={product.algorithm}
        order_form_id={product.order_form_options.id}
        product_name={product.name}
        onAddCart={handleAddCartCustomMadeProduct}
      />

      <FormProvider methods={methods} onSubmit={onSubmit}>
        <Stack spacing={3} {...other}>
          <Stack spacing={'24px'} alignItems="flex-start">
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
              </IconButton>
              <Typography variant="h4" fontFamily={'peyda-bold'}>
                {name}
              </Typography>
            </Stack>


            {product.order_type === ProductOrderType.ready_to_use ?
              <>
                {renderDimensions}
                {/* {renderRating} */}

                {renderProfiles}

                {renderCovertype}

                {renderCoatingType}

                {renderQuantity}

                {renderSubDescription}

                <ProductDetailsPrice
                  price={product.price}
                  values={values.order_form_options}
                  dimention_id={values.dimension_id || 0}
                  cover_type_id={values.cover_type_id || 0}
                  properties={product.property_prices}
                  quantity={values.quantity || 1}
                  updatePrice={updatePrice}
                  product_code={product.code}
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
        </Stack>
      </FormProvider>
    </Box>
  );
}
