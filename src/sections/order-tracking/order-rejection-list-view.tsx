import { LoadingButton } from '@mui/lab';
import { Box, DialogActions, DialogContent, DialogTitle, Stack, Typography } from '@mui/material';
import { BlueNotification, YellowNotification } from 'src/components/notification';
import { SecondaryButton } from 'src/components/styles/buttons/secondary';
import { useBoolean, useBooleanReturnType } from 'src/hooks/use-boolean';
import React, { useState } from 'react';
import ShoppingCartList from '../shopping-cart/shopping-cart-list';
import { IOrderProductItem } from 'src/types/order-products';

import { useSnackbar } from 'src/components/snackbar';
import { IOrderProductPropertyStatus } from 'src/types/order-products-property';
import { endpoints, server_axios } from 'src/utils/axios';
import { ConfirmDialog, DialogWithButton } from 'src/components/custom-dialog';
import Scrollbar from 'src/components/scrollbar';
import { OrderStatus } from 'src/types/order';
import { useGetOrderProducts } from 'src/api/order-products';
import { PrimaryButton } from 'src/components/styles/buttons/primary';
import { ProductOrderType } from 'src/types/product';

interface Props {
  dialog: useBooleanReturnType;
  orderId: number;
  order_number?: string;
  onUpdate: () => void;
}

export default function OrderRejectionListView({ dialog, orderId, order_number, onUpdate }: Props) {
  const [edited, setEdited] = useState<boolean>(false);

  const confirm = useBoolean();
  const cancel = useBoolean();

  const { enqueueSnackbar } = useSnackbar();

  const { orderProducts, refreshOrderProducts } = useGetOrderProducts(orderId);

  const handleUpdateOrder = async () => {
    const op: IOrderProductItem[] = await server_axios
      .get(endpoints.orderProducts.one(orderId))
      .then(({ data }) => data);

    if (
      !edited &&
      op.find((item) =>
        item.properties.find((p) => p.status === IOrderProductPropertyStatus.denied)
      )
    )
      return enqueueSnackbar(
        'تعدادی از سفارش‌های شما توسط مدیریت فروش،در وضعیت «ردشده» قرار گرفته‌اند.\n ابتدا تغییرات مورد نظر را اعمال کنید و سپس بر روی دکمه «ثبت نهایی اصلاحات» کلیک کنید.',
        {
          variant: 'multiline',
          color: 'error',
        }
      );

    let isOnlyOne = false;
    op.forEach((element) => {
      let found = 0;
      element.properties.forEach((property) => {
        if (property.status === IOrderProductPropertyStatus.denied) {
          found += 1;
        }
      });
      if (found === 1) {
        isOnlyOne = true;
      }
    });

    if (isOnlyOne) {
      const find = op.find((item: any) => {
        if (
          item.properties.find(
            (property: any) => property.status === IOrderProductPropertyStatus.denied
          )
        )
          return item;
      });
      enqueueSnackbar(
        `یکی از سفارش‌های پروفیل ${find?.product.name} در وضعیت «ردشده» است.\n ابتدا تغییرات مورد نظر را اعمال کنید. سپس بر روی دکمه «ثبت نهایی اصلاحات» کلیک کنید.`,
        {
          variant: 'multiline',
          color: 'error',
        }
      );
      return;
    } else {
      if (
        op.find((item: any) =>
          item.properties.find(
            (property: any) => property.status === IOrderProductPropertyStatus.denied
          )
        )
      ) {
        const text =
          'تعدادی از سفارش‌های شما در وضعیت «ردشده» هستند. \n ابتدا تغییرات مورد نظر را اعمال کنید. سپس بر روی دکمه «ثبت نهایی اصلاحات» کلیک کنید.';
        enqueueSnackbar(text, {
          variant: 'multiline',
          color: 'error',
        });
        return;
      }
    }

    confirm.onTrue();
  };

  const confirmOrder = async () => {
    await server_axios.patch(endpoints.orders.update(orderId), {
      status: OrderStatus.edited,
    });
    dialog.onFalse();
    enqueueSnackbar(
      `اصلاح شفارش با کد ${order_number} با موفقیت انجام شد. \n بعد از بررسی توسط مدیر فروش، وضعیت سفارش شما از طریق منوی «پیگیری سفارش»، قابل پیگیری و بررسی ست.`,
      {
        variant: 'multiline',
        color: 'info',
      }
    );
  };

  return (
    <DialogWithButton dialog={dialog} fullWith={true}>
      <ConfirmDialog
        onClose={cancel.onFalse}
        color='#727272'
        title={'انصراف از ثبت نهایی اصلاحات'}
        open={cancel.value}
        content={
          'شما در حال انصراف از ثبت نهایی اصلاحات کالاهای ردشده  هستید.  تمام اطلاعات کالاهای رده‌شده‌ای که  اصلاح و حذف کرده‌اید، ذخیره می‌شوند. آیا مایل به ادامه انصراف هستید؟'
        }
        closeTitle="خیر"
        action={
          <PrimaryButton
            size={'medium'}
            onClick={() => {
              cancel.onFalse();
              dialog.onFalse();
              enqueueSnackbar(
                `با انصراف از ثبت نهایی اصلاحات، شفارش شما با کد ${order_number} در وضعیت «ردشده» باقی می‌ماند.  `,
                {
                  variant: 'multiline',
                  color: 'info',
                }
              );
            }}
            sx={{
              borderRadius: '50px',
              px: 5,
            }}
          >
            بله
          </PrimaryButton>
        }
      />

      <ConfirmDialog
        onClose={confirm.onFalse}
        color='#727272'
        title="ثبت نهایی اصلاحات"
        open={confirm.value}
        content={'آیا از ثبت نهایی تمامی تغییرات و اصلاحات کالاهای ردشده اطمینان دارید؟'}
        closeTitle="خیر"
        action={
          <PrimaryButton size={'medium'} onClick={confirmOrder}>
            بله
          </PrimaryButton>
        }
      />

      <DialogTitle
        variant="title1"
        sx={{ width: 1, px: 0, pt: 0, borderBottom: '1px solid #D1D1D1' }}
      >
        جزییات رد ‌سفارش
      </DialogTitle>
      <DialogContent sx={{ px: 0 }}>
        <Scrollbar>
          <Box sx={{ bgcolor: 'white', borderRadius: '16px', mb: '36px' }}>
            <Box pt={'24px'}>
              <YellowNotification title="لیست کالاهای «سفارشی» ناموجود" sx={{ mb: 3 }}>
                ادمین فروش تعدادی / تمامی کالاهای شما را رد کرده و علت‌های کالاهای ردشده را ثبت کرده
                است. می‌توانید کالا / کالاهای ردشده را اصلاح یا حذف کنید. در صورت اصلاح و سپس بررسی
                توسط ادمین فروش، وضعیت‌ کالاهای سفارش شما در سبد خرید در بخش پروفایل و همچنین از
                طریق منوی «پیگیری سفارش» قابل مشاهده و پیگیری هستند.{' '}
              </YellowNotification>
              <BlueNotification sx={{ mb: 3 }} closeBtn>
                برای تغییرات کالاهای «ردشده»، دکمه «اصلاح / حذف کالا» را انتخاب و سپس بعد از اعمال
                تمامی تغییرات،بر روی دکمه «ثبت تغییرات» کلیک کنید. همچنین می‌توانید با کلیک بر روی
                آیکون «اصلاح» و «حذف»، تغییرات مورد نظر خود را اعمال کنید. در آخر برای ثبت نهایی
                تغییرات، بر روی دکمه «ثبت نهایی اصلاحات» کلیک کنید.
              </BlueNotification>
            </Box>

            <ShoppingCartList
              type="edit"
              items={orderProducts
                .filter((op) => op.product.order_type === ProductOrderType.custom_made)
              }
              orderId={orderId}
              onRefresh={() => refreshOrderProducts()}
              afterUpdate={async (wasLastOne?: boolean) => {
                setEdited(true);
                // sleep
                await new Promise((resolve) => setTimeout(resolve, 250));
                if (wasLastOne === true) {
                  dialog.onFalse();
                  onUpdate();
                }
              }}
            />
          </Box>
        </Scrollbar>
      </DialogContent>
      <DialogActions sx={{ px: 0, pt: 0, pb: 0 }}>
        <Stack
          direction={'row'}
          spacing={'12px'}
          justifyContent={'end'}
          borderTop={'1px solid #D1D1D1'}
          pt={'24px'}
          width={1}
        >
          <SecondaryButton size={'medium'} onClick={cancel.onTrue}>
            <Typography variant="button1">انصراف</Typography>
          </SecondaryButton>
          <PrimaryButton size={'medium'} onClick={handleUpdateOrder}>
            <Typography variant="button1">ثبت نهایی اصلاحات</Typography>
          </PrimaryButton>
          {/* <LoadingButton variant='contained' sx={{ borderRadius: '24px', px: '20px', py: '4px' }} onClick={handleUpdateOrder}>
                        <Typography variant='button1' fontFamily={'peyda-light'}>ثبت نهایی اصلاحات</Typography>
                    </LoadingButton> */}
        </Stack>
      </DialogActions>
    </DialogWithButton>
  );
}
