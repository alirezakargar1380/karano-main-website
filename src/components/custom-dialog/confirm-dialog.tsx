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
  closeTitle = "انصراف",
  ...other
}: ConfirmDialogProps) {
  return (
    <Dialog open={open} maxWidth={false} onClose={onClose} {...other} sx={{
      '& .MuiBackdrop-root': {
        backgroundColor: 'rgba(0,0,0,0.8)'
      },
      '& .MuiPaper-root': {
        width: '640px'
      }
    }}>
      <Box py={2} px={4} width={1}>
        <DialogTitle sx={{ pb: 2, borderBottom: '1px solid #E8E8E8', pt: 2, display: 'flex', alignItems: 'center', fontFamily: 'peyda-bold', px: 0 }}>
          <SvgColor src="/assets/icons/notification/alert-circle.svg" color={"#D12215"} mr={1} />
          <Box sx={{ fontFamily: 'peyda-bold', fontSize: 22 }}>
            {title}
          </Box>
        </DialogTitle>

        {content &&
          <Box sx={{ fontSize: 16, fontFamily: 'peyda-bold', fontWeight: 600, lineHeight: '32px', pt: 3, whiteSpace: 'pre-line', color: '#727272' }}>
            {content}
          </Box>
        }

        <DialogActions sx={{ px: 0 }}>
          <Button color="inherit" onClick={onClose}>
            {closeTitle}
          </Button>

          {action}
        </DialogActions>
      </Box>
    </Dialog>
  );
}
