import { BoxProps } from '@mui/material/Box';

// ----------------------------------------------------------------------

export type LabelSize ='small' |'medium' | 'large'

export type LabelColor =
  | 'default'
  | 'blue'
  | 'green'
  | 'red'
  | 'yellow'
  // | 'info'
  // | 'success'
  // | 'warning'
  // | 'error';

export type ILabelColor = {
  // default: string;
  blue: string;
  green: string;
  red: string;
  yellow: string;
  // secondary: string;
  // info: string;
  // success: string;
  // warning: string;
  // error: string;
}

export type LabelVariant = 'filled' | 'outlined' | 'soft';

export interface LabelProps extends BoxProps {
  startIcon?: React.ReactElement | null;
  endIcon?: React.ReactElement | null;
  color?: LabelColor;
  variant?: LabelVariant;
  size?: LabelSize;
}
