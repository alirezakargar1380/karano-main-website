import { Box, Button, ButtonProps } from "@mui/material";
import { styled, SxProps } from "@mui/system";
import React, { useState, useCallback } from "react";
import { pxToRem } from "src/theme/typography";
import { m } from 'framer-motion';
import SvgColor from "src/components/svg-color";

export const PrimaryButtonStyle = styled(Button)<ButtonProps>(({ theme }) => ({
    backgroundColor: '#000',
    color: '#fff',
    borderRadius: '24px',
    padding: `${pxToRem(4)} ${pxToRem(20)}`,
    lineHeight: '0px',
    '&:hover': {
        backgroundColor: '#555555',
    },
    '&:active': {
        outline: '2px solid #D1D1D1',
    },
    '&.Mui-disabled': {
        backgroundColor: '#E0E0E0',
        color: '#F8F8F8'
    }
}));

type Props = ButtonProps & {
    onClick?: () => void;
    children?: React.ReactNode;
    isLoading?: boolean;
    sx?: SxProps;
}

export const PrimaryButton: React.FC<Props> = ({
    onClick,
    children,
    isLoading = false,
    ...other
}) => {
    const [loading, setLoading] = useState(isLoading);

    const handleOnClick = useCallback(() => {
        setLoading(true);
        onClick?.();
    }, [onClick]);

    return (
        <PrimaryButtonStyle
            onClick={handleOnClick}
            disabled={loading}
            {...other}
        >
            {loading ? (
                <Box
                    component={m.div}
                    animate={{ rotate: 360 }}
                    transition={{ ease: 'linear', duration: 2, repeat: Infinity }}
                    sx={{ width: 24, height: 24, my: '8px' }}
                >
                    <SvgColor src="/assets/icons/buttons/loader-anim.svg" sx={{ width: 24, height: 24 }} />
                </Box>
            ) : children}
        </PrimaryButtonStyle>
    )
}