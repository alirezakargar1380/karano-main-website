import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';

import { ConfirmDialogProps, ReminderDialogProps } from './types';
import SvgColor from '../svg-color';
import { Box } from '@mui/system';

// ----------------------------------------------------------------------

export default function ReminderDialog({
    title,
    content,
    action,
    open,
    color = "#0B7BA7",
    closeTitle = "خیر",
    onClose,
    ...other
}: ReminderDialogProps) {
    return (
        <Dialog fullWidth maxWidth="sm" open={open} onClose={onClose} {...other} sx={{
            '& .MuiBackdrop-root': {
                backgroundColor: 'rgba(0,0,0,0.8)'
            }
        }}>
            <Box py={1} px={3}>
                <DialogTitle sx={{ pb: 2, borderBottom: '1px solid #E8E8E8', pt: 2, display: 'flex', alignItems: 'center', fontFamily: 'peyda-bold', px: 0 }}>
                    <SvgColor src="/assets/icons/notification/alert-circle.svg" color={color} mr={1} />
                    <Box pt={0.5}>
                        {title}
                    </Box>
                </DialogTitle>

                {content && <DialogContent sx={{ typography: 'body2', px: 0, mt: 2, fontFamily: 'peyda-medium', color: "#727272" }}> {content} </DialogContent>}

                <DialogActions sx={{ pr: 0 }}>
                    {(onClose) && (
                        <Button color="inherit" sx={{ mr: 2, borderRadius: 50 }} onClick={onClose}>
                            {closeTitle}
                        </Button>
                    )}

                    {action}
                </DialogActions>
            </Box>
        </Dialog>
    );
}
