import { BoxProps } from '@mui/material/Box';

// ----------------------------------------------------------------------

export type TagSize ='small' |'medium' | 'large'

export type TagColor =
  | 'default'
  | 'blue'
  | 'green'
  | 'red'
  | 'yellow'

export type ITagColor = {
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

export type TagVariant = 'filled' | 'outlined' | 'soft';

export interface TagProps extends BoxProps {
  startIcon?: React.ReactElement | null;
  endIcon?: React.ReactElement | null;
  color?: TagColor;
  variant?: TagVariant;
  size?: TagSize;
}
