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
import { Avatar, FormControl, FormControlLabel, Radio, RadioGroup } from '@mui/material';
import { LoadingButton } from '@mui/lab';

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

  const {
    id,
    name,
    sizes,
    price,
    coverUrl,
    colors,
    newLabel,
    available,
    priceSale,
    saleLabel,
    totalRatings,
    totalReviews,
    inventoryType,
    subDescription,
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
    colors: colors[0],
    size: sizes[4],
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
      if (!existProduct) {
        // onAddCart?.({
        //   ...data,
        //   colors: [values.colors],
        //   subTotal: data.price * data.quantity,
        // });
      }
      onGotoStep?.(0);
      router.push(paths.product.checkout);
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

      {"        " + 144444 + "    "}
      ریال
    </Box>
  );

  const renderShare = (
    <Stack direction="row" spacing={3} justifyContent="center">
      <Link
        variant="subtitle2"
        sx={{
          color: 'text.secondary',
          display: 'inline-flex',
          alignItems: 'center',
        }}
      >
        <Iconify icon="mingcute:add-line" width={16} sx={{ mr: 1 }} />
        Compare
      </Link>

      <Link
        variant="subtitle2"
        sx={{
          color: 'text.secondary',
          display: 'inline-flex',
          alignItems: 'center',
        }}
      >
        <Iconify icon="solar:heart-bold" width={16} sx={{ mr: 1 }} />
        Favorite
      </Link>

      <Link
        variant="subtitle2"
        sx={{
          color: 'text.secondary',
          display: 'inline-flex',
          alignItems: 'center',
        }}
      >
        <Iconify icon="solar:share-bold" width={16} sx={{ mr: 1 }} />
        Share
      </Link>
    </Stack>
  );

  const renderColorOptions = (
    <Stack direction="row">
      <Typography variant="subtitle2" sx={{ flexGrow: 1 }}>
        Color
      </Typography>

      <Controller
        name="colors"
        control={control}
        render={({ field }) => (
          <ColorPicker
            colors={colors}
            selected={field.value}
            onSelectColor={(color) => field.onChange(color as string)}
            limit={4}
          />
        )}
      />
    </Stack>
  );

  const renderSizeOptions = (
    <Stack direction="row">
      <Typography variant="subtitle2" sx={{ flexGrow: 1 }}>
        Size
      </Typography>

      <RHFSelect
        name="size"
        size="small"
        helperText={
          <Link underline="always" color="textPrimary">
            Size Chart
          </Link>
        }
        sx={{
          maxWidth: 88,
          [`& .${formHelperTextClasses.root}`]: {
            mx: 0,
            mt: 1,
            textAlign: 'right',
          },
        }}
      >
        {sizes.map((size) => (
          <MenuItem key={size} value={size}>
            {size}
          </MenuItem>
        ))}
      </RHFSelect>
    </Stack>
  );

  const renderQuantityy = (
    <Stack direction="row">
      <Typography variant="subtitle2" sx={{ flexGrow: 1 }}>
        Quantity
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

        <Typography variant="caption" component="div" sx={{ textAlign: 'right' }}>
          Available: {available}
        </Typography>
      </Stack>
    </Stack>
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

  const renderActionss = (
    <Stack direction="row" spacing={2}>
      <Button
        fullWidth
        disabled={isMaxQuantity || disabledActions}
        size="large"
        color="warning"
        variant="contained"
        startIcon={<Iconify icon="solar:cart-plus-bold" width={24} />}
        onClick={handleAddCart}
        sx={{ whiteSpace: 'nowrap' }}
      >
        Add to Cart
      </Button>

      <Button fullWidth size="large" type="submit" variant="contained" disabled={disabledActions}>
        Buy Now
      </Button>
    </Stack>
  );

  const renderSubDescription = (
    <Box sx={{ width: 1, mt: 2 }}>
      <Typography variant="body1" sx={{ pb: 2 }} fontFamily={'peyda-bold'} borderBottom={'1px solid #D1D1D1'}>
        قرنیز لب گرد، ابعاد 300*100*100، روکش خام
      </Typography>
    </Box>
  );

  const renderRating = (
    <Stack
      direction="row"
      alignItems="center"
      sx={{
        color: 'text.disabled',
        typography: 'body2',
      }}
    >
      <Rating size="small" value={totalRatings} precision={0.1} readOnly sx={{ mr: 1 }} />
      {`(${fShortenNumber(totalReviews)} reviews)`}
    </Stack>
  );

  const renderLabels = (newLabel.enabled || saleLabel.enabled) && (
    <Stack direction="row" alignItems="center" spacing={1}>
      {newLabel.enabled && <Label color="info">{newLabel.content}</Label>}
      {saleLabel.enabled && <Label color="error">{saleLabel.content}</Label>}
    </Stack>
  );

  const renderInventoryType = (
    <Box
      component="span"
      sx={{
        typography: 'overline',
        color:
          (inventoryType === 'out of stock' && 'error.main') ||
          (inventoryType === 'low stock' && 'warning.main') ||
          'success.main',
      }}
    >
      {inventoryType}
    </Box>
  );

  const renderDimensions = (
    <Box>
      <Typography variant="subtitle1" fontFamily={'peyda-bold'}
        sx={{
          pb: 1, width: 1
        }}>ابعاد</Typography>

      <FormControl component="fieldset" sx={{ width: 1 }}>
        <RadioGroup row defaultValue="top">
          <FormControlLabel
            value={''}
            label={' ۲۰۰ * ۲۰۰ * ۲۰۰ میلی متر'}
            labelPlacement={'end'}
            control={<Radio size="medium" />}
            sx={{ textTransform: 'capitalize' }}
          />
        </RadioGroup>
      </FormControl>

      <FormControl component="fieldset" sx={{ width: 1 }}>
        <RadioGroup row defaultValue="top">
          <FormControlLabel
            value={''}
            label={' ۲۰۰ * ۲۰۰ * ۲۰۰ میلی متر'}
            labelPlacement={'end'}
            control={<Radio size="medium" />}
            sx={{ textTransform: 'capitalize' }}
          />
        </RadioGroup>
      </FormControl>

      <FormControl component="fieldset" sx={{ width: 1 }}>
        <RadioGroup row defaultValue="top">
          <FormControlLabel
            value={''}
            label={' ۲۰۰ * ۲۰۰ * ۲۰۰ میلی متر'}
            labelPlacement={'end'}
            control={<Radio size="medium" />}
            sx={{ textTransform: 'capitalize' }}
          />
        </RadioGroup>
      </FormControl>


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
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <Stack spacing={3}
        // sx={{ pt: 3 }} 
        {...other}>
        <Stack spacing={2} alignItems="flex-start">
          {/* {renderLabels} */}

          {/* {renderInventoryType} */}

          <Typography variant="h4" borderBottom={'1px solid #D1D1D1'} sx={{
            pb: 2, width: 1
          }}>{'قرنیز لب گرد' || name}</Typography>

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
  );
}
