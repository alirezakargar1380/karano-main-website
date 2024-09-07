import { Button, ButtonProps } from '@mui/material';
import { styled } from '@mui/material/styles';
import { RouterLink } from 'src/routes/components';

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

export const StyledRoundedWhiteButton = styled(Button, {
    // shouldForwardProp: (prop) => prop !== 'sx',
    // // slot: 'Root',
    // overridesResolver: (props, styles) => [
    //     styles.root,
    //     // props.component,
    //     props.children,
    //     // styles.sx,
    //     props.href,
    // ],
})<ButtonProps>(({ theme }) => {
    return {
        backgroundColor: '#fff',
        borderRadius: '24px',
        borderColor: "#D1D1D1",
        '&:hover': {
            borderColor: "#727272",
            backgroundColor: "transparent"
        }
    }
});