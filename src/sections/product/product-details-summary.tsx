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
import FormProvider, { RHFSelect } from 'src/components/hook-form';

import { IProductItem } from 'src/types/product';
import { ICheckoutItem } from 'src/types/checkout';

import IncrementerButton from './common/incrementer-button';
import { Avatar, FormControl, FormControlLabel, IconButton, Radio, RadioGroup } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import CartDialog from 'src/components/cart/cart-dialog';
import { useBoolean } from 'src/hooks/use-boolean';
import SvgColor from 'src/components/svg-color';

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
    coverUrl,
    available,
  } = product;

  const existProduct = !!items?.length && items.map((item) => item.id).includes(id);

  const isMaxQuantity =
    !!items?.length &&
    items.filter((item) => item.id === id).map((item) => item.quantity)[0] >= available;

  const defaultValues = {
    id,
    name,
    coverUrl,
    available,
    price,
    // colors: colors[0],
    // size: sizes[4],
    quantity: available < 1 ? 0 : 1,
  };

  const methods = useForm({
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

  const handleAddCart = useCallback(() => {
    try {
      // onAddCart?.({
      //   ...values,
      //   colors: [values.colors],
      //   subTotal: values.price * values.quantity,
      // });
    } catch (error) {
      console.error(error);
    }
  }, [onAddCart, values]);

  const renderPrice = (
    <Box sx={{ typography: 'h5' }}>
      {/* {priceSale && (
        <Box
          component="span"
          sx={{
            color: 'text.disabled',
            textDecoration: 'line-through',
            mr: 0.5,
          }}
        >
          {fCurrency(priceSale)}
        </Box>
      )} */}

      قیمت:

      {"        " + product.price + "    "}
      ریال
    </Box>
  );

  const renderActions = (
    <LoadingButton
      sx={{
        borderRadius: '24px',
        fontFamily: 'peyda-bold',
      }}
      fullWidth
      color="inherit"
      size="large"
      // disabled={true}
      type="submit"
      variant="contained"
    >
      افزودن به سبد خرید
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

      {product_dimension.map((dimension, index: number) => (
        <FormControl component="fieldset" sx={{ width: 1 }} key={index}>
          <RadioGroup row defaultValue="top">
            <FormControlLabel
              value={''}
              label={dimension.width + '*' + dimension.height + '*' + dimension.length + '\n' + 'میلی متر'}
              labelPlacement={'end'}
              control={<Radio size="medium" />}
              sx={{ textTransform: 'capitalize' }}
            />
          </RadioGroup>
        </FormControl>
      ))}
    </Box>
  )

  const renderCovertype = (
    <Box>
      <Typography variant="subtitle2" fontFamily={'peyda-bold'} sx={{
        width: 1, pb: 1
      }}>
        نوع پوشش
      </Typography>
      <Stack direction={'row'} spacing={2}>
        <FormControl component="fieldset">
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
        </FormControl>
      </Stack>
    </Box>
  )

  const renderQuantity = (
    <Box>
      <Typography variant="subtitle2" fontFamily={'peyda-bold'} sx={{
        width: 1, pb: 1
      }}>
        تعداد
      </Typography>

      <Stack spacing={1}>
        <IncrementerButton
          name="quantity"
          quantity={56}
          // quantity={values.quantity}
          // disabledDecrease={values.quantity <= 1}
          // disabledIncrease={values.quantity >= available}
          onIncrease={() => setValue('quantity', 55 + 1)}
          onDecrease={() => setValue('quantity', 55 - 1)}
        />

        {/* <Typography variant="caption" component="div" sx={{ textAlign: 'right' }}>
          Available: {available}
        </Typography> */}
      </Stack>
    </Box>
  )

  return (
    <>
      <CartDialog dialog={cartDialog} />
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


            {renderDimensions}
            {/* {renderRating} */}

            {renderCovertype}

            {renderQuantity}

            {renderSubDescription}

            {renderPrice}

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
