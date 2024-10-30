/* eslint-disable react/jsx-no-useless-fragment */
import Stack from '@mui/material/Stack';
import Box, { BoxProps } from '@mui/material/Box';
import { Theme, styled, SxProps } from '@mui/material/styles';
import { Typography } from '@mui/material';

// ----------------------------------------------------------------------

type StyledRootProps = {
  rounded: boolean;
};

const StyledRoot = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'rounded',
})<StyledRootProps>(({ rounded, theme }) => ({
  width: '100%',
  zIndex: 9,
  padding: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: "#000",
  '& li': {
    width: 18,
    height: 24,
    margin: theme.spacing(0, 0.2),
    opacity: 0.32,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    '&.slick-active': {
      opacity: 1,
      marginRight: 5,
      marginLeft: 5,
      ...(rounded && {
        '& span': {
          width: 24,
          borderRadius: 6,
        },
      }),
    },
  },
}));

const StyledDot = styled('span')(({ theme }) => ({
  width: 8,
  height: 8,
  borderRadius: '50%',
  transition: theme.transitions.create(['width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.short,
  }),
}));

// ----------------------------------------------------------------------

export interface Props extends BoxProps {
  rounded?: boolean;
  label?: string;
  sx?: SxProps<Theme>;
}

export default function CarouselDots(props?: Props) {
  const rounded = props?.rounded || false;

  const sx = props?.sx;

  return {
    appendDots: (dots: React.ReactNode) => (
      <>
        <StyledRoot component="ul" rounded={rounded} sx={{ ...sx }} {...props}>
          <Stack direction={'row'} width={1} alignItems={'center'} justifyContent={'space-between'}>
            <Stack direction={'row'}>
              {dots}
            </Stack>
            <Typography variant='heading3'>
              {props?.label}
            </Typography>
          </Stack>
        </StyledRoot>
      </>
    ),
    customPaging: () => (
      <Stack
        component="div"
        alignItems="center"
        justifyContent="center"
        sx={{ width: 1, height: 1 }}
      >
        <StyledDot
          sx={{
            bgcolor: '#000',
          }}
        />
      </Stack>
    ),
  };
}
