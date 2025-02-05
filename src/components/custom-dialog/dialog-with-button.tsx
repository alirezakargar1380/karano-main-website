import React, { useRef, useEffect, forwardRef } from 'react';
import Dialog from '@mui/material/Dialog';

import { useBooleanReturnType } from 'src/hooks/use-boolean';
import { Button, Container, Fade, IconButton, Paper, Radio, Slide, Stack, Typography } from '@mui/material';
import { Box, Breakpoint, maxWidth, SxProps } from '@mui/system';
import Scrollbar from '../scrollbar';
import SvgColor from '../svg-color';
import { SecondaryButton } from 'src/components/styles/buttons/secondary';
import { LoadingButton } from '@mui/lab';
import { TransitionProps } from 'notistack';

// ----------------------------------------------------------------------
interface Props {
    dialog: useBooleanReturnType,
    children: React.ReactNode,
    fullWith: boolean
    width?: number
    maxWidth?: Breakpoint
    sx?: SxProps
}

const Transition = forwardRef(
    (
        props: TransitionProps & {
            children: React.ReactElement;
        },
        ref: React.Ref<unknown>
    ) => <Fade ref={ref} {...props} />
);

export default function DialogWithButton({ dialog, children, fullWith, width = 480, maxWidth = 'lg', sx }: Props) {

    const default_sx = fullWith ? {} : { maxWidth: `${width}px!important` }


    const descriptionElementRef = useRef<HTMLElement>(null);

    useEffect(() => {
        if (dialog.value) {
            const { current: descriptionElement } = descriptionElementRef;
            if (descriptionElement) {
                descriptionElement.focus();
            }
        }
    }, [dialog.value]);

    const CustomPaperComponent = React.forwardRef<HTMLDivElement>((props, ref) => (
        <Box ref={ref}
            display="flex"
            // alignItems="center"
            justifyContent={'center'}
            {...props}
            sx={{
                position: 'fixed!important',
                flexDirection: 'row!important',
                overflowY: 'unset!important',
                boxShadow: 'none!important'
            }}>
            <Paper {...props} sx={{ ...default_sx, p: '40px' }} />
            <Box>
                <IconButton
                    onClick={dialog.onFalse}
                    sx={{
                        bgcolor: 'white',
                        height: 'fit-content',
                        borderRadius: '50%',
                        border: '1px solid #D1D1D1',
                        '&:hover': { background: '#F2F2F2' },
                    }}
                >
                    <SvgColor src='/assets/icons/navbar/x-close.svg' />
                </IconButton>
            </Box>
        </Box>
    ));

    return (
        <Dialog
            open={dialog.value}
            PaperComponent={CustomPaperComponent}
            onClose={dialog.onFalse}
            TransitionComponent={Transition}
            transitionDuration={750}
            maxWidth={maxWidth}
            PaperProps={{
                style: {
                    marginTop: 0,
                    marginBottom: 0,
                    // marginTop: '24px',
                    // marginBottom: '24px',
                    // margin: '0px',
                    // backgroundColor: 'transparent',
                    // boxShadow: 'none',
                    // margin: 0,
                    // marginTop: 20,
                    // marginBottom: 20,
                    width: 'calc(100% - 16px)',
                    // height: '100%',
                    // zIndex: 99
                    // maxWidth: 'calc(100% - 14px)',
                    // minHeight: '90vh',
                    maxHeight: 'calc(100vh - 80px)',
                },
            }}
            sx={{
                '& .MuiBackdrop-root': {
                    backgroundColor: 'rgba(0,0,0,0.8)'
                }
            }}
        >
            {children}
        </Dialog>
    );
}
