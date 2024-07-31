import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';

import { ConfirmDialogProps } from './types';
import SvgColor from '../svg-color';
import { Box } from '@mui/material';

// ----------------------------------------------------------------------

export default function ConfirmDialog({
  title,
  content,
  action,
  open,
  onClose,
  ...other
}: ConfirmDialogProps) {
  return (
    <Dialog fullWidth maxWidth="xs" open={open} onClose={onClose} {...other} sx={{
      '& .MuiBackdrop-root': {
        backgroundColor: 'rgba(0,0,0,0.8)'
      }
    }}>
      <Box py={1} px={3}>
        <DialogTitle sx={{ pb: 2, borderBottom: '1px solid #E8E8E8', pt: 2, display: 'flex', alignItems: 'center', fontFamily: 'peyda-bold', px: 0 }}>
          <SvgColor src="/assets/icons/notification/alert-circle.svg" color={"#D12215"} mr={1} />
          <Box>
            {title}
          </Box>
        </DialogTitle>

        {content && <Box sx={{ typography: 'body2', pt: 2 }}> {content} </Box>}

        <DialogActions sx={{ px: 0 }}>
          <Button color="inherit" onClick={onClose}>
            انصراف
          </Button>

          {action}
        </DialogActions>
      </Box>
    </Dialog>
  );
}
