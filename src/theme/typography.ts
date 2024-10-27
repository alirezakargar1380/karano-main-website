import { Barlow, Public_Sans } from 'next/font/google';

// ----------------------------------------------------------------------

export function remToPx(value: string) {
  return Math.round(parseFloat(value) * 16);
}

export function pxToRem(value: number) {
  return `${value / 16}rem`;
}

export function responsiveFontSizes({ sm, md, lg }: { sm: number; md: number; lg: number }) {
  return {
    '@media (min-width:600px)': {
      fontSize: pxToRem(sm),
    },
    '@media (min-width:900px)': {
      fontSize: pxToRem(md),
    },
    '@media (min-width:1200px)': {
      fontSize: pxToRem(lg),
    },
  };
}

declare module '@mui/material/styles' {
  interface TypographyVariants {
    fontSecondaryFamily: React.CSSProperties['fontFamily'];
    fontWeightSemiBold: React.CSSProperties['fontWeight'];
    caption1: React.CSSProperties;
    caption2: React.CSSProperties;
    caption3: React.CSSProperties;
    button1: React.CSSProperties;
    button2: React.CSSProperties;
  }
}

// Update the Typography's variant prop options
declare module "@mui/material/Typography" {
  interface TypographyPropsVariantOverrides {
    body3: true;
    body4: true;
    button1: true;
    button2: true;
    caption1: true;
    caption2: true;
    caption3: true;
    heading1: true;
    heading2: true;
    heading3: true;
    title1: true;
    title2: true;
    title3: true;
  }
}

export const primaryFont = "peyda-medium";

export const secondaryFont = "peyda-medium";

// ----------------------------------------------------------------------

// LEARN MORE
// https://nextjs.org/docs/basic-features/font-optimization#google-fonts

export const typography = {
  fontFamily: primaryFont,
  fontSecondaryFamily: secondaryFont,
  fontWeightRegular: 400,
  fontWeightMedium: 500,
  fontWeightSemiBold: 600,
  fontWeightBold: 700,
  h1: {
    fontWeight: 800,
    lineHeight: 80 / 64,
    fontSize: pxToRem(48),
    ...responsiveFontSizes({ sm: 52, md: 58, lg: 64 }),
  },
  h2: {
    fontWeight: 800,
    lineHeight: 64 / 48,
    fontSize: pxToRem(40),
    ...responsiveFontSizes({ sm: 40, md: 44, lg: 48 }),
  },
  h3: {
    fontWeight: 700,
    lineHeight: 1.5,
    fontSize: pxToRem(32),
    ...responsiveFontSizes({ sm: 26, md: 30, lg: 32 }),
  },
  h4: {
    fontWeight: 700,
    lineHeight: 1.5,
    fontSize: pxToRem(22),
    ...responsiveFontSizes({ sm: 20, md: 24, lg: 24 }),
  },
  h5: {
    fontWeight: 700,
    lineHeight: 1.5,
    fontSize: pxToRem(18),
    ...responsiveFontSizes({ sm: 19, md: 20, lg: 20 }),
  },
  h6: {
    fontWeight: 700,
    lineHeight: 28 / 18,
    fontSize: pxToRem(16),
    ...responsiveFontSizes({ sm: 18, md: 18, lg: 18 }),
  },
  heading1: {
    fontFamily: 'peyda-black',
    fontWeight: 900,
    lineHeight: '67.2px',
    fontSize: pxToRem(48),
    letterSpacing: '0.03em',
  },
  heading2: {
    fontFamily: 'peyda-extra-bold',
    fontWeight: 800,
    lineHeight: '56px',
    fontSize: pxToRem(40),
    letterSpacing: '0.03em',
  },
  heading3: {
    fontFamily: 'peyda-bold',
    fontWeight: 700,
    lineHeight: '44.8px',
    fontSize: pxToRem(32),
    letterSpacing: '0.03em',
  },
  title1: {
    fontFamily: 'peyda-bold',
    fontWeight: 700,
    lineHeight: '30.8px',
    fontSize: pxToRem(22),
    letterSpacing: '0.03em',
  },
  title2: {
    fontFamily: 'peyda-bold',
    fontWeight: 700,
    lineHeight: '36px',
    fontSize: pxToRem(18),
    letterSpacing: '0.03em',
  },
  title3: {
    fontFamily: 'peyda-bold',
    fontWeight: 700,
    lineHeight: '32px',
    fontSize: pxToRem(16),
    letterSpacing: '0.03em',
  },
  subtitle1: {
    fontWeight: 600,
    lineHeight: 1.5,
    fontSize: pxToRem(16),
  },
  subtitle2: {
    fontWeight: 600,
    lineHeight: 22 / 14,
    fontSize: pxToRem(14),
  },
  body1: {
    fontFamily: 'peyda-semi-bold',
    fontWeight: 600,
    lineHeight: '32px',
    fontSize: pxToRem(16),
    letterSpacing: '0.03em',
  },
  body2: {
    fontFamily: 'peyda-regular',
    fontWeight: 400,
    lineHeight: '32px',
    fontSize: pxToRem(16),
    letterSpacing: '0.03em',
  },
  body3: {
    fontFamily: 'peyda-semi-bold',
    lineHeight: '25px',
    fontWeight: 600,
    fontSize: pxToRem(14),
    letterSpacing: '0.03em',
  },
  body4: {
    fontFamily: 'peyda-regular',
    lineHeight: '25px',
    fontWeight: 400,
    fontSize: pxToRem(14),
    letterSpacing: '0.03em',
  },
  caption: {
    lineHeight: 1.5,
    fontSize: pxToRem(12),
  },
  caption1: {
    fontFamily: 'peyda-regular',
    fontWeight: 400,
    lineHeight: '18.2px',
    fontSize: pxToRem(13),
    letterSpacing: '0.03em',
  },
  caption2: {
    fontFamily: 'peyda-regular',
    fontWeight: 400,
    lineHeight: '16.8px',
    fontSize: pxToRem(12),
    letterSpacing: '0.03em',
  },
  caption3: {
    fontFamily: 'peyda-medium',
    fontWeight: 500,
    lineHeight: '14px',
    fontSize: pxToRem(10),
    letterSpacing: '0.03em',
  },
  overline: {
    fontWeight: 700,
    lineHeight: 1.5,
    fontSize: pxToRem(12),
    textTransform: 'uppercase',
  },
  button: {
    fontWeight: 700,
    fontSize: pxToRem(14),
    textTransform: 'unset',
  },
  button1: {
    fontFamily: 'peyda-medium',
    fontWeight: 500,
    fontSize: pxToRem(16),
    lineHeight: '40px',
    letterSpacing: '0.03em',
  },
  button2: {
    fontFamily: 'peyda-medium',
    fontWeight: 500,
    fontSize: pxToRem(14),
    lineHeight: '28px',
    letterSpacing: '0.03em',
  },
} as const;
