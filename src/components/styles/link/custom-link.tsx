import { Box, Link, LinkProps } from '@mui/material';
import { styled } from '@mui/material/styles';
import { m } from 'framer-motion';
import { MouseEventHandler, useCallback, useState } from 'react';
import SvgColor from 'src/components/svg-color';

const CustomLinkStyle = styled(Link)<LinkProps>(({ theme }) => {

    return {
        color: '#0B7BA7',
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
};

export const CustomLink = ({
    children,
    isSubmiting = false,
    startIcon,
    endIcon,
    ...other
}: Props) => {

    return (
        <CustomLinkStyle {...other}>
            {children}
        </CustomLinkStyle>
    );
};
