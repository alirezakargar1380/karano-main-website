import Stack, { StackProps } from '@mui/material/Stack';
import { alpha, styled, useTheme } from '@mui/material/styles';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';

import { IconifyProps } from '../iconify';
import { LeftIcon, RightIcon } from './arrow-icons';
import { Box, BoxProps } from '@mui/material';

// ----------------------------------------------------------------------

interface StyledIconButtonProps extends IconButtonProps {
  filled?: boolean;
  shape?: 'circular' | 'rounded';
  hasChild?: boolean;
}

const StyledIconButton = styled(IconButton, {
  shouldForwardProp: (prop) => prop !== 'filled' && prop !== 'hasChild' && prop !== 'shape',
})<StyledIconButtonProps>(({ filled, shape, hasChild, theme }) => ({
  color: 'inherit',
  transition: theme.transitions.create('all', {
    duration: theme.transitions.duration.shorter,
  }),
  ...(shape === 'rounded' && {
    borderRadius: theme.shape.borderRadius * 1.5,
  }),
  ...(!filled && {
    // opacity: 0.48,
    // '&:hover': {
    //   opacity: 1,
    // },
    boxShadow: '0px 1.6px 3.6px 0px #0000001C, 0px 0.3px 0.9px 0px #00000012',
  }),
  ...(filled && {
    color: alpha(theme.palette.common.white, 0.8),
    backgroundColor: alpha(theme.palette.grey[900], 0.48),
    '&:hover': {
      color: theme.palette.common.white,
      backgroundColor: theme.palette.grey[900],
    },
  }),
  ...(hasChild && {
    zIndex: 9,
    top: '50%',
    position: 'absolute',
    marginTop: theme.spacing(-2.5),
  }),
}));

// ----------------------------------------------------------------------

interface Props extends StackProps {
  shape?: 'circular' | 'rounded';
  filled?: boolean;
  children?: React.ReactNode;
  icon?: IconifyProps; // Right icon
  onNext?: VoidFunction;
  onPrev?: VoidFunction;
  leftButtonProps?: IconButtonProps;
  leftButtonBoxProps?: BoxProps;
  rightButtonBoxProps?: BoxProps;
  leftIconProps?: IconButtonProps;
  rightButtonProps?: IconButtonProps;
}

export default function CarouselArrowsCustom({
  shape = 'circular',
  filled = false,
  icon,
  onNext,
  onPrev,
  children,
  leftButtonProps,
  leftButtonBoxProps,
  rightButtonBoxProps,
  leftIconProps,
  rightButtonProps,
  sx,
  ...other
}: Props) {
  const theme = useTheme();

  const isRTL = theme.direction === 'rtl';

  const hasChild = !!children;

  if (hasChild) {
    return (
      <Stack sx={sx} {...other}>
        {onNext && (
          <Box {...leftButtonBoxProps}>
            <StyledIconButton
              filled={filled}
              shape={shape}
              hasChild={!!children}
              onClick={onNext}
              {...leftButtonProps}
              sx={{
                left: -10,
                border: '2px solid #D1D1D1',
                borderRadius: '26px',
                width: 'fit-content',
                backgroundColor: "#fff",
                '&:hover': {
                  border: '2px solid #727272',
                  backgroundColor: "#fff",
                },
                ...leftButtonProps?.sx,
              }}
            >
              <LeftIcon icon={icon} isRTL={isRTL} />
            </StyledIconButton>
          </Box>
        )}

        {children}

        {onPrev && (
          <Box {...rightButtonBoxProps}>
            <StyledIconButton
              filled={filled}
              shape={shape}
              hasChild={!!children}
              onClick={onPrev}
              {...rightButtonProps}
              sx={{
                right: -10,
                border: '2px solid #D1D1D1',
                borderRadius: '26px',
                width: 'fit-content',
                backgroundColor: "#fff",
                '&:hover': {
                  border: '2px solid #727272',
                  backgroundColor: "#fff",
                },
                ...rightButtonProps?.sx,
              }}
            >
              <RightIcon icon={icon} isRTL={isRTL} />
            </StyledIconButton>
          </Box>
        )}
      </Stack>
    );
  }

  return (
    <Stack direction="row" alignItems="center" display="inline-flex" sx={sx} {...other}>
      <StyledIconButton filled={filled} shape={shape} onClick={onPrev} {...leftButtonProps}>
        <LeftIcon icon={icon} isRTL={isRTL} />
      </StyledIconButton>

      <StyledIconButton filled={filled} shape={shape} onClick={onNext} {...rightButtonProps}>
        <RightIcon icon={icon} isRTL={isRTL} />
      </StyledIconButton>
    </Stack>
  );
}
