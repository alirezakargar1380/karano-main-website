import { forwardRef } from 'react';

import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';

import { TagProps } from './types';
import { StyledTag } from './styles';

// ----------------------------------------------------------------------

const Tag = forwardRef<HTMLSpanElement, TagProps>(
  ({ children, color = 'default', variant = 'soft', size = 'medium', startIcon, endIcon, sx, ...other }, ref) => {
    const theme = useTheme();

    const iconStyles = {
      width: 16,
      height: 16,
      '& svg, img': { width: 1, height: 1, objectFit: 'cover' },
    };

    return (
      <StyledTag
        ref={ref}
        component="span"
        ownerState={{ color, variant, size }}
        sx={{
          ...(startIcon && { pl: 0.75 }),
          ...(endIcon && { pr: 0.75 }),
          ...sx,
        }}
        theme={theme}
        {...other}
      >
        {startIcon && <Box sx={{ mr: 0.75, ...iconStyles }}> {startIcon} </Box>}

        {children}

        {endIcon && <Box sx={{ ml: 0.75, ...iconStyles }}> {endIcon} </Box>}
      </StyledTag>
    );
  }
);

export default Tag;
