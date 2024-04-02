import { useRef, useEffect } from 'react';
import Dialog from '@mui/material/Dialog';

import {useBooleanReturnType } from 'src/hooks/use-boolean';
import { IconButton, Radio, Stack, Typography } from '@mui/material';
import { Box } from '@mui/system';
import Scrollbar from '../scrollbar';
import SvgColor from '../svg-color';

// ----------------------------------------------------------------------
interface Props {
    dialog: useBooleanReturnType,
    title: string,
    children: React.ReactNode
}


export default function DialogWithButton({ dialog, title, children }: Props) {

    const descriptionElementRef = useRef<HTMLElement>(null);

    useEffect(() => {
        if (dialog.value) {
            const { current: descriptionElement } = descriptionElementRef;
            if (descriptionElement) {
                descriptionElement.focus();
            }
        }
    }, [dialog.value]);

    return (
        <Dialog open={dialog.value} onClose={dialog.onFalse} scroll={'paper'} maxWidth={false}
            PaperProps={{
                style: {
                    backgroundColor: 'transparent',
                    boxShadow: 'none',
                    overflow: 'hidden'
                },
            }}
            fullWidth={false}
            sx={{}}
        >
            <Box sx={{ minWidth: 480, display: 'flex' }}>
                <Scrollbar sx={{ maxHeight: 'fit-content' }}>
                    <Box sx={{ p: 4, bgcolor: 'white', borderRadius: '16px' }}>
                        <Typography variant="h4" sx={{ width: 1, pb: 2, fontFamily: 'peyda-bold', borderBottom: '1px solid #D1D1D1' }}>
                            {title}
                        </Typography>
                        {children}
                    </Box>
                </Scrollbar>
                <IconButton onClick={() => { dialog.onFalse() }} sx={{ bgcolor: 'white', height: 'fit-content', ml: 2, borderRadius: '50%', border: '1px solid #D1D1D1', '&:hover': { background: '#F2F2F2' } }}>
                    <SvgColor src='/assets/icons/navbar/x-close.svg' />
                </IconButton>
            </Box>
        </Dialog>
    );
}
