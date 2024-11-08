import { Box } from '@mui/material';
import React from 'react';
import { Actions } from './dialog-action';
import { useBoolean, useBooleanReturnType } from 'src/hooks/use-boolean';
import { ConfirmDialog } from 'src/components/custom-dialog';
import { cancelDialogContent, cancelDialogTitle } from './contants/dialog';
import { useCheckoutContext } from '../checkout/context';
import CompleteOrderDialogContent from './dialog-content';
import { PrimaryButton } from '../../components/styles/buttons/primary';

type Props = {
  children: React.ReactNode;
  dialog: useBooleanReturnType;
};

export default function CompleteInvoiceView({ children, dialog }: Props) {
  const checkout = useCheckoutContext();

  const cancelDialog = useBoolean();

  return (
    <>
      <ConfirmDialog
        closeTitle='خیر'
        color="#C80303"
        open={cancelDialog.value}
        onClose={() => {
          dialog.onFalse();
          cancelDialog.onFalse();
        }}
        title={cancelDialogTitle}
        content={cancelDialogContent}
        action={
          <PrimaryButton
            size={'medium'}
            onClick={() => {
              cancelDialog.onFalse();
              dialog.onFalse();
            }}
          >
            بله
          </PrimaryButton>
        }
      />
      <CompleteOrderDialogContent>
        {children}
      </CompleteOrderDialogContent>

      <Actions
        onCancel={cancelDialog.onTrue}
        onSubmit={checkout.onNextStep}
        title="تایید و ادامه"
      />
    </>
  );
}
