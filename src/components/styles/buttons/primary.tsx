import { Box, Button, ButtonProps } from '@mui/material';
import { styled } from '@mui/material/styles';
import React, { useState, useCallback, MouseEventHandler } from 'react';
import { pxToRem } from 'src/theme/typography';
import { m } from 'framer-motion';
import SvgColor from 'src/components/svg-color';

export const PrimaryButtonStyle = styled(Button)<ButtonProps>(({ theme, size }) => {
  const sizeSm = size === 'small';
  const sizeMd = size === 'medium';
  return {
    backgroundColor: '#000',
    color: '#fff',
    borderRadius: '24px',
    padding: `${pxToRem(4)} ${pxToRem(20)}`,
    lineHeight: '0px',
    ...(sizeSm && {
      minWidth: '102px',
      padding: `${pxToRem(4)} ${pxToRem(12)}`,
      height: '36px',
      ...theme.typography.button2,
    }),
    ...(sizeMd && {
      minWidth: '122px',
      padding: `${pxToRem(4)} ${pxToRem(24)}`,
      ...theme.typography.button1,
    }),
    '&:hover': {
      backgroundColor: '#555555',
    },
    '&:active': {
      outline: '2px solid #D1D1D1',
    },
    '&.Mui-disabled': {
      backgroundColor: '#E0E0E0',
      color: '#F8F8F8',
    },
  };
});

type Props = ButtonProps & {
  onClick?: MouseEventHandler<HTMLElement>;
  children?: React.ReactNode;
  isLoading?: boolean;
};

export const PrimaryButton: React.FC<Props> = ({
  onClick,
  children,
  isLoading = false,
  ...other
}) => {
  const [loading, setLoading] = useState(isLoading);

  const handleOnClick: MouseEventHandler<HTMLElement> = useCallback(
    async (event) => {
      if (onClick) {
        setLoading(true);
        try {
          onClick(event);
        } finally {
          setLoading(false);
        }
      }
    },
    [onClick]
  );

  return (
    <PrimaryButtonStyle onClick={handleOnClick} disabled={loading} {...other}>
      {loading ? (
        <Box
          component={m.div}
          animate={{ rotate: 360 }}
          transition={{ ease: 'linear', duration: 2, repeat: Infinity }}
          sx={{ width: 24, height: 24, my: '8px' }}
        >
          <SvgColor src="/assets/icons/buttons/loader-anim.svg" sx={{ width: 24, height: 24 }} />
        </Box>
      ) : (
        children
      )}
    </PrimaryButtonStyle>
  );
};
