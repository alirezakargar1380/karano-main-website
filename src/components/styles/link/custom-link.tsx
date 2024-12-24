import { Box, Link, LinkProps } from '@mui/material';
import { styled } from '@mui/material/styles';
import { m } from 'framer-motion';
import { MouseEventHandler, useCallback, useState } from 'react';
import SvgColor from 'src/components/svg-color';

const CustomLinkStyle = styled(Link)<Props>(({ theme, disabled }) => {

    return {
        color: '#0B7BA7',
        cursor: disabled ? 'not-allowed' : 'pointer',
        pointerEvents: disabled ? 'none' : 'auto',
        opacity: disabled ? 0.5 : 1,
        '&:hover': {
            backgroundColor: '#DCF9FF',
            borderRadius: '2px',
            color: '#005878'
        }
    };
});

type Props = LinkProps & {
    onClick?: MouseEventHandler<HTMLElement>;
    children?: React.ReactNode;
    isSubmiting?: boolean;
    startIcon?: React.ReactElement | null;
    endIcon?: React.ReactElement | null;
    disabled?: boolean;
};

export const CustomLink = ({
    children,
    isSubmiting = false,
    startIcon,
    endIcon,
    disabled,
    ...other
}: Props) => {

    return (
        <CustomLinkStyle disabled={disabled} {...other}>
            {children}
        </CustomLinkStyle>
    );
};
