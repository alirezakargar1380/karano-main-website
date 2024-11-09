import { Dialog, Typography } from '@mui/material';
import { ConfirmDialogProps, SuccessDialogProps } from './types';
import { Box } from '@mui/system';
import Image from '../image';
import { LoadingButton } from '@mui/lab';
import { PrimaryButton } from '../styles/buttons/primary';

export default function SuccessDialog({
  open,
  onClose,
  content,
  title,
  ...other
}: SuccessDialogProps) {
  return (
    <Dialog
      fullWidth
      maxWidth="lg"
      open={open}
      onClose={onClose}
      {...other}
      sx={{
        '& .MuiBackdrop-root': {
          backgroundColor: 'rgba(0,0,0,0.8)',
        },
      }}
    >
      <Box p={'24px'} textAlign={'center'}>
        <Image src="/assets/images/order-tracking/success.png" />
        {title && (
          <Typography variant="title1" color={'#000'} mt={'32px'}>
            {title}
          </Typography>
        )}
        {content && (
          <Typography variant="body2" color={'#000'} mt={'32px'} whiteSpace={'pre-line'}>
            {content}
          </Typography>
        )}
        <PrimaryButton size={'medium'} sx={{ mt: '32px' }} onClick={onClose}>
          متوجه شدم
        </PrimaryButton>
      </Box>
    </Dialog>
  );
}
