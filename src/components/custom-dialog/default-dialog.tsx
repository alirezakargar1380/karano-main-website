import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';

import { ConfirmDialogProps } from './types';
import SvgColor from '../svg-color';
import { Box } from '@mui/system';
import { Stack } from '@mui/material';
import Typography from '@mui/material/Typography';

// ----------------------------------------------------------------------

export default function DefaultDialog({
    title,
    content,
    action,
    open,
    onClose,
    closeTitle = "خیر",
    ...other
}: ConfirmDialogProps) {
    return (
        <Dialog fullWidth maxWidth={'lg'} open={open} onClose={onClose} {...other} sx={{
            '& .MuiBackdrop-root': {
                backgroundColor: 'rgba(0,0,0,0.8)'
            }
        }}>
            <Box pt={2} px={3}>
                <DialogTitle sx={{ pb: 2, borderBottom: '1px solid #E8E8E8', pt: 2, display: 'flex', alignItems: 'center', px: 0 }}>
                    <SvgColor src="/assets/icons/notification/alert-circle.svg" color={'#727272'} mr={1} sx={{width: 24, height: 24 }} />
                    <Typography variant={'title1'}>
                        {title}
                    </Typography>
                </DialogTitle>

                {content && <DialogContent sx={{ fontSize: 16, typography: 'body1', color: "#727272", px: 0, mt: 2 }}> {content} </DialogContent>}

                <DialogActions sx={{ px: 0, pt: '24px' }}>
                    <Stack direction={'row'} spacing={2}>
                        {onClose && <Button sx={{ px: 3, borderRadius: '50px' }} onClick={onClose}>{closeTitle}</Button>}
                        {action}
                    </Stack>
                </DialogActions>
            </Box>
        </Dialog>
    );
}
