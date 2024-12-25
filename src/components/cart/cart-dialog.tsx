import { useState, useEffect, useCallback } from 'react';
import * as Yup from 'yup';

import DialogContent from '@mui/material/DialogContent';
import Dialog from '@mui/material/Dialog';

import { useBoolean, useBooleanReturnType } from 'src/hooks/use-boolean';
import { DialogActions, DialogTitle, IconButton, Stack, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import FormProvider from 'src/components/hook-form';
import { CartDialogView } from 'src/sections/cart/view';
import { LoadingButton } from '@mui/lab';
import { SecondaryButton } from 'src/components/styles/buttons/secondary';
import { useGetOrderForm } from 'src/api/order-form';
import { ICheckoutItemPropertyPrice } from 'src/types/checkout';
import { yupResolver } from '@hookform/resolvers/yup';
import { useSnackbar } from 'src/components/snackbar';
import { IOrderProductPropertyStatus } from 'src/types/order-products-property';
import { endpoints, server_axios } from 'src/utils/axios';
import { ConfirmDialog } from '../custom-dialog';
import SvgColor from '../svg-color';
import { useShowOneTime } from 'src/hooks/use-show-one-time';
import { PrimaryButton } from '../styles/buttons/primary';
import { CoatingType, EAlgorithm, EBackToBackDimension, EFrameCore, ProductOrderType } from 'src/types/product';
import { ECoatingTexture, ECoverEdgeTape } from 'src/types/cart';

// ----------------------------------------------------------------------
interface Props {
  dialog: useBooleanReturnType;
  order_form_id: number;
  product_name: string;
  order_type: ProductOrderType;
  algorithm?: EAlgorithm;
  type?: 'cart' | 'edit' | 'view';
  currentData?: ICheckoutItemPropertyPrice | undefined;
  listId?: number | undefined;
  listData?: ICheckoutItemPropertyPrice[] | undefined;
  onAddCart: (data: ICheckoutItemPropertyPrice[]) => void;
  onDelete?: (propertyId: number) => void;
  handleUpdateRow?: (data: ICheckoutItemPropertyPrice[]) => void;
}

export default function CartDialog({
  dialog,
  order_form_id,
  product_name,
  order_type,
  algorithm = EAlgorithm.cabinet_door,
  currentData,
  listId,
  listData,
  onAddCart,
  onDelete,
  handleUpdateRow,
  type = 'cart',
}: Props) {
  const { show, update } = useShowOneTime('edit-product-dialog');

  const infoDialog = useBoolean();

  const [hasRejected, setHasRejected] = useState<boolean>(false);
  const [list, setList] = useState<ICheckoutItemPropertyPrice[]>([]);
  const [index, setId] = useState<null | number>(null);

  // API
  const { form, formLoading, formEmpty } = useGetOrderForm(order_form_id);

  const { enqueueSnackbar } = useSnackbar();

  const getDimensionSchema = (algorithm: EAlgorithm, order_type: ProductOrderType) => {
    if (order_type === ProductOrderType.ready_to_use) {
      return Yup.object().shape({
        length: Yup.number(),
        width: Yup.number(),
      });
    }

    switch (algorithm) {
      case EAlgorithm.cabinet_door:
        return Yup.object().shape({
          length: Yup.number()
            .max(240, 'طول نمیتواند بیشتر از 240 سانتی متر باشد')
            .notOneOf([0], 'طول نمیتواند صفر باشد')
            .required('طول الزامی است')
            .typeError('طول باید عدد باشد'),
          width: Yup.number()
            .required('عرض الزامی است')
            .notOneOf([0], 'عرض نمیتواند صفر باشد')
            .typeError('عرض باید عدد باشد'),
        });
      case EAlgorithm.cabinet_cloumn:
        return Yup.object().shape({
          length: Yup.number()
            .max(280, 'طول نمیتواند بیشتر از 280 سانتی متر باشد')
            .notOneOf([0], 'طول نمیتواند صفر باشد')
            .required('طول الزامی است')
            .typeError('طول باید عدد باشد'),
          width: Yup.number()
            .min(8, 'عرض نمیتواند کمتر از 8 سانتی متر باشد')
            .notOneOf([0], 'عرض نمیتواند صفر باشد')
            .required('عرض الزامی است')
            .typeError('عرض باید عدد باشد'),
        });
      default:
        return Yup.object().shape({
          length: Yup.number().required('طول الزامی است').typeError('طول باید عدد باشد'),
          width: Yup.number().required('عرض الزامی است').typeError('عرض باید عدد باشد'),
        });
    }
  };

  const NewProductSchema = Yup.object().shape({
    profile_type: (algorithm === EAlgorithm.cabinet_door && order_type === ProductOrderType.custom_made) ? Yup.number().notOneOf([0], 'نوع پروفایل الزامی است').required('نوع پروفایل الزامی است') : Yup.number(),
    cover_type: (algorithm === EAlgorithm.cabinet_door && order_type === ProductOrderType.custom_made) ? Yup.number().notOneOf([0], 'نوع پوشش الزامی است').required('نوع پوشش الزامی است') : Yup.number(),
    frame_type: (algorithm === EAlgorithm.cabinet_door && order_type === ProductOrderType.custom_made) ? Yup.number().notOneOf([0], 'نوع قاب الزامی است').required('نوع قاب الزامی است') : Yup.number(),
    quantity: Yup.number().required('تعداد الزامی است').typeError('تعداد باید عدد باشد'),
    dimension: getDimensionSchema(algorithm, order_type),
    inlaid_flower_emty_space: Yup.number()
      .when('inlaid_flower', {
        is: false,
        then: (schema) => schema.notOneOf([0], 'فضای خالی جایگاه گل نمیتواند صفر باشد'),
        otherwise: (schema) => schema
      }),
    frame_width: Yup.string()
      .when('back_to_back_dimension', {
        is: EBackToBackDimension.framework,
        then: (schema) => schema.required('پهنای چهارچوب را انتخاب کنید'),
        otherwise: (schema) => schema
      }),
      frame_core: Yup.string()
      .when('back_to_back_dimension', {
        is: EBackToBackDimension.lame,
        then: (schema) => schema.required('مغز چهارچوب را انتخاب کنید'),
        otherwise: (schema) => schema
      }),
  });

  const defaultValues: any = {
    ...(currentData?.id && {
      id: currentData.id
    }),
    quantity: 1,
    dimension: {
      length: '',
      width: '',
    },
    profile_type: 0,
    cover_type: 0,
    frame_type: 0,
    coating_type: CoatingType.none,
    inlaid_flower_emty_space: 0,
    inlaid_flower: null,
    frame_width: '', // پهنای چارچوب
    back_to_back_dimension: EBackToBackDimension.none,
    frame_core: EFrameCore.none,
    cover_edge_tape: ECoverEdgeTape.none,
    coating_texture: ECoatingTexture.none,
  };

  const methods = useForm({
    resolver: yupResolver(NewProductSchema),
    defaultValues,
  });

  const {
    reset,
    watch,
    control,
    setValue,
    handleSubmit,
    formState: { isSubmitted },
  } = methods;

  const values = watch();

  const onSubmit = handleSubmit(async (data: any) => {
    try {
      const custom = { ...data };
      if (form.profile_type)
        custom.profile_type = form.profile_type.find((item) => item.id === data.profile_type);
      if (form.cover_type)
        custom.cover_type = form.cover_type.find((item) => item.id === data.cover_type);
      if (form.frame_type)
        custom.frame_type = form.frame_type.find((item) => item.id === data.frame_type);

      if (index === null) {
        setList([
          ...list,
          {
            ...custom,
          },
        ]);
      } else {
        let iid = index;
        setId(null); // felan khali bashe

        list[iid] = custom;

        if (handleUpdateRow && type === 'edit')
          list[iid].status = IOrderProductPropertyStatus.edited;

        setList([...list]);

        if (handleUpdateRow)
          await server_axios
            .patch(endpoints.orderProductProperties.update(list[iid].id), {
              ...list[iid],
              is_approved: null,
            })
            .then(({ data }) => { });
      }

      reset();
    } catch (error) {
      console.error(error);
    }
  });

  const customizeData = useCallback(
    (item: ICheckoutItemPropertyPrice) => {
      return {
        ...item,
        cover_type: item?.cover_type?.id || 0,
        profile_type: item?.profile_type?.id || 0,
        frame_type: item?.frame_type?.id || 0,
        // inlaid_flower: item?.inlaid_flower !== null ? (item.inlaid_flower === true) ? '1' : '0' : null,
        dimension: {
          length: item.dimension?.length || 0,
          width: item.dimension?.width || 0,
        },
      };
    },
    [form]
  );

  // show info dialog
  useEffect(() => {
    if ((index || index === 0) && type === 'edit' && !show) {
      infoDialog.onTrue();
      update('1');
    }
  }, [index]);

  useEffect(() => {
    if (listId === undefined || listId === null) return;
    setId(listId);
  }, [listId]);

  useEffect(() => {
    if (index === null) reset(defaultValues);
  }, [index]);

  useEffect(() => {
    if (index === null || !list.length) return;
    const item = list[index];
    reset(customizeData(item));
  }, [index, list]);

  useEffect(() => {
    if (!currentData) return;
    reset(customizeData(currentData));
  }, [currentData]);

  useEffect(() => {
    if (!dialog.value) setList([])
  }, [dialog.value])

  const handleUpdate = useCallback(
    (itemId: number) => {
      setId(itemId);
    },
    [setId]
  );

  const handleAddToList = useCallback(() => {
    if (type === 'edit')
      enqueueSnackbar('اصلاحات کالای مورد نظر با موفقیت ثبت شد.', {
        color: 'info',
        variant: 'myCustomVariant',
      });
      
    if (!list.length)
      return enqueueSnackbar(
        'ابتدا دکمه «افزودن به لیست» و سپس دکمه «افزودن به سبد خرید» را کلیک کنید.',
        {
          variant: 'error',
        }
      );

    if (handleUpdateRow !== undefined) handleUpdateRow(list);
    else {
      onAddCart(list);
      // setList([]);
      reset(defaultValues);
      // dialog.onFalse();
    }
  }, [list, type]);


  const onDeleteRow = (propertyIndex: number) => {
    if (propertyIndex === index)
      return enqueueSnackbar('آیتم انتخاب شده قابل حذف نیست', {
        variant: 'error',
      });

    // remove from list
    let newList = [...list];
    newList.splice(propertyIndex, 1);
    setList(newList);

    // remove from checkout
    // if (pId) checkout.onDeleteCart(pId, propertyIndex);
  };

  useEffect(() => {
    if (!listData?.length) {
      if (!listData?.length && index === null && !list.length) return setList([]);
      return;
    }
    setList(listData);
    const findRjected = listData.find((item) => item.status === IOrderProductPropertyStatus.denied);
    if (findRjected) setHasRejected(true);
  }, [listData, index]);

  return (
    <>
      <ConfirmDialog
        open={infoDialog.value}
        color='#727272'
        title="اصلاح کالا"
        content="شما می‌توانید با اصلاح ویژگی‌های کالا، تغییرات مورد نظر خود را اعمال کنید."
        action={
          <PrimaryButton
            size='medium'
            onClick={infoDialog.onFalse}
            sx={{
              borderRadius: '50px',
              px: 2,
            }}
          >
            متوجه شدم
          </PrimaryButton>
        }
      />
      <Dialog
        open={dialog.value}
        onClose={dialog.onFalse}
        fullWidth={true}
        // maxWidth={'lg'}
        PaperProps={{
          style: {
            margin: 0,
            width: 'calc(100% - 48px)',
            height: 'calc(100% - 48px)',
            maxWidth: 'none',
            maxHeight: 'none',
          },
        }}
      >
        <DialogTitle sx={{ p: 0, px: '40px', pt: '40px', display: 'block' }}>
          <Stack spacing={'24px'} direction={'row'}>
            <Typography
              sx={{ borderBottom: '1px solid #D1D1D1', pb: 1.5, minWidth: '400px' }}
              variant="title1"
            >
              {product_name}
            </Typography>
            <Stack
              direction={'row'}
              width={1}
              borderBottom={'1px solid #D1D1D1'}
              justifyContent={'space-between'}
            >
              <Typography sx={{ pb: 2, fontFamily: 'peyda-bold' }} variant="title2">
                لیست سفارش های ثبت شده
              </Typography>
              <IconButton sx={{ mb: 1 }} onClick={dialog.onFalse}>
                <SvgColor src="/assets/icons/navbar/x-close.svg" sx={{ width: 16, height: 16 }} />
              </IconButton>
            </Stack>
          </Stack>
        </DialogTitle>
        <DialogContent
          sx={{
            overflow: 'hidden',
            px: 0,
            borderBottomRightRadius: '16px',
            borderBottomLeftRadius: '16px',
          }}
        >
          <FormProvider methods={methods} onSubmit={onSubmit}>
            {(!formEmpty && !formLoading) && (
              <CartDialogView
                formOptions={form}
                data={list}
                order_type={order_type}
                listIndex={index}
                values={values}
                algorithm={algorithm}
                type={type}
                setValue={(name: string, value: any) => setValue(name, value)}
                onUpdate={handleUpdate}
                onDelete={onDelete || onDeleteRow}
                infoDialog={infoDialog.value}
              />
            )}
          </FormProvider>
        </DialogContent>
        <DialogActions
          sx={{
            p: '40px',
            width: 1,
            backgroundColor: '#F8F8F8',
            overflow: 'hidden',
            borderBottomRightRadius: '16px',
            borderBottomLeftRadius: '16px',
          }}
        >
          <Stack direction={'row'} justifyContent={'space-between'} width={1}>
            <FormProvider methods={methods} onSubmit={onSubmit}>
              <Stack direction={'row'} spacing={2} justifyContent={'space-between'} width={'400px'}>
                {index !== null && index >= 0 && (
                  <>
                    <SecondaryButton
                      size={'medium'}
                      sx={{ width: '50%' }}
                      onClick={() => setId(null)}
                    >
                      انصراف
                    </SecondaryButton>
                    <PrimaryButton
                      size={'medium'}
                      type="submit"
                      sx={{ width: '50%' }}
                    >
                      اعمال تغییرات
                    </PrimaryButton>
                  </>
                )}
                {
                  index === null && type === 'cart' && order_type === ProductOrderType.custom_made && (
                    <SecondaryButton size="medium" type="submit" sx={{ width: '400px' }}>
                      افزودن به لیست
                    </SecondaryButton>
                  )
                }
              </Stack>
            </FormProvider>
            <Stack direction={'row'} spacing={2}>
              {(index === null && list.length > 0) && (
                <>
                  <SecondaryButton
                    size="medium"
                    onClick={() => {
                      dialog.onFalse();
                      setList([]);
                      setId(null);
                    }}
                  >
                    انصراف
                  </SecondaryButton>
                  <PrimaryButton
                    size="medium"
                    sx={{ borderRadius: '24px' }}
                    onClick={handleAddToList}
                    disabled={type === 'edit' ? (hasRejected ? !isSubmitted : false) : false}
                  >
                    {(type === 'cart' && !listData?.length) ? 'افزودن به سبد خرید' : 'اعمال تغییرات'}
                  </PrimaryButton>
                </>
              )}
            </Stack>
          </Stack>
        </DialogActions>
      </Dialog>
    </>
  );
}
