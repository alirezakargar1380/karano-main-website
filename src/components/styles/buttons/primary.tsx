import { Box, Button, ButtonProps } from "@mui/material";
import { styled, SxProps } from "@mui/system";
import { ReactNode, useState } from "react";
import { pxToRem } from "src/theme/typography";
import { m } from 'framer-motion';
import Logo from "src/components/logo";
import SvgColor from "src/components/svg-color";

export const PrimaryButtonStyle = styled(Button)<ButtonProps>(({ theme }) => {
    return {
        backgroundColor: '#000',
        color: '#fff',
        borderRadius: '24px',
        padding: `${pxToRem(4)} ${pxToRem(20)}`,
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
    }
});

interface Props {
    onClick?: () => void;
    children?: React.ReactNode;
    sx?: SxProps;
}

export const PrimaryButton = ({
    onClick,
    children,
    ...other
}: Props) => {
    const [loading, setLoading] = useState(false);

    const handleOnClick = () => {
        setLoading(true);
        if (onClick) onClick();
    }

    return (
        <PrimaryButtonStyle
            onClick={handleOnClick}
            {...other}
        >
            {!loading ? children : (
                <Box
                    component={m.div}
                    animate={{
                        rotate: [0, 360],
                    }}
                    transition={{ ease: 'linear', duration: 2, repeat: Infinity }}
                    sx={{
                        width: 20,
                        height: 20,
                    }}
                >
                    <SvgColor src="/assets/icons/buttons/loader-anim.svg" sx={{ width: 20, height: 20 }} />
                </Box>
            )}
        </PrimaryButtonStyle>
    )
}