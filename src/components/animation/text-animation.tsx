import { Box, BoxProps } from "@mui/material";
import { Variant } from "@mui/material/styles/createTypography";
import { m, MotionProps } from 'framer-motion';
import { varFade, MotionContainer } from 'src/components/animate';

type TextAnimateProps = BoxProps &
    MotionProps & {
        text: string;
        split?: string;
        variant?: Variant
        px: number;
    };

export function TextAnimate({ text, variants, variant = "h2", split = " ", px, sx, ...other }: TextAnimateProps) {
    return (
        <Box
            component={m.div}
            sx={{
                typography: variant,
                overflow: 'hidden',
                display: 'inline-flex',
                ...sx,
            }}
            {...other}
        >
            {text.split(split).map((letter, index) => (
                <m.span key={index} variants={variants || varFade().inUp}>
                    <Box px={px}>
                        {letter}
                    </Box>
                </m.span>
            ))}
        </Box>
    );
}