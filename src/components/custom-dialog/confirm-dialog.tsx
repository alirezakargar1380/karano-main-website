import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';

import { ConfirmDialogProps } from './types';
import SvgColor from '../svg-color';
import { Box, DialogContent, Typography } from '@mui/material';

// ----------------------------------------------------------------------
// #D12215

export default function ConfirmDialog({
  title,
  content,
  action,
  open,
  color = '#0B7BA7',
  onClose,
  closeTitle = 'انصراف',
  ...other
}: ConfirmDialogProps) {
  return (
    <Dialog
      open={open}
      maxWidth={'lg'}
      onClose={onClose}
      PaperProps={{
        style: {
          padding: '40px',
          margin: 0
        },
      }}
      {...other}
      sx={{
        '& .MuiBackdrop-root': {
          backgroundColor: 'rgba(0,0,0,0.8)',
        },
      }}
    >
      <DialogTitle sx={{ pb: 2, borderBottom: '1px solid #E8E8E8', pt: 0, display: 'flex', alignItems: 'center', px: 0 }}>
        <SvgColor src="/assets/icons/notification/alert-circle.svg" color={color} mr={1} sx={{ width: 24, height: 24 }} />
        <Typography variant={'title1'}>
          {title}
        </Typography>
      </DialogTitle>

      {content && <DialogContent sx={{ fontSize: 16, typography: 'body1', color: "#727272", px: 0, mt: 2 }}> {content} </DialogContent>}

      <DialogActions sx={{ px: 0, pb: 0 }}>
        {onClose && (
          <Button color="inherit" onClick={onClose} sx={{ typography: 'button1', px: '36px', borderRadius: '50px' }}>
            {closeTitle}
          </Button>
        )}

        {action}
      </DialogActions>
    </Dialog>
  );
}
