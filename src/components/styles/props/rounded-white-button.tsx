import { Button, ButtonProps } from '@mui/material';
import { styled } from '@mui/material/styles';
import { RouterLink } from 'src/routes/components';
import { pxToRem } from 'src/theme/typography';

// export const StyledRoundedWhiteButton = styled(Button, {
//     shouldForwardProp(prop) {
//         return prop !== 'component' && prop !== 'sx'
//     },
//     slot: 'Root',
//     overridesResolver: (props, styles) => [
//         styles.root,
//         props.component,
//         props.children,
//         // styles.sx,
//         props.href,
//     ],
// })<ButtonProps>(() => ({
//     borderRadius: '24px',
//     borderColor: "#D1D1D1",
//     '&:hover': {
//         borderColor: "#727272",
//         backgroundColor: "transparent"
//     }
// }))

export const StyledRoundedWhiteButton = styled(Button)<ButtonProps>(({ theme }) => {
    return {
        backgroundColor: '#fff',
        borderRadius: '24px',
        padding: `${pxToRem(4)} ${pxToRem(20)}`,
        border: 'none',
        outline: '1px solid #D1D1D1',
        '&:hover': {
            outline: "1px solid #727272",
            backgroundColor: "#fff"
        }
    }
});