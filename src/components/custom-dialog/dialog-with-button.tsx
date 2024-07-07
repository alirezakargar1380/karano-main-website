import { useRef, useEffect } from 'react';
import Dialog from '@mui/material/Dialog';

import { useBooleanReturnType } from 'src/hooks/use-boolean';
import { Container, IconButton, Radio, Stack, Typography } from '@mui/material';
import { Box } from '@mui/system';
import Scrollbar from '../scrollbar';
import SvgColor from '../svg-color';
import { StyledRoundedWhiteButton } from '../styles/props/rounded-white-button';
import { LoadingButton } from '@mui/lab';

// ----------------------------------------------------------------------
interface Props {
    dialog: useBooleanReturnType,
    children: React.ReactNode,
    fullWith: boolean
    width?: number
}


export default function DialogWithButton({ dialog, children, fullWith, width = 480 }: Props) {

    const sx = fullWith ? {} : { minWidth: width }

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

        <Dialog
            open={dialog.value}
            onClose={dialog.onFalse}
            scroll={'body'}
            maxWidth={false}
            PaperProps={{
                style: {
                    backgroundColor: 'transparent',
                    boxShadow: 'none',
                },
            }}
            fullWidth={fullWith}
            sx={{
                '& .MuiBackdrop-root': {
                    backgroundColor: 'rgba(0,0,0,0.8)'
                }
            }}
        >
            <Container maxWidth={'lg'}>
                <Box sx={{
                    display: 'flex',
                    ...sx
                }}>
                    <Scrollbar>
                        <Box sx={{ p: 2, bgcolor: 'white', borderRadius: '16px' }}>
                            {children}
                        </Box>
                    </Scrollbar>
                    <IconButton onClick={() => { dialog.onFalse() }} sx={{ bgcolor: 'white', height: 'fit-content', ml: 2, borderRadius: '50%', border: '1px solid #D1D1D1', '&:hover': { background: '#F2F2F2' } }}>
                        <SvgColor src='/assets/icons/navbar/x-close.svg' />
                    </IconButton>
                </Box>
            </Container>
        </Dialog>
    );
}
