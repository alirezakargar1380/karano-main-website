import { Box, Button, Typography } from '@mui/material';
import { useCheckoutContext } from '../checkout/context';
import { useBoolean, useBooleanReturnType } from 'src/hooks/use-boolean';
import FormProvider, { RHFTitleTextField } from 'src/components/hook-form';
import { useForm } from 'react-hook-form';
import { Actions } from './dialog-action';
import { ConfirmDialog } from 'src/components/custom-dialog';
import { cancelDialogContent, cancelDialogTitle } from './contants/dialog';
import CompleteOrderLayout from './layout/complete-order-layout';
import CompleteOrderDialogContent from './dialog-content';
import InputCard from './components/input-card';
import { PrimaryButton } from '../../components/styles/buttons/primary';

interface Props {
  finalOrderDialog: useBooleanReturnType;
  hasCustomMade: boolean;
}

export default function Payment({
  finalOrderDialog,
  hasCustomMade,
}: Props) {
  const checkout = useCheckoutContext();

  const cancelDialog = useBoolean();

  const methods = useForm({
    // resolver: yupResolver(NewProductSchema),
    defaultValues: {},
  });

  const {
    formState: { isSubmitting },
  } = methods;

  return (
    <>
      <ConfirmDialog
        closeTitle='خیر'
        color="#C80303"
        open={cancelDialog.value}
        onClose={() => {
          finalOrderDialog.onFalse();
          cancelDialog.onFalse();
        }}
        title={cancelDialogTitle}
        content={cancelDialogContent}
        action={
          <PrimaryButton
            size={'medium'}
            onClick={() => {
              cancelDialog.onFalse();
              finalOrderDialog.onFalse();
              checkout.onNextStep();
            }}
          >
            بله
          </PrimaryButton>
        }
      />
      <CompleteOrderDialogContent>
        <CompleteOrderLayout>
          <FormProvider methods={methods}>
            <InputCard title={hasCustomMade ? 'پیش پرداخت' : 'پرداخت'}>
              <Typography variant="body2" sx={{ width: 1, pb: 4 }}>
                در صورت داشتن کد تخفیف، آن را وارد کنید.
              </Typography>
              <Box sx={{ width: 'fit-content' }}>
                <RHFTitleTextField
                  custom_label="کد تخفیف"
                  name="code"
                  placeholder="کد تخفیف را وارد کنید"
                  InputProps={{
                    endAdornment: (
                      <Button variant="outlined" sx={{ mr: 1 }}>
                        ثبت
                      </Button>
                    ),
                  }}
                />
              </Box>
            </InputCard>
          </FormProvider>
        </CompleteOrderLayout>
      </CompleteOrderDialogContent>
      <Actions onCancel={cancelDialog.onTrue} onSubmit={checkout.onNextStep} title="پرداخت" />
    </>
  );
}
