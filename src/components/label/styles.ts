import Box from '@mui/material/Box';
import { alpha, Theme, styled } from '@mui/material/styles';

import { ILabelColor, LabelColor, LabelVariant } from './types';
import { pxToRem } from 'src/theme/typography';

// ----------------------------------------------------------------------

const outlinedColor = {
  "primary": "",
  "secondary": "",
  "info": "#005878",
  "success": "#096E35",
  "warning": "#795105",
  "error": "#A4190F"
}

const outlinedBgColor: ILabelColor = {
  // "secondary": "",
  "blue": "#DCF9FF",
  // "success": "#E0FFEB",
  // "warning": "#FFF6DD",
  // "error": "#FFE5E4"
}



const outlinedBorderColor: ILabelColor = {
  "blue": "#86D8F8",
  // "success": "#8EEFB4",
  // "warning": "#F8D185",
  // "error": "#FDBCB7"
}

// Filled
const filledColor: ILabelColor = {
  blue: "#005878",
  green: "#096E35",
  red: "#A4190F",
  yellow: "#795105"
}

const filledBgColor: ILabelColor = {
  blue: "#DCF9FF",
  green: "#E0FFEB",
  yellow: "#FFF6DD",
  red: "#FFE5E4"
}

export const StyledLabel = styled(Box)(({
  theme,
  ownerState,
}: {
  theme: Theme;
  ownerState: {
    color: LabelColor;
    variant: LabelVariant;
  };
}) => {
  const lightMode = theme.palette.mode === 'light';

  const filledVariant = ownerState.variant === 'filled';

  const outlinedVariant = ownerState.variant === 'outlined';

  const softVariant = ownerState.variant === 'soft';

  const defaultStyle = {
    ...(ownerState.color === 'default' && {
      // FILLED
      ...(filledVariant && {
        color: lightMode ? theme.palette.common.white : theme.palette.grey[800],
        backgroundColor: theme.palette.text.primary,
      }),
      // OUTLINED
      ...(outlinedVariant && {
        backgroundColor: 'transparent',
        color: theme.palette.text.primary,
        border: `2px solid ${theme.palette.text.primary}`,
      }),
      // SOFT
      ...(softVariant && {
        color: theme.palette.text.secondary,
        backgroundColor: alpha(theme.palette.grey[500], 0.16),
        borderRadius: '8px'
      }),
    }),
  };

  const colorStyle = {
    ...(ownerState.color !== 'default' && {
      // FILLED
      ...(filledVariant && {
        color: filledColor[ownerState.color],
        backgroundColor: filledBgColor[ownerState.color],
      }),
      // OUTLINED
      ...(outlinedVariant && {
        borderRadius: '16px',
        backgroundColor: outlinedBgColor[ownerState.color],
        // color: outlinedColor[ownerState.color],
        border: `2px solid ${outlinedBorderColor[ownerState.color]}`,
      }),
      // SOFT
      ...(softVariant && {
        // color: theme.palette[ownerState.color][lightMode ? 'dark' : 'light'],
        // backgroundColor: alpha(theme.palette[ownerState.color].main, 0.16),
      }),
    }),
  };

  return {
    height: 29,
    minWidth: 24,
    lineHeight: 0,
    borderRadius: 6,
    cursor: 'default',
    alignItems: 'center',
    whiteSpace: 'nowrap',
    display: 'inline-flex',
    justifyContent: 'center',
    textTransform: 'capitalize',
    padding: `${pxToRem(2)} ${pxToRem(8)}`,
    fontSize: theme.typography.pxToRem(12),
    fontWeight: theme.typography.fontWeightBold,
    transition: theme.transitions.create('all', {
      duration: theme.transitions.duration.shorter,
    }),
    ...defaultStyle,
    ...colorStyle,
  };
});
